-- Populaarsed automarkide ja mudelite seed andmed
-- Kasutatakse kui CarQuery API ei tööta

USE bma_motors;

-- Tühjenda olemasolevad andmed
DELETE FROM car_models;
DELETE FROM car_makes;

-- Lisa populaarsed automarkid
INSERT INTO car_makes (make_id, make_display, make_country) VALUES
('audi', 'Audi', 'Germany'),
('bmw', 'BMW', 'Germany'),
('mercedes', 'Mercedes-Benz', 'Germany'),
('volkswagen', 'Volkswagen', 'Germany'),
('toyota', 'Toyota', 'Japan'),
('honda', 'Honda', 'Japan'),
('nissan', 'Nissan', 'Japan'),
('mazda', 'Mazda', 'Japan'),
('ford', 'Ford', 'USA'),
('chevrolet', 'Chevrolet', 'USA'),
('volvo', 'Volvo', 'Sweden'),
('peugeot', 'Peugeot', 'France'),
('renault', 'Renault', 'France'),
('citroen', 'Citroën', 'France'),
('skoda', 'Škoda', 'Czech Republic'),
('hyundai', 'Hyundai', 'South Korea'),
('kia', 'Kia', 'South Korea'),
('opel', 'Opel', 'Germany'),
('seat', 'SEAT', 'Spain'),
('fiat', 'Fiat', 'Italy');

-- Lisa populaarsed mudelid

-- Audi mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('audi', 'A3', 1996, 2024),
('audi', 'A4', 1994, 2024),
('audi', 'A6', 1994, 2024),
('audi', 'Q3', 2011, 2024),
('audi', 'Q5', 2008, 2024),
('audi', 'Q7', 2005, 2024);

-- BMW mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('bmw', '3 Series', 1975, 2024),
('bmw', '5 Series', 1972, 2024),
('bmw', 'X1', 2009, 2024),
('bmw', 'X3', 2003, 2024),
('bmw', 'X5', 1999, 2024);

-- Mercedes-Benz mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('mercedes', 'C-Class', 1993, 2024),
('mercedes', 'E-Class', 1993, 2024),
('mercedes', 'A-Class', 1997, 2024),
('mercedes', 'GLC', 2015, 2024),
('mercedes', 'GLE', 1997, 2024);

-- Volkswagen mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('volkswagen', 'Golf', 1974, 2024),
('volkswagen', 'Passat', 1973, 2024),
('volkswagen', 'Tiguan', 2007, 2024),
('volkswagen', 'Polo', 1975, 2024),
('volkswagen', 'Touran', 2003, 2024);

-- Toyota mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('toyota', 'Corolla', 1966, 2024),
('toyota', 'Camry', 1982, 2024),
('toyota', 'RAV4', 1994, 2024),
('toyota', 'Avensis', 1997, 2018),
('toyota', 'Yaris', 1999, 2024);

-- Honda mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('honda', 'Civic', 1972, 2024),
('honda', 'Accord', 1976, 2024),
('honda', 'CR-V', 1995, 2024),
('honda', 'Jazz', 2001, 2024);

-- Nissan mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('nissan', 'Qashqai', 2006, 2024),
('nissan', 'X-Trail', 2000, 2024),
('nissan', 'Juke', 2010, 2024),
('nissan', 'Micra', 1982, 2024);

-- Mazda mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('mazda', '3', 2003, 2024),
('mazda', '6', 2002, 2024),
('mazda', 'CX-5', 2012, 2024),
('mazda', 'CX-3', 2015, 2024);

-- Ford mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('ford', 'Focus', 1998, 2024),
('ford', 'Fiesta', 1976, 2023),
('ford', 'Mondeo', 1993, 2022),
('ford', 'Kuga', 2008, 2024),
('ford', 'Transit', 1965, 2024);

-- Volvo mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('volvo', 'V40', 1995, 2019),
('volvo', 'V60', 2010, 2024),
('volvo', 'V70', 1996, 2016),
('volvo', 'XC60', 2008, 2024),
('volvo', 'XC90', 2002, 2024);

-- Peugeot mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('peugeot', '208', 2012, 2024),
('peugeot', '308', 2007, 2024),
('peugeot', '3008', 2008, 2024),
('peugeot', '5008', 2009, 2024);

-- Renault mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('renault', 'Clio', 1990, 2024),
('renault', 'Megane', 1995, 2024),
('renault', 'Captur', 2013, 2024),
('renault', 'Kadjar', 2015, 2024);

-- Skoda mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('skoda', 'Octavia', 1996, 2024),
('skoda', 'Fabia', 1999, 2024),
('skoda', 'Superb', 2001, 2024),
('skoda', 'Kodiaq', 2016, 2024);

-- Hyundai mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('hyundai', 'i20', 2008, 2024),
('hyundai', 'i30', 2007, 2024),
('hyundai', 'Tucson', 2004, 2024),
('hyundai', 'Santa Fe', 2000, 2024);

-- Kia mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('kia', 'Ceed', 2006, 2024),
('kia', 'Sportage', 1993, 2024),
('kia', 'Sorento', 2002, 2024),
('kia', 'Picanto', 2004, 2024);

-- Opel mudelid
INSERT INTO car_models (make_id, model_name, model_year_min, model_year_max) VALUES
('opel', 'Astra', 1991, 2024),
('opel', 'Corsa', 1982, 2024),
('opel', 'Insignia', 2008, 2024),
('opel', 'Mokka', 2012, 2024);

SELECT 
    COUNT(DISTINCT make_id) as total_makes,
    COUNT(*) as total_models
FROM car_models;

SELECT make_display, COUNT(*) as model_count
FROM car_makes cm
LEFT JOIN car_models md ON cm.make_id = md.make_id
GROUP BY cm.make_id, make_display
ORDER BY make_display;
