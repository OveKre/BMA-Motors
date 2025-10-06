-- Fix admin password to Admin123!
UPDATE users 
SET password_hash = '$2b$10$xLm3VZ4naXkJERE/Ne1MwOf9v/gKnPzLF5B6J9ChuzfRI3QBybjcS' 
WHERE username = 'admin';

SELECT username, email, role, 'Password updated to Admin123!' as status 
FROM users 
WHERE username = 'admin';
