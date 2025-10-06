const { query } = require('../config/database');

class Client {
    /**
     * Loo uus klient või tagasta olemasolev
     */
    static async findOrCreate(clientData) {
        const { name, email, phone, address = null, notes = null } = clientData;

        // Otsi olemasolev klient e-maili põhjal
        const existing = await query(
            'SELECT * FROM clients WHERE email = ?',
            [email]
        );

        if (existing && existing.length > 0) {
            return existing[0];
        }

        // Loo uus klient
        const result = await query(
            `INSERT INTO clients (name, email, phone, address, notes) 
             VALUES (?, ?, ?, ?, ?)`,
            [name, email, phone, address, notes]
        );

        return {
            id: result.insertId,
            name,
            email,
            phone,
            address,
            notes
        };
    }

    /**
     * Leia klient ID järgi
     */
    static async findById(id) {
        const results = await query(
            'SELECT * FROM clients WHERE id = ?',
            [id]
        );
        return results[0];
    }

    /**
     * Leia klient e-maili järgi
     */
    static async findByEmail(email) {
        const results = await query(
            'SELECT * FROM clients WHERE email = ?',
            [email]
        );
        return results[0];
    }

    /**
     * Uuenda kliendi andmeid
     */
    static async update(id, clientData) {
        const { name, phone, address, notes } = clientData;
        
        await query(
            `UPDATE clients 
             SET name = ?, phone = ?, address = ?, notes = ?, updated_at = NOW() 
             WHERE id = ?`,
            [name, phone, address, notes, id]
        );

        return await this.findById(id);
    }

    /**
     * Kustuta klient
     */
    static async delete(id) {
        await query('DELETE FROM clients WHERE id = ?', [id]);
        return true;
    }

    /**
     * Leia kõik kliendid
     */
    static async findAll(limit = 100, offset = 0) {
        return await query(
            'SELECT * FROM clients ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
    }

    /**
     * Otsi kliente nime või e-maili järgi
     */
    static async search(searchTerm) {
        return await query(
            `SELECT * FROM clients 
             WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?
             ORDER BY created_at DESC`,
            [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
        );
    }

    /**
     * Hangi kliendi statistika
     */
    static async getStatistics(clientId) {
        const bookings = await query(
            'SELECT COUNT(*) as count FROM bookings WHERE client_id = ?',
            [clientId]
        );

        const inquiries = await query(
            'SELECT COUNT(*) as count FROM sparepart_inquiries WHERE client_id = ?',
            [clientId]
        );

        return {
            totalBookings: bookings[0].count,
            totalInquiries: inquiries[0].count
        };
    }
}

module.exports = Client;
