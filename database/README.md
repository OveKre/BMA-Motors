# BMA Motors Database Documentation

## Ülevaade

BMA Motors andmebaas kasutab MariaDB (MySQL) ja on loodud autoremondi töökoja veebilehe toetamiseks.

## Struktuur

### Põhitabelid

1. **users** - Administraatorid ja kasutajad
2. **clients** - Kliendid
3. **car_makes** / **car_models** - Auto margid ja mudelid (CarQuery API)
4. **services** - Teenused (mitmekeelsed)
5. **sparepart_inquiries** - Varuosapäringud
6. **bookings** - Broneeringud
7. **gallery_images** - Galerii pildid
8. **contact_messages** - Kontaktisõnumid
9. **activity_logs** - Tegevuste logid
10. **email_logs** - E-maili saatmise logid

## Käivitamine

### Docker Desktop'iga

```bash
# Käivita konteiner
docker-compose up -d mariadb

# Kontrolli staatust
docker-compose ps

# Vaata logisid
docker-compose logs -f mariadb
```

### Otseühendus

```bash
# Ühenda MariaDB CLI kaudu
docker exec -it bma_motors_db mysql -u bma_admin -p

# Sisesta parool: bma_admin_password
```

## Migratsioonid

Tulevased skeema muudatused tuleb lisada `migrations/` kausta:

```sql
-- migrations/001_add_booking_notes.sql
ALTER TABLE bookings ADD COLUMN internal_notes TEXT AFTER admin_notes;
```

## Andmete import

### CarQuery API integratsioon

Backend impordib automaatselt auto margid ja mudelid:

```javascript
// Käivita import
npm run import-cars
```

## Varukoopia

```bash
# Loo varukoopia
docker exec bma_motors_db mysqldump -u bma_admin -pbma_admin_password bma_motors > backup.sql

# Taasta varukoopia
docker exec -i bma_motors_db mysql -u bma_admin -pbma_admin_password bma_motors < backup.sql
```

## Turvalisus

- Root parool: muuda `docker-compose.yml` failis
- Admin parool: genereeritud bcrypt hashiga
- Kõik ühendused ainult sisevõrgu kaudu
- Logid: `/logs/mysql/` kaustas

## Indeksid

Kõik tabelid on optimeeritud järgmiste indeksitega:
- Otsinguväljad (email, phone)
- Kuupäevad (created_at, booking_date)
- Staatused ja kategooriad
- Võõrvõtmed

## Logide jälgimine

```bash
# Backend logid
tail -f logs/backend/activity.log

# MySQL logid
tail -f logs/mysql/general.log
```
