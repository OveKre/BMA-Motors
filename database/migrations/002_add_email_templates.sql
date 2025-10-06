-- Migration: Add email templates table
-- Date: 2025-10-08

USE bma_motors;

-- Create email templates table
CREATE TABLE IF NOT EXISTS email_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    template_name VARCHAR(100) UNIQUE NOT NULL,
    subject_est VARCHAR(255) NOT NULL,
    subject_eng VARCHAR(255),
    subject_rus VARCHAR(255),
    body_est TEXT NOT NULL,
    body_eng TEXT,
    body_rus TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_template_name (template_name),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default templates
INSERT INTO email_templates (template_name, subject_est, subject_eng, subject_rus, body_est, body_eng, body_rus) VALUES
('booking_confirmation', 
 'Broneeringu kinnitus - BMA Motors',
 'Booking Confirmation - BMA Motors',
 'Подтверждение бронирования - BMA Motors',
 '<h2>Tere, {{client_name}}!</h2><p>Teie broneering on kinnitatud.</p>',
 '<h2>Hello, {{client_name}}!</h2><p>Your booking has been confirmed.</p>',
 '<h2>Здравствуйте, {{client_name}}!</h2><p>Ваше бронирование подтверждено.</p>'),

('inquiry_confirmation',
 'Varuosapäringu kinnitus - BMA Motors',
 'Spare Part Inquiry Confirmation - BMA Motors',
 'Подтверждение запроса запчасти - BMA Motors',
 '<h2>Tere, {{client_name}}!</h2><p>Oleme Teie päringu kätte saanud.</p>',
 '<h2>Hello, {{client_name}}!</h2><p>We have received your inquiry.</p>',
 '<h2>Здравствуйте, {{client_name}}!</h2><p>Мы получили ваш запрос.</p>');

-- Log migration
INSERT INTO activity_logs (user_id, action_type, description) 
VALUES (NULL, 'MIGRATION', 'Created email_templates table');
