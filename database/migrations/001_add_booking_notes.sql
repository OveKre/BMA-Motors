-- Migration: Add booking notes field
-- Date: 2025-10-07

USE bma_motors;

-- Add internal notes field to bookings
ALTER TABLE bookings 
ADD COLUMN internal_notes TEXT AFTER admin_notes;

-- Add index for better performance
ALTER TABLE bookings 
ADD INDEX idx_status_date (status, booking_date);

-- Log migration
INSERT INTO activity_logs (user_id, action_type, description) 
VALUES (NULL, 'MIGRATION', 'Added internal_notes field to bookings table');
