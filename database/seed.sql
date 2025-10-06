-- BMA Motors Seed Data
-- Initial data for database

USE bma_motors;

-- Admin kasutaja (parool: Admin123!)
-- Parool tuleb hiljem muuta bcrypt räsiga
INSERT INTO users (username, password_hash, email, role, is_active) VALUES
('admin', '$2b$10$E/EUqcpJ6u3cWlwmOBO93uN.RhfvOVIH409JI0hqXwWFexRLAWQ86', 'admin@bmamotors.ee', 'admin', TRUE);

-- Varuosapäringute staatused
INSERT INTO sparepart_status (status_name, status_name_est, status_name_eng, status_name_rus, color_code) VALUES
('new', 'Uus', 'New', 'Новый', '#3498db'),
('processing', 'Töötlemisel', 'Processing', 'В обработке', '#f39c12'),
('quote_sent', 'Pakkumine saadetud', 'Quote Sent', 'Предложение отправлено', '#9b59b6'),
('ordered', 'Tellitud', 'Ordered', 'Заказано', '#1abc9c'),
('completed', 'Lõpetatud', 'Completed', 'Завершено', '#27ae60'),
('cancelled', 'Tühistatud', 'Cancelled', 'Отменено', '#e74c3c');

-- Teenuste kategooriad
INSERT INTO services (name_est, name_eng, name_rus, description_est, description_eng, description_rus, category, is_active) VALUES
-- Remonttööd
('Pidurisüsteemi hooldus ja remont', 'Brake System Maintenance and Repair', 'Обслуживание и ремонт тормозной системы', 'Pidurite kontroll, klotside ja ketaste vahetus, piduri õli vahetus', 'Brake inspection, pad and disc replacement, brake fluid change', 'Проверка тормозов, замена колодок и дисков, замена тормозной жидкости', 'remonttööd', TRUE),
('Mootorite remont ja vahetus', 'Engine Repair and Replacement', 'Ремонт и замена двигателей', 'Mootori täisremont või vahetus', 'Complete engine overhaul or replacement', 'Капитальный ремонт или замена двигателя', 'remonttööd', TRUE),
('Käigukastide ja vahekastide hooldus', 'Gearbox and Differential Maintenance', 'Обслуживание коробок передач и дифференциалов', 'Käigukasti õli vahetus, remont', 'Gearbox oil change, repairs', 'Замена масла коробки передач, ремонт', 'remonttööd', TRUE),
('Veermiku kontroll ja remont', 'Suspension Check and Repair', 'Проверка и ремонт подвески', 'Veermiku alaosade kontroll ja vahetus', 'Suspension component inspection and replacement', 'Проверка и замена компонентов подвески', 'remonttööd', TRUE),

-- Mootoriremont
('Eelsüütesüsteemide remont', 'Ignition System Repair', 'Ремонт систем предпускового подогрева', 'Hõõgküünalde vahetus ja diagnostika', 'Glow plug replacement and diagnostics', 'Замена свечей накаливания и диагностика', 'mootoriremont', TRUE),
('Mootori vahetus', 'Engine Replacement', 'Замена двигателя', 'Täielik mootori vahetus', 'Complete engine replacement', 'Полная замена двигателя', 'mootoriremont', TRUE),
('Common rail süsteemide remont', 'Common Rail System Repair', 'Ремонт систем Common Rail', 'Süsteüritite diagnostika ja remont', 'Injector diagnostics and repair', 'Диагностика и ремонт форсунок', 'mootoriremont', TRUE),
('Turbolaadurite remont', 'Turbocharger Repair', 'Ремонт турбокомпрессоров', 'Turbo vahetus ja remont', 'Turbo replacement and repair', 'Замена и ремонт турбины', 'mootoriremont', TRUE),
('Mootorikettide vahetus', 'Timing Chain Replacement', 'Замена цепи ГРМ', 'Jaotusketi vahetus', 'Timing chain replacement', 'Замена цепи ГРМ', 'mootoriremont', TRUE),

-- Diagnostika
('Programmeerimine ja kodeerimine', 'Programming and Coding', 'Программирование и кодирование', 'Auto tarkvarade programmeerimine', 'Vehicle software programming', 'Программирование ПО автомобиля', 'diagnostika', TRUE),
('Tarkvara uuendused', 'Software Updates', 'Обновление программного обеспечения', 'BMW AG andmebaasi kaudu', 'Through BMW AG database', 'Через базу данных BMW AG', 'diagnostika', TRUE),
('Mootori diagnostika', 'Engine Diagnostics', 'Диагностика двигателя', 'Täielik mootori diagnostika', 'Complete engine diagnostics', 'Полная диагностика двигателя', 'diagnostika', TRUE),
('Airbag süsteemide diagnostika', 'Airbag System Diagnostics', 'Диагностика системы подушек безопасности', 'Airbag süsteemi kontroll ja remont', 'Airbag system check and repair', 'Проверка и ремонт системы подушек безопасности', 'diagnostika', TRUE),
('ABS süsteemide diagnostika', 'ABS System Diagnostics', 'Диагностика системы ABS', 'ABS süsteemi diagnostika', 'ABS system diagnostics', 'Диагностика системы ABS', 'diagnostika', TRUE),
('ACC kalibreerimine (ADAS)', 'ACC Calibration (ADAS)', 'Калибровка ACC (ADAS)', 'Aktiivse püsikiirussüsteemi kalibreerimine', 'Active cruise control calibration', 'Калибровка активного круиз-контроля', 'diagnostika', TRUE),

-- Elektritööd
('Immobilaiserite paigaldus', 'Immobilizer Installation', 'Установка иммобилайзеров', 'Auto turvalisuse suurendamine', 'Vehicle security enhancement', 'Повышение безопасности автомобиля', 'elektritööd', TRUE),
('Alarmide paigaldus', 'Alarm Installation', 'Установка сигнализации', 'Häiresüsteemide paigaldus', 'Alarm system installation', 'Установка охранных систем', 'elektritööd', TRUE),
('Kärukonksude paigaldus', 'Tow Bar Installation', 'Установка фаркопов', 'Haagiseseadmete paigaldus', 'Trailer hitch installation', 'Установка прицепного устройства', 'elektritööd', TRUE),
('Webasto paigaldus ja remont', 'Webasto Installation and Repair', 'Установка и ремонт Webasto', 'Eelsoojendussüsteemide paigaldus', 'Pre-heating system installation', 'Установка предпускового подогревателя', 'elektritööd', TRUE),
('Parkimisandurite paigaldus', 'Parking Sensor Installation', 'Установка парковочных датчиков', 'Parkimisabi süsteemide paigaldus', 'Parking assistance system installation', 'Установка парктроников', 'elektritööd', TRUE),

-- Ostueelne kontroll
('Ostueelne üldkontroll', 'Pre-Purchase Inspection', 'Предпродажная проверка', 'Täielik auto ülevaatus enne ostmist', 'Complete vehicle inspection before purchase', 'Полный осмотр автомобиля перед покупкой', 'ostueelne_kontroll', TRUE);

-- Varuosa kategooriad
INSERT INTO spareparts_categories (name_est, name_eng, name_rus) VALUES
('Mootor', 'Engine', 'Двигатель'),
('Käigukast', 'Transmission', 'Коробка передач'),
('Veermik', 'Suspension', 'Подвеска'),
('Pidurid', 'Brakes', 'Тормоза'),
('Elekter', 'Electrical', 'Электрика'),
('Kere', 'Body', 'Кузов'),
('Sisustus', 'Interior', 'Салон'),
('Õhkonditsioneerimine', 'Air Conditioning', 'Кондиционирование'),
('Valgustus', 'Lighting', 'Освещение'),
('Muu', 'Other', 'Прочее');

-- Süsteemi seaded
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('site_name', 'BMA Motors', 'Veebilehe nimi'),
('site_email', 'info@bmamotors.ee', 'Kontakt e-mail'),
('site_phone', '+372 XXXX XXXX', 'Kontakt telefon'),
('site_address', 'Tallinn, Estonia', 'Äri aadress'),
('booking_slot_duration', '60', 'Broneeringu kestus minutites'),
('booking_start_time', '09:00', 'Tööpäeva algus'),
('booking_end_time', '18:00', 'Tööpäeva lõpp'),
('max_bookings_per_day', '8', 'Max broneeringuid päevas'),
('auto_confirm_bookings', 'false', 'Automaatne kinnitamine'),
('carquery_api_url', 'https://www.carqueryapi.com/api/0.3/', 'CarQuery API URL');

-- Näidis galerii pildid (tee hiljem uploadid)
INSERT INTO gallery_images (title_est, title_eng, title_rus, description_est, category, image_url, display_order, is_active) VALUES
('Mootoriremont', 'Engine Repair', 'Ремонт двигателя', 'BMW mootori remont', 'mootoriremont', '/uploads/gallery/sample1.jpg', 1, TRUE),
('Diagnostika', 'Diagnostics', 'Диагностика', 'Professionaalne diagnostika', 'diagnostika', '/uploads/gallery/sample2.jpg', 2, TRUE),
('Veermiku remont', 'Suspension Repair', 'Ремонт подвески', 'Veermiku täisremont', 'remonttööd', '/uploads/gallery/sample3.jpg', 3, TRUE);

-- Logi teated
INSERT INTO activity_logs (user_id, action_type, description) VALUES
(1, 'SYSTEM_INIT', 'Database initialized with seed data');
