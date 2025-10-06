const { query } = require('../config/database');

class Service {
    /**
     * Loo uus teenus
     */
    static async create(serviceData) {
        const {
            name_est, name_eng, name_rus,
            description_est, description_eng, description_rus,
            category, price, duration_minutes, is_active = true
        } = serviceData;

        const result = await query(
            `INSERT INTO services 
            (name_est, name_eng, name_rus, description_est, description_eng, description_rus, 
             category, price, duration_minutes, is_active) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name_est, name_eng, name_rus, description_est, description_eng, description_rus,
             category, price, duration_minutes, is_active]
        );

        return {
            id: result.insertId,
            ...serviceData
        };
    }

    /**
     * Leia teenus ID järgi
     */
    static async findById(id) {
        const results = await query(
            'SELECT * FROM services WHERE id = ?',
            [id]
        );
        return results[0];
    }

    /**
     * Leia kõik teenused
     */
    static async findAll(activeOnly = false) {
        let sql = 'SELECT * FROM services';
        if (activeOnly) {
            sql += ' WHERE is_active = true';
        }
        sql += ' ORDER BY category, name_est';
        
        return await query(sql);
    }

    /**
     * Leia teenused kategooria järgi
     */
    static async findByCategory(category, activeOnly = true) {
        let sql = 'SELECT * FROM services WHERE category = ?';
        const params = [category];
        
        if (activeOnly) {
            sql += ' AND is_active = true';
        }
        sql += ' ORDER BY name_est';
        
        return await query(sql, params);
    }

    /**
     * Uuenda teenust
     */
    static async update(id, serviceData) {
        const {
            name_est, name_eng, name_rus,
            description_est, description_eng, description_rus,
            category, price, duration_minutes, is_active
        } = serviceData;

        await query(
            `UPDATE services 
            SET name_est = ?, name_eng = ?, name_rus = ?,
                description_est = ?, description_eng = ?, description_rus = ?,
                category = ?, price = ?, duration_minutes = ?, is_active = ?,
                updated_at = NOW()
            WHERE id = ?`,
            [name_est, name_eng, name_rus, description_est, description_eng, description_rus,
             category, price, duration_minutes, is_active, id]
        );

        return await this.findById(id);
    }

    /**
     * Kustuta teenus
     */
    static async delete(id) {
        await query('DELETE FROM services WHERE id = ?', [id]);
        return true;
    }

    /**
     * Aktiveeri/deaktiveeri teenus
     */
    static async toggleActive(id) {
        await query(
            'UPDATE services SET is_active = NOT is_active, updated_at = NOW() WHERE id = ?',
            [id]
        );
        return await this.findById(id);
    }

    /**
     * Otsi teenuseid
     */
    static async search(searchTerm, lang = 'est') {
        const nameField = `name_${lang}`;
        const descField = `description_${lang}`;
        
        return await query(
            `SELECT * FROM services 
             WHERE ${nameField} LIKE ? OR ${descField} LIKE ?
             ORDER BY name_est`,
            [`%${searchTerm}%`, `%${searchTerm}%`]
        );
    }

    /**
     * Hangi teenuste kategooriad
     */
    static async getCategories() {
        return [
            { value: 'remonttööd', label_est: 'Remonttööd', label_eng: 'Repair Works', label_rus: 'Ремонтные работы' },
            { value: 'mootoriremont', label_est: 'Mootoriremont', label_eng: 'Engine Repair', label_rus: 'Ремонт двигателя' },
            { value: 'diagnostika', label_est: 'Diagnostika', label_eng: 'Diagnostics', label_rus: 'Диагностика' },
            { value: 'elektritööd', label_est: 'Elektritööd', label_eng: 'Electrical Works', label_rus: 'Электромонтажные работы' },
            { value: 'ostueelne_kontroll', label_est: 'Ostueelne kontroll', label_eng: 'Pre-purchase Inspection', label_rus: 'Предпокупочная проверка' }
        ];
    }

    /**
     * Hangi teenuste statistika
     */
    static async getStatistics() {
        const stats = await query(`
            SELECT 
                category,
                COUNT(*) as count,
                AVG(price) as avg_price,
                SUM(CASE WHEN is_active = true THEN 1 ELSE 0 END) as active_count
            FROM services
            GROUP BY category
        `);

        return stats;
    }
}

module.exports = Service;
