const axios = require('axios');
const { query } = require('../config/database');
const logger = require('../config/logger');

const CARQUERY_API = process.env.CARQUERY_API_URL || 'https://www.carqueryapi.com/api/0.3/';

/**
 * Impordi auto margid CarQuery API'st
 */
async function importCarMakes() {
    try {
        logger.info('Starting car makes import...');

        const response = await axios.get(CARQUERY_API, {
            params: { cmd: 'getMakes' }
        });

        const makes = response.data.Makes || [];

        for (const make of makes) {
            await query(
                `INSERT INTO car_makes (make_id, make_display, make_country) 
                 VALUES (?, ?, ?) 
                 ON DUPLICATE KEY UPDATE make_display = ?, make_country = ?`,
                [make.make_id, make.make_display, make.make_country, make.make_display, make.make_country]
            );
        }

        logger.info(`Successfully imported ${makes.length} car makes`);
        return makes.length;
    } catch (error) {
        logger.error('Car makes import failed:', error);
        throw error;
    }
}

/**
 * Impordi auto mudelid konkreetsele margile
 */
async function importCarModels(makeId) {
    try {
        logger.info(`Importing models for make: ${makeId}`);

        const response = await axios.get(CARQUERY_API, {
            params: {
                cmd: 'getModels',
                make: makeId
            }
        });

        const models = response.data.Models || [];

        for (const model of models) {
            await query(
                `INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) 
                 VALUES (?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE model_year_max = ?`,
                [makeId, model.model_name, model.model_year, model.model_year, model.model_year]
            );
        }

        logger.info(`Imported ${models.length} models for ${makeId}`);
        return models.length;
    } catch (error) {
        logger.error(`Model import failed for ${makeId}:`, error);
        return 0;
    }
}

/**
 * Impordi kõik andmed
 */
async function importAllCarData() {
    try {
        // Impordi margid
        await importCarMakes();

        // Hangi kõik margid
        const makes = await query('SELECT make_id FROM car_makes');

        // Impordi mudelid iga margi jaoks (aeglasem, kuna palju päringuid)
        for (const make of makes.slice(0, 50)) { // Piira esimese 50 margiga, et mitte API'd üle koormata
            await importCarModels(make.make_id);
            // Lisa väike paus API rate limiting'u tõttu
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        logger.info('Car data import completed');
    } catch (error) {
        logger.error('Car data import failed:', error);
        throw error;
    }
}

// Käivita import kui käivitatud otse
if (require.main === module) {
    importAllCarData()
        .then(() => {
            console.log('Import completed successfully');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Import failed:', error);
            process.exit(1);
        });
}

module.exports = {
    importCarMakes,
    importCarModels,
    importAllCarData
};
