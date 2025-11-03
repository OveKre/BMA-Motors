#!/usr/bin/env node

/**
 * Reset admin password script
 * Usage: node reset_admin_password.js [newPassword]
 * If no password provided, defaults to 'admin123'
 */

const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function resetAdminPassword() {
    const newPassword = process.argv[2] || 'admin123';
    
    console.log('🔄 Starting password reset...');
    console.log(`📝 New password will be: ${newPassword}`);
    
    try {
        // Generate hash
        console.log('🔐 Generating password hash...');
        const hash = await bcrypt.hash(newPassword, 10);
        console.log(`✅ Hash generated: ${hash}`);
        
        // Connect to database
        console.log('🔌 Connecting to database...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'bma_root_password_2025',
            database: process.env.DB_NAME || 'bma_motors'
        });
        
        console.log('✅ Connected to database');
        
        // Update password
        console.log('💾 Updating admin password...');
        const [result] = await connection.execute(
            'UPDATE users SET password_hash = ? WHERE username = ?',
            [hash, 'admin']
        );
        
        if (result.affectedRows === 0) {
            console.error('❌ Admin user not found!');
            process.exit(1);
        }
        
        console.log('✅ Password updated successfully!');
        
        // Verify the update
        const [rows] = await connection.execute(
            'SELECT username, password_hash FROM users WHERE username = ?',
            ['admin']
        );
        
        if (rows.length > 0) {
            console.log('\n📊 Verification:');
            console.log(`Username: ${rows[0].username}`);
            console.log(`Hash in DB: ${rows[0].password_hash}`);
            
            // Test the password
            const isValid = await bcrypt.compare(newPassword, rows[0].password_hash);
            console.log(`\n🔍 Password verification: ${isValid ? '✅ VALID' : '❌ INVALID'}`);
            
            if (!isValid) {
                console.error('❌ Warning: Password verification failed!');
                process.exit(1);
            }
        }
        
        await connection.end();
        
        console.log('\n✅ Admin password reset complete!');
        console.log(`Username: admin`);
        console.log(`Password: ${newPassword}`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

resetAdminPassword();
