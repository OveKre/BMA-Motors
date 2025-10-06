const { query } = require('../config/database');

class SparePartsCategory {
    /**
     * Loo uus kategooria
     */
    static async create(categoryData) {
        const { name_est, name_eng, name_rus, description_est, description_eng, description_rus } = categoryData;

        const result = await query(
            `INSERT INTO spareparts_categories 
            (name_est, name_eng, name_rus, description_est, description_eng, description_rus) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [name_est, name_eng, name_rus, description_est, description_eng, description_rus]
        );

        return {
            id: result.insertId,
            ...categoryData
        };
    }

    /**
     * Leia kategooria ID järgi
     */
    static async findById(id) {
        const results = await query(
            'SELECT * FROM spareparts_categories WHERE id = ?',
            [id]
        );
        return results[0];
    }

    /**
     * Leia kõik kategooriad
     */
    static async findAll() {
        return await query('SELECT * FROM spareparts_categories ORDER BY name_est');
    }

    /**
     * Uuenda kategooriat
     */
    static async update(id, categoryData) {
        const { name_est, name_eng, name_rus, description_est, description_eng, description_rus } = categoryData;

        await query(
            `UPDATE spareparts_categories 
            SET name_est = ?, name_eng = ?, name_rus = ?,
                description_est = ?, description_eng = ?, description_rus = ?,
                updated_at = NOW()
            WHERE id = ?`,
            [name_est, name_eng, name_rus, description_est, description_eng, description_rus, id]
        );

        return await this.findById(id);
    }

    /**
     * Kustuta kategooria
     */
    static async delete(id) {
        await query('DELETE FROM spareparts_categories WHERE id = ?', [id]);
        return true;
    }
}

module.exports = SparePartsCategory;
