const { query } = require('../config/database');

class SparePartStatus {
    /**
     * Leia kõik staatused
     */
    static async findAll() {
        return await query('SELECT * FROM sparepart_status ORDER BY id');
    }

    /**
     * Leia staatus ID järgi
     */
    static async findById(id) {
        const results = await query(
            'SELECT * FROM sparepart_status WHERE id = ?',
            [id]
        );
        return results[0];
    }

    /**
     * Leia staatus nime järgi
     */
    static async findByName(statusName) {
        const results = await query(
            'SELECT * FROM sparepart_status WHERE status_name = ?',
            [statusName]
        );
        return results[0];
    }

    /**
     * Loo uus staatus (admin)
     */
    static async create(statusData) {
        const {
            status_name,
            status_name_est,
            status_name_eng,
            status_name_rus,
            color_code = '#808080'
        } = statusData;

        const result = await query(
            `INSERT INTO sparepart_status 
            (status_name, status_name_est, status_name_eng, status_name_rus, color_code) 
            VALUES (?, ?, ?, ?, ?)`,
            [status_name, status_name_est, status_name_eng, status_name_rus, color_code]
        );

        return {
            id: result.insertId,
            ...statusData
        };
    }

    /**
     * Uuenda staatust
     */
    static async update(id, statusData) {
        const {
            status_name_est,
            status_name_eng,
            status_name_rus,
            color_code
        } = statusData;

        await query(
            `UPDATE sparepart_status 
            SET status_name_est = ?, status_name_eng = ?, status_name_rus = ?, color_code = ?
            WHERE id = ?`,
            [status_name_est, status_name_eng, status_name_rus, color_code, id]
        );

        return await this.findById(id);
    }

    /**
     * Kustuta staatus
     */
    static async delete(id) {
        await query('DELETE FROM sparepart_status WHERE id = ?', [id]);
        return true;
    }
}

module.exports = SparePartStatus;
