# BMA Motors Backend API

## Ülevaade

Node.js/Express backend API BMA Motors veebilehe jaoks.

## Funktsionaalsus

- ✅ RESTful API
- ✅ JWT autentimine
- ✅ Andmebaasi integratsioon (MariaDB)
- ✅ E-maili saatmine
- ✅ Failide üleslaadimine
- ✅ Logide süsteem
- ✅ Rate limiting
- ✅ Error handling

## Paigaldamine

```powershell
npm install
```

## Käivitamine

### Arendus

```powershell
npm run dev
```

### Produktsioon

```powershell
npm start
```

## API Endpoints

Vaata täielikku dokumentatsiooni: [Peamine README](../README.md#api-dokumentatsioon)

## CarQuery andmete import

```powershell
npm run import-cars
```

See impordib auto margid ja mudelid CarQuery API'st andmebaasi.

## Testid

```powershell
npm test
```

## Environment Variables

Vaata `.env.example` faili kõigi vajalike muutujate kohta.

## Projektstruktuur

```
src/
├── config/         # Konfiguratsioonid
├── middleware/     # Express middleware
├── models/         # Andmemudelid
├── routes/         # API marsruudid
├── utils/          # Utility funktsioonid
└── server.js       # Serveri käivitus
```

## Turvalisus

- Paroolid on krüpteeritud Bcrypt'iga
- JWT tokenid session haldamiseks
- Rate limiting API kaitseks
- SQL injection kaitse
- CORS konfiguratsioon

## Logid

Logid salvestatakse `logs/` kausta:
- `combined.log` - Kõik logid
- `error.log` - Ainult vead
- `activity.log` - Kasutajate tegevused
