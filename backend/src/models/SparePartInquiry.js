const { query } = require('../config/database');
const Client = require('./Client');

class SparePartInquiry {
    /**
     * Loo uus varuosapäring
     */
    static async create(inquiryData) {
        const {
            client_name, client_email, client_phone,
            car_make, car_model, car_year, 
            license_plate, // Numbrimärk (kasutab vin_code välja andmebaasis)
            sparepart_name, sparepart_description
        } = inquiryData;

        // Loo või leia klient
        const client = await Client.findOrCreate({
            name: client_name,
            email: client_email,
            phone: client_phone
        });

        // Loo päring
        const result = await query(
            `INSERT INTO sparepart_inquiries 
            (client_id, client_name, client_email, client_phone, 
             car_make, car_model, car_year, vin_code, 
             sparepart_name, sparepart_description, status_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
            [
                client.id, client_name, client_email, client_phone,
                car_make, car_model, car_year, license_plate, // Numbrimärk salvestub vin_code väljale
                sparepart_name, sparepart_description
            ]
        );

        return {
            id: result.insertId,
            client_id: client.id,
            ...inquiryData,
            status_id: 1,
            created_at: new Date()
        };
    }

    /**
     * Leia päring ID järgi
     */
    static async findById(id) {
        const results = await query(
            `SELECT i.*, s.status_name, s.status_name_est, s.status_name_eng, s.status_name_rus, s.color_code
             FROM sparepart_inquiries i
             LEFT JOIN sparepart_status s ON i.status_id = s.id
             WHERE i.id = ?`,
            [id]
        );
        return results[0];
    }

    /**
     * Leia kõik päringud
     */
    static async findAll(filters = {}) {
        let sql = `
            SELECT i.*, s.status_name, s.status_name_est, s.color_code
            FROM sparepart_inquiries i
            LEFT JOIN sparepart_status s ON i.status_id = s.id
            WHERE 1=1
        `;
        const params = [];

        // Filtreeri staatuse järgi
        if (filters.status_id) {
            sql += ' AND i.status_id = ?';
            params.push(filters.status_id);
        }

        // Filtreeri kuupäeva järgi
        if (filters.date_from) {
            sql += ' AND DATE(i.created_at) >= ?';
            params.push(filters.date_from);
        }

        if (filters.date_to) {
            sql += ' AND DATE(i.created_at) <= ?';
            params.push(filters.date_to);
        }

        // Filtreeri auto margi järgi
        if (filters.car_make) {
            sql += ' AND i.car_make = ?';
            params.push(filters.car_make);
        }

        sql += ' ORDER BY i.created_at DESC';

        // Pagination
        if (filters.limit) {
            sql += ' LIMIT ?';
            params.push(parseInt(filters.limit));
            
            if (filters.offset) {
                sql += ' OFFSET ?';
                params.push(parseInt(filters.offset));
            }
        }

        return await query(sql, params);
    }

    /**
     * Uuenda päringu staatust
     */
    static async updateStatus(id, statusId, adminNotes = null) {
        let sql = 'UPDATE sparepart_inquiries SET status_id = ?, updated_at = NOW()';
        const params = [statusId];

        if (adminNotes !== null) {
            sql += ', admin_notes = ?';
            params.push(adminNotes);
        }

        sql += ' WHERE id = ?';
        params.push(id);

        await query(sql, params);
        return await this.findById(id);
    }

    /**
     * Märgi vastus saadetud
     */
    static async markResponseSent(id) {
        await query(
            'UPDATE sparepart_inquiries SET response_sent = true, updated_at = NOW() WHERE id = ?',
            [id]
        );
        return await this.findById(id);
    }

    /**
     * Kustuta päring
     */
    static async delete(id) {
        await query('DELETE FROM sparepart_inquiries WHERE id = ?', [id]);
        return true;
    }

    /**
     * Otsi päringuid
     */
    static async search(searchTerm) {
        return await query(
            `SELECT i.*, s.status_name_est, s.color_code
             FROM sparepart_inquiries i
             LEFT JOIN sparepart_status s ON i.status_id = s.id
             WHERE i.client_name LIKE ? 
                OR i.client_email LIKE ? 
                OR i.car_make LIKE ? 
                OR i.car_model LIKE ?
                OR i.sparepart_name LIKE ?
             ORDER BY i.created_at DESC`,
            [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
        );
    }

    /**
     * Hangi statistika
     */
    static async getStatistics() {
        const stats = await query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status_id = 1 THEN 1 ELSE 0 END) as new_count,
                SUM(CASE WHEN status_id = 2 THEN 1 ELSE 0 END) as processing_count,
                SUM(CASE WHEN status_id = 5 THEN 1 ELSE 0 END) as completed_count,
                SUM(CASE WHEN response_sent = true THEN 1 ELSE 0 END) as response_sent_count
            FROM sparepart_inquiries
        `);

        const byCarMake = await query(`
            SELECT car_make, COUNT(*) as count
            FROM sparepart_inquiries
            GROUP BY car_make
            ORDER BY count DESC
            LIMIT 10
        `);

        return {
            overview: stats[0],
            topCarMakes: byCarMake
        };
    }
}

module.exports = SparePartInquiry;
