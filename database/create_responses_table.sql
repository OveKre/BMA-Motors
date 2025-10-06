-- Loo varuosapäringu vastuste tabel
CREATE TABLE IF NOT EXISTS sparepart_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inquiry_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    availability ENUM('in_stock', 'order_needed', 'unavailable') NOT NULL,
    delivery_time VARCHAR(100) NOT NULL,
    additional_info TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inquiry_id) REFERENCES sparepart_inquiries(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Lisa response_date väli sparepart_inquiries tabelisse kui seda pole
ALTER TABLE sparepart_inquiries 
ADD COLUMN IF NOT EXISTS response_date DATETIME NULL;

-- Loo index'id
CREATE INDEX idx_inquiry_id ON sparepart_responses(inquiry_id);
CREATE INDEX idx_created_at ON sparepart_responses(created_at);
