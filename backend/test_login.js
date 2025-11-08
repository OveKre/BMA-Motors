const bcrypt = require('bcrypt');
const { query } = require('./src/config/database');

async function testLogin() {
    try {
        // Use password from command line argument
        const password = process.argv[2];
        
        if (!password) {
            console.log('❌ Please provide password as argument: node test_login.js <password>');
            process.exit(1);
        }
        
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
        console.log('\nNew hash for provided password:', newHash);
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

testLogin();
