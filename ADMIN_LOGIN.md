# Admin Login Instructions

## Admin Credentials Setup

**Username:** `admin`  
**Password:** Must be set using reset_admin_password.js script

### Setting Admin Password

```powershell
cd backend
node reset_admin_password.js YourSecurePassword
```

---

## If Login Fails on Hetzner Server

### Problem
The password hash in the database doesn't match, preventing admin login.

### Solution 1: Reset Password Using Script

1. **SSH into your Hetzner server:**
   ```bash
   ssh root@your-server-ip
   ```

2. **Navigate to backend directory:**
   ```bash
   cd /path/to/BMA_MOTORS/backend
   ```

3. **Run the password reset script:**
   ```bash
   node reset_admin_password.js
   ```
   
   This will reset the password to `admin123` (default).

4. **Or set a custom password:**
   ```bash
   node reset_admin_password.js YourNewPassword123
   ```

### Solution 2: Reset Password Manually via MySQL

1. **Connect to MySQL:**
   ```bash
   mysql -u root -p
   ```

2. **Use the database:**
   ```sql
   USE bma_motors;
   ```

3. **Generate a new hash locally:**
   - On your local machine, run:
     ```bash
     cd backend
     node src/utils/generatePasswordHash.js
     ```
   - Enter your desired password
   - Copy the generated hash

4. **Update the password in MySQL:**
   ```sql
   UPDATE users 
   SET password_hash = 'YOUR_GENERATED_HASH_HERE' 
   WHERE username = 'admin';
   ```

5. **Verify the update:**
   ```sql
   SELECT username, password_hash FROM users WHERE username = 'admin';
   ```

### Solution 3: Recreate Admin User

If the admin user doesn't exist:

```sql
USE bma_motors;

-- Check if user exists
SELECT * FROM users WHERE username = 'admin';

-- To create user with custom password, use the reset script:
-- node reset_admin_password.js YourSecurePassword
```

---

## Password Requirements

- Minimum 6 characters (recommended 8+)
- Mix of uppercase and lowercase letters
- Include numbers
- Include special characters (recommended)

---

## Security Notes

1. **Change the default password immediately after first login**
2. **Never commit real passwords to git**
3. **Use strong passwords in production**
4. **Enable 2FA if implementing in future**

---

## Troubleshooting

### Error: "Vale kasutajanimi või parool"

**Possible causes:**
1. Password hash mismatch
2. User is inactive (`is_active = false`)
3. User doesn't exist
4. bcrypt version mismatch

**Debug steps:**
```sql
-- Check user status
SELECT username, email, role, is_active, 
       LEFT(password_hash, 20) as hash_preview 
FROM users 
WHERE username = 'admin';

-- Ensure user is active
UPDATE users SET is_active = TRUE WHERE username = 'admin';
```

### Testing Password Hash

Use the `reset_admin_password.js` script which includes verification:

```bash
node reset_admin_password.js testpass123
```

The script will:
- Generate new hash
- Update database
- Verify the password works
- Show success/failure message

---

## Environment Variables

Ensure these are set in your `.env` file on Hetzner:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=bma_motors
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
```

---

## Quick Password Reset

On server:

```bash
cd /path/to/BMA_MOTORS/backend && node reset_admin_password.js YourNewPassword
```

This will reset the admin password securely.
