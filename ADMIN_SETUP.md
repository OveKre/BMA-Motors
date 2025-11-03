# Admin Setup Guide

## For the Client - Setting Up Admin Access

When you receive this project, you need to set up your admin credentials before you can access the admin panel.

### Prerequisites

- Node.js installed on your server
- Database configured and running
- Project deployed and `.env` file configured with database credentials

### Step-by-Step Instructions

#### 1. Connect to Your Server

SSH into your Hetzner server:

```bash
ssh your-user@your-server-ip
```

#### 2. Navigate to Backend Directory

```bash
cd /path/to/BMA_MOTORS/backend
```

For example, if your project is in `/var/www/bma-motors`:

```bash
cd /var/www/bma-motors/backend
```

#### 3. Run the Admin Setup Script

```bash
node setup_admin.js
```

#### 4. Follow the Interactive Prompts

The script will ask you for:

1. **Admin email** (default: admin@bmamotors.ee)
   - Press Enter to use default, or type a new email

2. **Admin username** (default: admin)
   - Press Enter to use default, or type a new username

3. **New password**
   - Must be at least 8 characters
   - Must contain uppercase letter (A-Z)
   - Must contain lowercase letter (a-z)
   - Must contain at least one number (0-9)
   - Example: `MySecure123`

4. **Confirm password**
   - Type the same password again

#### 5. Success!

If everything works correctly, you'll see:

```
===========================================
   Setup Complete!
===========================================

Admin credentials:
  Email/Username: admin@bmamotors.ee or admin
  Password: [the password you just entered]

You can now login to the admin panel at:
  http://your-domain.com/admin/login

⚠️  Keep these credentials secure!
===========================================
```

### What If Something Goes Wrong?

#### Database Connection Error

If you see a database connection error:

```
❌ Error during setup: connect ECONNREFUSED
```

**Solution:**
1. Check your `.env` file in the backend directory
2. Make sure these variables are correct:
   ```
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=bma_motors
   DB_PORT=3306
   ```
3. Verify MySQL/MariaDB is running:
   ```bash
   sudo systemctl status mysql
   # or
   sudo systemctl status mariadb
   ```

#### Password Requirements Error

If your password is rejected:

```
❌ Password does not meet requirements:
  - Password must be at least 8 characters long
  - Password must contain at least one uppercase letter
```

**Solution:** Use a stronger password that meets all requirements.

### Security Best Practices

1. **Use a strong, unique password** - Don't reuse passwords from other services
2. **Keep credentials private** - Don't share admin credentials with unauthorized users
3. **Change password periodically** - Run this script again anytime to update the password
4. **Use HTTPS** - Always access admin panel over HTTPS in production

### Accessing the Admin Panel

After setup, visit:

```
https://your-domain.com/admin/login
```

Or if using IP address temporarily:

```
http://your-server-ip:3000/admin/login
```

Login with:
- **Username or Email:** The one you entered during setup
- **Password:** The password you created

### Resetting Admin Password Later

If you forget your password or need to reset it:

1. SSH into your server
2. Navigate to backend directory
3. Run the setup script again:
   ```bash
   node setup_admin.js
   ```
4. Enter a new password when prompted

The script will update the existing admin user with the new password.

### Troubleshooting

#### "Cannot find module 'bcrypt'"

**Solution:**
```bash
cd backend
npm install
```

#### "Access denied for user"

**Solution:** Check database credentials in `.env` file

#### "Table 'users' doesn't exist"

**Solution:** Run database migrations:
```bash
cd backend
npm run migrate
# or import the init.sql file
mysql -u your_user -p bma_motors < ../database/init.sql
```

### Support

If you encounter any issues not covered here, please contact the development team.

---

## For Developers

### Script Details

The `setup_admin.js` script:

- Connects to the database using credentials from `.env`
- Prompts for admin email, username, and password
- Validates password strength (min 8 chars, uppercase, lowercase, number)
- Hashes password with bcrypt (cost factor 12)
- Creates new admin user OR updates existing one
- Works with MySQL/MariaDB databases

### Running in Development

```bash
cd backend
node setup_admin.js
```

### Testing

Test the script with:
- Valid strong password
- Weak password (should be rejected)
- Mismatched confirmation (should be rejected)
- Database connection errors (wrong credentials)
- Existing admin user (should update)
- New admin user (should create)

### Adding to Package.json

You can add this as an npm script:

```json
{
  "scripts": {
    "setup:admin": "node setup_admin.js"
  }
}
```

Then run with:
```bash
npm run setup:admin
```
