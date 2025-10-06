/**
 * CarQuery API importer
 * Tõmbab kõik automarkide ja mudelite andmed CarQuery API-st
 * ja impordib need andmebaasi
 */

const axios = require('axios');
const mysql = require('mysql2/promise');

const API_BASE = 'https://www.carqueryapi.com/api/0.3/';
const DELAY_MS = 500; // API rate limiting

// Database config
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'bma_root_password_2025',
    database: 'bma_motors'
};

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Hangi kõik automarkid
 */
async function fetchMakes() {
    console.log('📥 Fetching car makes from CarQuery API...');
    const response = await axios.get(`${API_BASE}?cmd=getMakes`);
    
    if (!response.data || !response.data.Makes) {
        throw new Error('Invalid API response for makes');
    }
    
    const makes = response.data.Makes;
    console.log(`✅ Found ${makes.length} car makes`);
    return makes;
}

/**
 * Hangi mark-i kõik mudelid
 */
async function fetchModels(makeId) {
    try {
        const response = await axios.get(`${API_BASE}?cmd=getModels&make=${makeId}`);
        
        if (!response.data || !response.data.Models) {
            return [];
        }
        
        return response.data.Models;
    } catch (error) {
        console.error(`❌ Error fetching models for ${makeId}:`, error.message);
        return [];
    }
}

/**
 * Impordi andmed andmebaasi
 */
async function importToDatabase() {
    let connection;
    
    try {
        // Ühenda andmebaasiga
        console.log('🔌 Connecting to database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to database');
        
        // Hangi kõik margid
        const makes = await fetchMakes();
        
        // Tühjenda olemasolevad andmed
        console.log('🗑️  Clearing existing data...');
        await connection.execute('DELETE FROM car_models');
        await connection.execute('DELETE FROM car_makes');
        console.log('✅ Existing data cleared');
        
        // Impordi margid
        console.log('📝 Importing car makes...');
        let importedMakes = 0;
        
        for (const make of makes) {
            try {
                await connection.execute(
                    'INSERT INTO car_makes (make_id, make_display, make_country) VALUES (?, ?, ?)',
                    [make.make_id, make.make_display, make.make_country || 'Unknown']
                );
                importedMakes++;
            } catch (error) {
                console.error(`❌ Error importing make ${make.make_display}:`, error.message);
            }
        }
        console.log(`✅ Imported ${importedMakes} car makes`);
        
        // Impordi mudelid iga margi kohta
        console.log('📝 Importing car models...');
        let importedModels = 0;
        let processedMakes = 0;
        
        for (const make of makes) {
            processedMakes++;
            console.log(`   Processing ${processedMakes}/${makes.length}: ${make.make_display}...`);
            
            // Hangi mudelid
            const models = await fetchModels(make.make_id);
            
            if (models.length === 0) {
                console.log(`   ⚠️  No models found for ${make.make_display}`);
                continue;
            }
            
            // Grupeeri mudelid nime järgi ja leia min/max aastad
            const modelGroups = {};
            
            for (const model of models) {
                const modelName = model.model_name;
                const year = parseInt(model.model_year);
                
                if (!modelGroups[modelName]) {
                    modelGroups[modelName] = {
                        name: modelName,
                        minYear: year,
                        maxYear: year
                    };
                } else {
                    if (year < modelGroups[modelName].minYear) {
                        modelGroups[modelName].minYear = year;
                    }
                    if (year > modelGroups[modelName].maxYear) {
                        modelGroups[modelName].maxYear = year;
                    }
                }
            }
            
            // Impordi grupeeritud mudelid
            for (const modelName in modelGroups) {
                const modelData = modelGroups[modelName];
                
                try {
                    await connection.execute(
                        'INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES (?, ?, ?, ?)',
                        [make.make_id, modelData.name, modelData.minYear, modelData.maxYear]
                    );
                    importedModels++;
                } catch (error) {
                    // Ignoreeri duplikaate
                    if (!error.message.includes('Duplicate')) {
                        console.error(`❌ Error importing model ${modelData.name}:`, error.message);
                    }
                }
            }
            
            console.log(`   ✅ Imported ${Object.keys(modelGroups).length} models for ${make.make_display}`);
            
            // Rate limiting
            await sleep(DELAY_MS);
        }
        
        console.log('\n🎉 Import completed!');
        console.log(`📊 Summary:`);
        console.log(`   - Car makes: ${importedMakes}`);
        console.log(`   - Car models: ${importedModels}`);
        
        // Näita statistikat
        const [stats] = await connection.execute(
            'SELECT COUNT(DISTINCT make_id) as total_makes, COUNT(*) as total_models FROM car_models'
        );
        console.log(`\n📈 Database statistics:`);
        console.log(`   - Total makes: ${stats[0].total_makes}`);
        console.log(`   - Total models: ${stats[0].total_models}`);
        
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('👋 Database connection closed');
        }
    }
}

// Käivita import
console.log('🚀 Starting CarQuery API import...\n');
importToDatabase()
    .then(() => {
        console.log('\n✅ All done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Import failed:', error);
        process.exit(1);
    });
