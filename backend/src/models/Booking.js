const { query } = require('../config/database');
const Client = require('./Client');

class Booking {
    /**
     * Loo uus broneering
     */
    static async create(bookingData) {
        const {
            client_name, client_email, client_phone,
            service_id, booking_date, booking_time, duration_minutes = 60,
            car_make, car_model, car_year, vin_code, notes
        } = bookingData;

        // Kontrolli, kas aeg on vaba
        const isAvailable = await this.checkAvailability(booking_date, booking_time);
        if (!isAvailable) {
            throw new Error('See aeg on juba broneeritud');
        }

        // Loo või leia klient
        const client = await Client.findOrCreate({
            name: client_name,
            email: client_email,
            phone: client_phone
        });

        // Loo broneering - convert undefined to null
        const result = await query(
            `INSERT INTO bookings 
            (client_id, client_name, client_email, client_phone, service_id,
             booking_date, booking_time, duration_minutes, 
             car_make, car_model, car_year, vin_code, notes, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
            [
                client.id, 
                client_name, 
                client_email, 
                client_phone, 
                service_id || null,
                booking_date, 
                booking_time, 
                duration_minutes,
                car_make || null, 
                car_model || null, 
                car_year || null, 
                vin_code || null, 
                notes || null
            ]
        );

        return {
            id: result.insertId,
            client_id: client.id,
            ...bookingData,
            status: 'pending',
            created_at: new Date()
        };
    }

    /**
     * Leia broneering ID järgi
     */
    static async findById(id) {
        const results = await query(
            `SELECT b.*, s.name_est as service_name_est, s.name_eng as service_name_eng, s.name_rus as service_name_rus
             FROM bookings b
             LEFT JOIN services s ON b.service_id = s.id
             WHERE b.id = ?`,
            [id]
        );
        return results[0];
    }

    /**
     * Leia kõik broneeringud
     */
    static async findAll(filters = {}) {
        let sql = `
            SELECT b.*, s.name_est as service_name
            FROM bookings b
            LEFT JOIN services s ON b.service_id = s.id
            WHERE 1=1
        `;
        const params = [];

        // Filtreeri staatuse järgi
        if (filters.status) {
            sql += ' AND b.status = ?';
            params.push(filters.status);
        }

        // Filtreeri kuupäeva järgi
        if (filters.date_from) {
            sql += ' AND b.booking_date >= ?';
            params.push(filters.date_from);
        }

        if (filters.date_to) {
            sql += ' AND b.booking_date <= ?';
            params.push(filters.date_to);
        }

        // Filtreeri teenuse järgi
        if (filters.service_id) {
            sql += ' AND b.service_id = ?';
            params.push(filters.service_id);
        }

        sql += ' ORDER BY b.booking_date DESC, b.booking_time DESC';

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
     * Kontrolli aja saadavust
     */
    static async checkAvailability(date, time, excludeId = null) {
        let sql = `
            SELECT COUNT(*) as count 
            FROM bookings 
            WHERE booking_date = ? 
            AND booking_time = ? 
            AND status != 'cancelled'
        `;
        const params = [date, time];

        if (excludeId) {
            sql += ' AND id != ?';
            params.push(excludeId);
        }

        const results = await query(sql, params);
        return results[0].count === 0;
    }

    /**
     * Hangi vabad ajad konkreetsel kuupäeval
     */
    static async getAvailableSlots(date) {
        // Hangi tööpäeva algus ja lõpp seadetest
        const startTime = '09:00';
        const endTime = '18:00';
        const slotDuration = 60; // minutit

        // Hangi kõik broneeritud ajad
        const bookedSlots = await query(
            `SELECT booking_time FROM bookings 
             WHERE booking_date = ? AND status != 'cancelled'`,
            [date]
        );

        const bookedTimes = bookedSlots.map(slot => slot.booking_time);

        // Genereeri kõik võimalikud ajad
        const availableSlots = [];
        let currentTime = startTime;

        while (currentTime < endTime) {
            if (!bookedTimes.includes(currentTime)) {
                availableSlots.push(currentTime);
            }
            // Lisa 1 tund
            const [hours, minutes] = currentTime.split(':');
            const newHours = (parseInt(hours) + 1).toString().padStart(2, '0');
            currentTime = `${newHours}:${minutes}`;
        }

        return availableSlots;
    }

    /**
     * Hangi broneeritud ajad konkreetsel kuupäeval
     */
    static async getBookedSlots(date) {
        const bookedSlots = await query(
            `SELECT booking_time FROM bookings 
             WHERE booking_date = ? AND status != 'cancelled'`,
            [date]
        );

        // Normaliseeri aja formaat (eemalda sekundid kui olemas)
        return bookedSlots.map(slot => {
            const time = slot.booking_time;
            // Kui formaat on HH:MM:SS, siis tagasta ainult HH:MM
            return time.length > 5 ? time.substring(0, 5) : time;
        });
    }

    /**
     * Hangi kuu kõigi kuupäevade saadavus (kalendri jaoks)
     */
    static async getMonthAvailability(year, month) {
        // Määra kuu esimene ja viimane päev
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);
        
        const startDate = firstDay.toISOString().split('T')[0];
        const endDate = lastDay.toISOString().split('T')[0];

        // Hangi kõik broneeringud selle kuu kohta
        const bookings = await query(
            `SELECT booking_date, COUNT(*) as booked_count 
             FROM bookings 
             WHERE booking_date BETWEEN ? AND ? 
             AND status != 'cancelled'
             GROUP BY booking_date`,
            [startDate, endDate]
        );

        // Tööpäeva ajad (9 tundi)
        const totalSlotsPerDay = 9; // 09:00-18:00

        // Loo saadavuse objekt
        const availability = {};
        bookings.forEach(booking => {
            // Normaliseeri kuupäeva formaat YYYY-MM-DD
            let dateStr;
            if (booking.booking_date instanceof Date) {
                dateStr = booking.booking_date.toISOString().split('T')[0];
            } else {
                // Kui juba string, jäta samaks
                dateStr = booking.booking_date.toString().split('T')[0];
            }
            
            const bookedCount = booking.booked_count;
            const availableCount = totalSlotsPerDay - bookedCount;
            
            availability[dateStr] = {
                total: totalSlotsPerDay,
                booked: bookedCount,
                available: availableCount,
                isFull: availableCount === 0,
                availabilityPercentage: Math.round((availableCount / totalSlotsPerDay) * 100)
            };
        });

        return availability;
    }

    /**
     * Uuenda broneeringut
     */
    static async update(id, bookingData) {
        const {
            booking_date, booking_time, service_id, duration_minutes,
            car_make, car_model, car_year, vin_code, notes, admin_notes, status
        } = bookingData;

        // Kui muudetakse aega, kontrolli saadavust
        if (booking_date && booking_time) {
            const isAvailable = await this.checkAvailability(booking_date, booking_time, id);
            if (!isAvailable) {
                throw new Error('See aeg on juba broneeritud');
            }
        }

        await query(
            `UPDATE bookings 
            SET booking_date = COALESCE(?, booking_date),
                booking_time = COALESCE(?, booking_time),
                service_id = COALESCE(?, service_id),
                duration_minutes = COALESCE(?, duration_minutes),
                car_make = COALESCE(?, car_make),
                car_model = COALESCE(?, car_model),
                car_year = COALESCE(?, car_year),
                vin_code = COALESCE(?, vin_code),
                notes = COALESCE(?, notes),
                admin_notes = COALESCE(?, admin_notes),
                status = COALESCE(?, status),
                updated_at = NOW()
            WHERE id = ?`,
            [booking_date, booking_time, service_id, duration_minutes,
             car_make, car_model, car_year, vin_code, notes, admin_notes, status, id]
        );

        return await this.findById(id);
    }

    /**
     * Tühista broneering
     */
    static async cancel(id) {
        await query(
            `UPDATE bookings SET status = 'cancelled', updated_at = NOW() WHERE id = ?`,
            [id]
        );
        return await this.findById(id);
    }

    /**
     * Kinnita broneering
     */
    static async confirm(id) {
        await query(
            `UPDATE bookings SET status = 'confirmed', updated_at = NOW() WHERE id = ?`,
            [id]
        );
        return await this.findById(id);
    }

    /**
     * Kustuta broneering
     */
    static async delete(id) {
        await query('DELETE FROM bookings WHERE id = ?', [id]);
        return true;
    }

    /**
     * Otsi broneeringuid
     */
    static async search(searchTerm) {
        return await query(
            `SELECT b.*, s.name_est as service_name
             FROM bookings b
             LEFT JOIN services s ON b.service_id = s.id
             WHERE b.client_name LIKE ? 
                OR b.client_email LIKE ? 
                OR b.client_phone LIKE ?
                OR b.car_make LIKE ?
             ORDER BY b.booking_date DESC, b.booking_time DESC`,
            [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
        );
    }

    /**
     * Hangi broneeringute statistika
     */
    static async getStatistics() {
        const stats = await query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count,
                SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_count,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_count,
                SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_count
            FROM bookings
        `);

        const upcomingBookings = await query(`
            SELECT COUNT(*) as count
            FROM bookings
            WHERE booking_date >= CURDATE()
            AND status IN ('pending', 'confirmed')
        `);

        return {
            overview: stats[0],
            upcomingCount: upcomingBookings[0].count
        };
    }

    /**
     * Hangi täna broneeringud
     */
    static async getTodayBookings() {
        return await query(
            `SELECT b.*, s.name_est as service_name
             FROM bookings b
             LEFT JOIN services s ON b.service_id = s.id
             WHERE b.booking_date = CURDATE()
             AND b.status != 'cancelled'
             ORDER BY b.booking_time`,
            []
        );
    }
}

module.exports = Booking;
