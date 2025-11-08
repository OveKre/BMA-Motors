#!/usr/bin/env node

/**
 * Reset admin password script for BMA Motors
 * Usage: node reset_admin_password.js <newPassword>
 * Password must be provided as argument for security
 * 
 * This script:
 * 1. Generates a bcrypt hash for the password
 * 2. Updates the database
 * 3. Verifies the password works
 * 4. Creates user if it doesn't exist
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function resetAdminPassword() {
    const newPassword = process.argv[2];
    
    if (!newPassword) {
        console.error('❌ Error: Password argument required');
        console.error('Usage: node reset_admin_password.js <newPassword>');
        console.error('Example: node reset_admin_password.js MySecurePassword123!');
        process.exit(1);
    }
    
    console.log('🔄 BMA Motors - Admin Password Reset');
    console.log('=====================================');
    console.log(`📝 Resetting admin password...`);
    console.log('');
    
    let connection;
    
    try {
        // Generate hash
        console.log('🔐 Generating password hash...');
        const hash = await bcrypt.hash(newPassword, 10);
        console.log(`✅ Hash generated successfully`);
        console.log(`   Hash preview: ${hash.substring(0, 30)}...`);
        console.log('');
        
        // Connect to database
        console.log('🔌 Connecting to database...');
        const dbConfig = {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'bma_motors'
        };
        
        console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
        console.log(`   Database: ${dbConfig.database}`);
        console.log(`   User: ${dbConfig.user}`);
        console.log('');
        
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to database');
        console.log('');
        
        // Check if admin user exists
        console.log('🔍 Checking if admin user exists...');
        const [users] = await connection.execute(
            'SELECT id, username, email, role, is_active FROM users WHERE username = ?',
            ['admin']
        );
        
        if (users.length === 0) {
            // Create admin user
            console.log('⚠️  Admin user not found. Creating new admin user...');
            await connection.execute(
                `INSERT INTO users (username, password_hash, email, role, is_active) 
                 VALUES (?, ?, ?, ?, ?)`,
                ['admin', hash, 'admin@bmamotors.ee', 'admin', true]
            );
            console.log('✅ Admin user created successfully!');
        } else {
            // Update existing user
            console.log(`✅ Admin user found (ID: ${users[0].id})`);
            console.log(`   Email: ${users[0].email}`);
            console.log(`   Role: ${users[0].role}`);
            console.log(`   Active: ${users[0].is_active ? 'Yes' : 'No'}`);
            console.log('');
            
            console.log('💾 Updating password...');
            const [result] = await connection.execute(
                'UPDATE users SET password_hash = ?, is_active = TRUE WHERE username = ?',
                [hash, 'admin']
            );
            
            if (result.affectedRows === 0) {
                throw new Error('Failed to update password');
            }
            
            console.log('✅ Password updated successfully!');
        }
        console.log('');
        
        // Verify the update
        console.log('🔍 Verifying password...');
        const [verifyRows] = await connection.execute(
            'SELECT username, password_hash, email, role, is_active FROM users WHERE username = ?',
            ['admin']
        );
        
        if (verifyRows.length === 0) {
            throw new Error('User not found after update');
        }
        
        const user = verifyRows[0];
        console.log('   User details:');
        console.log(`   - Username: ${user.username}`);
        console.log(`   - Email: ${user.email}`);
        console.log(`   - Role: ${user.role}`);
        console.log(`   - Active: ${user.is_active ? 'Yes' : 'No'}`);
        console.log(`   - Hash in DB: ${user.password_hash.substring(0, 30)}...`);
        console.log('');
        
        // Test the password
        console.log('🧪 Testing password verification...');
        const isValid = await bcrypt.compare(newPassword, user.password_hash);
        
        if (!isValid) {
            throw new Error('Password verification failed! The hash in database does not match.');
        }
        
        console.log('✅ Password verification successful!');
        console.log('');
        
        await connection.end();
        
        console.log('═════════════════════════════════════');
        console.log('✅ Admin password reset complete!');
        console.log('═════════════════════════════════════');
        console.log('');
        console.log('🔑 Login credentials:');
        console.log(`   Username: admin`);
        console.log(`   Password: ${newPassword}`);
        console.log(`   Email: ${user.email}`);
        console.log('');
        console.log('🌐 Admin panel URL:');
        console.log('   http://localhost:5173/admin/login (local)');
        console.log('   https://your-domain.com/admin/login (production)');
        console.log('');
        console.log('⚠️  IMPORTANT: Change this password after first login!');
        console.log('');
        
        process.exit(0);
        
    } catch (error) {
        console.error('');
        console.error('❌ ERROR:', error.message);
        console.error('');
        
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 Database access denied. Check your .env file:');
            console.error('   - DB_HOST');
            console.error('   - DB_USER');
            console.error('   - DB_PASSWORD');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('💡 Cannot connect to database. Make sure MySQL is running.');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('💡 Database not found. Create the database first:');
            console.error('   mysql -u root -p < database/init.sql');
        }
        
        console.error('');
        
        if (connection) {
            await connection.end();
        }
        
        process.exit(1);
    }
}

// Run the script
resetAdminPassword();
