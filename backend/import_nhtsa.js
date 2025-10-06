/**
 * NHTSA API importer
 * USA valitsuse API - tasuta, stabiilne, põhjalik
 * Impordib Eesti turul populaarsed automarkid ja nende mudelid
 */

const axios = require('axios');
const mysql = require('mysql2/promise');

const API_BASE = 'https://vpic.nhtsa.dot.gov/api/vehicles';
const DELAY_MS = 300; // API rate limiting

// Database config
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'bma_root_password_2025',
    database: 'bma_motors'
};

// Eesti turul populaarsed margid
const POPULAR_MAKES = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Opel', 'Skoda',
    'Toyota', 'Honda', 'Nissan', 'Mazda', 'Lexus', 'Subaru',
    'Ford', 'Volvo', 'Peugeot', 'Renault', 'Citroen',
    'Hyundai', 'Kia', 'SEAT', 'Fiat', 'Chevrolet',
    'Porsche', 'Land Rover', 'Jaguar', 'Jeep', 'Mitsubishi',
    'Suzuki', 'Dacia', 'Mini'
];

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Hangi margi mudelid NHTSA API-st
 */
async function fetchModels(makeName) {
    try {
        console.log(`   Fetching models for ${makeName}...`);
        const response = await axios.get(
            `${API_BASE}/GetModelsForMake/${encodeURIComponent(makeName)}?format=json`,
            { timeout: 10000 }
        );
        
        if (!response.data || !response.data.Results) {
            console.log(`   ⚠️  No results for ${makeName}`);
            return [];
        }
        
        // Eemalda duplikaadid
        const uniqueModels = [...new Map(
            response.data.Results.map(model => [model.Model_Name, model])
        ).values()];
        
        console.log(`   ✅ Found ${uniqueModels.length} unique models for ${makeName}`);
        return uniqueModels;
    } catch (error) {
        console.error(`   ❌ Error fetching models for ${makeName}:`, error.message);
        return [];
    }
}

/**
 * Leia riigi kood margi põhjal
 */
function getCountryForMake(makeName) {
    const german = ['Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Opel', 'Porsche'];
    const japanese = ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Lexus', 'Subaru', 'Mitsubishi', 'Suzuki'];
    const french = ['Peugeot', 'Renault', 'Citroen', 'Dacia'];
    const korean = ['Hyundai', 'Kia'];
    const czech = ['Skoda'];
    const swedish = ['Volvo'];
    const british = ['Land Rover', 'Jaguar', 'Mini'];
    const american = ['Ford', 'Chevrolet', 'Jeep'];
    const italian = ['Fiat'];
    const spanish = ['SEAT'];
    
    if (german.includes(makeName)) return 'Germany';
    if (japanese.includes(makeName)) return 'Japan';
    if (french.includes(makeName)) return 'France';
    if (korean.includes(makeName)) return 'South Korea';
    if (czech.includes(makeName)) return 'Czech Republic';
    if (swedish.includes(makeName)) return 'Sweden';
    if (british.includes(makeName)) return 'United Kingdom';
    if (american.includes(makeName)) return 'USA';
    if (italian.includes(makeName)) return 'Italy';
    if (spanish.includes(makeName)) return 'Spain';
    
    return 'Unknown';
}

/**
 * Impordi andmed andmebaasi
 */
async function importToDatabase() {
    let connection;
    
    try {
        console.log('🚀 Starting NHTSA API import...\n');
        
        // Connect to database
        console.log('🔌 Connecting to database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to database\n');
        
        // Küsi kasutajalt kinnitust
        console.log('⚠️  WARNING: This will clear all existing car data!');
        console.log(`📊 Will import ${POPULAR_MAKES.length} popular makes`);
        console.log('⏱️  Estimated time: 5-10 minutes\n');
        
        // Kustuta olemasolevad andmed
        console.log('🗑️  Clearing existing data...');
        await connection.execute('DELETE FROM car_models');
        await connection.execute('DELETE FROM car_makes');
        console.log('✅ Existing data cleared\n');
        
        let totalMakes = 0;
        let totalModels = 0;
        
        // Impordi iga mark
        for (let i = 0; i < POPULAR_MAKES.length; i++) {
            const makeName = POPULAR_MAKES[i];
            const makeId = makeName.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const country = getCountryForMake(makeName);
            
            console.log(`\n📝 [${i + 1}/${POPULAR_MAKES.length}] Processing ${makeName}...`);
            
            // Impordi mark
            await connection.execute(
                'INSERT INTO car_makes (make_id, make_display, make_country) VALUES (?, ?, ?)',
                [makeId, makeName, country]
            );
            totalMakes++;
            
            // Hangi mudelid
            const models = await fetchModels(makeName);
            
            if (models.length > 0) {
                // Impordi mudelid
                for (const model of models) {
                    try {
                        await connection.execute(
                            'INSERT INTO car_models (make_id, model_name) VALUES (?, ?)',
                            [makeId, model.Model_Name]
                        );
                        totalModels++;
                    } catch (error) {
                        // Ignore duplicates
                        if (!error.message.includes('Duplicate')) {
                            console.error(`   ⚠️  Error inserting model ${model.Model_Name}:`, error.message);
                        }
                    }
                }
            }
            
            // Rate limiting
            if (i < POPULAR_MAKES.length - 1) {
                await sleep(DELAY_MS);
            }
        }
        
        // Näita statistikat
        console.log('\n🎉 Import completed!');
        console.log('📊 Summary:');
        console.log(`   - Car makes: ${totalMakes}`);
        console.log(`   - Car models: ${totalModels}`);
        
        // Database stats
        const [makeStats] = await connection.execute(
            'SELECT COUNT(DISTINCT make_id) as total_makes, COUNT(*) as total_models FROM car_models'
        );
        console.log('\n📈 Database statistics:');
        console.log(`   - Total makes: ${makeStats[0].total_makes}`);
        console.log(`   - Total models: ${makeStats[0].total_models}`);
        
        // Top 5 makes by model count
        const [topMakes] = await connection.execute(`
            SELECT cm.make_id, cmk.make_display, COUNT(*) as model_count 
            FROM car_models cm
            JOIN car_makes cmk ON cm.make_id = cmk.make_id
            GROUP BY cm.make_id, cmk.make_display
            ORDER BY model_count DESC
            LIMIT 5
        `);
        
        console.log('\n🏆 Top 5 makes by model count:');
        topMakes.forEach((make, i) => {
            console.log(`   ${i + 1}. ${make.make_display}: ${make.model_count} models`);
        });
        
    } catch (error) {
        console.error('\n❌ Import failed:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
            console.log('\n👋 Database connection closed');
        }
    }
}

// Run import
console.log('╔════════════════════════════════════════╗');
console.log('║   NHTSA Car Data Importer             ║');
console.log('║   Importing popular makes for Estonia ║');
console.log('╚════════════════════════════════════════╝\n');

importToDatabase()
    .then(() => {
        console.log('\n✅ All done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Fatal error:', error);
        process.exit(1);
    });
