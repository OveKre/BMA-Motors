-- DEPRECATED: Use backend/reset_admin_password.js instead
-- This file is kept for reference only
--
-- To reset admin password, run:
-- node backend/reset_admin_password.js YourSecurePassword

-- Legacy password reset (not recommended)
UPDATE users 
SET password_hash = '$2b$10$xLm3VZ4naXkJERE/Ne1MwOf9v/gKnPzLF5B6J9ChuzfRI3QBybjcS' 
WHERE username = 'admin';

SELECT username, email, role, 'Password updated - change immediately!' as status 
FROM users 
WHERE username = 'admin';
