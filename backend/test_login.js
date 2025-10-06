const bcrypt = require('bcrypt');
const { query } = require('./src/config/database');

async function testLogin() {
    try {
        const password = 'Admin123!';
        
        // Get user from database
        const users = await query(
            'SELECT * FROM users WHERE username = ?',
            ['admin']
        );
        
        if (users.length === 0) {
            console.log('❌ User not found');
            return;
        }
        
        const user = users[0];
        console.log('User found:', user.username);
        console.log('Email:', user.email);
        console.log('Hash from DB:', user.password_hash);
        
        // Test password
        const isValid = await bcrypt.compare(password, user.password_hash);
        console.log('\nPassword test result:', isValid ? '✅ VALID' : '❌ INVALID');
        
        // Generate new hash for comparison
        const newHash = await bcrypt.hash(password, 10);
        console.log('\nNew hash for Admin123!:', newHash);
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

testLogin();
