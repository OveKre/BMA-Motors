/**
 * Admin Setup Script
 * 
 * This interactive script allows you to create or update the admin user password.
 * Run this script when deploying the project for the first time or when you need to reset the admin password.
 * 
 * Usage:
 *   node setup_admin.js
 * 
 * The script will:
 * 1. Ask for your desired admin password
 * 2. Validate password strength (minimum 8 characters)
 * 3. Hash the password securely with bcrypt
 * 4. Update or create the admin user in the database
 */

const bcrypt = require('bcrypt');
const readline = require('readline');
const mysql = require('mysql2/promise');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Validate password strength
function validatePassword(password) {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return errors;
}

async function setupAdmin() {
  console.log('\n===========================================');
  console.log('   BMA MOTORS - Admin Setup');
  console.log('===========================================\n');
  
  try {
    // Create database connection
    console.log('Connecting to database...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'bma_motors',
      port: process.env.DB_PORT || 3306
    });
    
    console.log('✓ Connected to database\n');
    
    // Get admin email (or use default)
    const defaultEmail = 'admin@bmamotors.ee';
    const email = await question(`Admin email (default: ${defaultEmail}): `);
    const adminEmail = email.trim() || defaultEmail;
    
    // Get admin username (or use default)
    const defaultUsername = 'admin';
    const username = await question(`Admin username (default: ${defaultUsername}): `);
    const adminUsername = username.trim() || defaultUsername;
    
    // Get password
    let password = '';
    let passwordValid = false;
    
    while (!passwordValid) {
      password = await question('\nEnter new admin password: ');
      
      if (!password) {
        console.log('Password cannot be empty. Please try again.');
        continue;
      }
      
      const errors = validatePassword(password);
      
      if (errors.length > 0) {
        console.log('\n❌ Password does not meet requirements:');
        errors.forEach(error => console.log('  - ' + error));
        console.log('\nPlease try again with a stronger password.\n');
      } else {
        const confirm = await question('Confirm password: ');
        
        if (password !== confirm) {
          console.log('\n❌ Passwords do not match. Please try again.\n');
        } else {
          passwordValid = true;
        }
      }
    }
    
    // Hash password
    console.log('\nHashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('✓ Password hashed securely');
    
    // Check if admin user exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [adminEmail, adminUsername]
    );
    
    if (existingUsers.length > 0) {
      // Update existing admin
      console.log('\nAdmin user found. Updating password...');
      await connection.execute(
        'UPDATE users SET password = ?, username = ?, email = ?, role = ? WHERE id = ?',
        [hashedPassword, adminUsername, adminEmail, 'admin', existingUsers[0].id]
      );
      console.log('✓ Admin password updated successfully');
    } else {
      // Create new admin
      console.log('\nCreating new admin user...');
      await connection.execute(
        'INSERT INTO users (username, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())',
        [adminUsername, adminEmail, hashedPassword, 'admin']
      );
      console.log('✓ Admin user created successfully');
    }
    
    console.log('\n===========================================');
    console.log('   Setup Complete!');
    console.log('===========================================');
    console.log('\nAdmin credentials:');
    console.log(`  Email/Username: ${adminEmail} or ${adminUsername}`);
    console.log(`  Password: [the password you just entered]`);
    console.log('\nYou can now login to the admin panel at:');
    console.log('  http://your-domain.com/admin/login');
    console.log('\n⚠️  Keep these credentials secure!');
    console.log('===========================================\n');
    
    await connection.end();
    rl.close();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error during setup:', error.message);
    console.error('\nPlease check your database connection and try again.');
    console.error('Make sure your .env file has correct database credentials.\n');
    rl.close();
    process.exit(1);
  }
}

// Run setup
setupAdmin();
