# BMA Motors - Autoremondi Töökoja Veebileht

![BMA Motors](https://via.placeholder.com/800x200/0284c7/ffffff?text=BMA+MOTORS)

**BMA Motors** on täisfunktsionaalne autoremondi töökoja veebileht, mis võimaldab:
- 🗓️ **Broneeringute** tegemist kalendrisüsteemi alusel
- 🔧 **Varuosapäringute** esitamist integratsiooniga CarQuery API
- 🌍 **Mitmekeelset** tuge (Eesti, English, Русский)
- 👤 **Admin paneeli** broneeringute ja päringute haldamiseks
- 📧 **Automaatset** e-mailide saatmist
- 📊 **Logide** süsteemi kõigi toimingute jälgimiseks

---

## 📋 Sisukord

1. [Tehnoloogiad](#tehnoloogiad)
2. [Projekti struktuur](#projekti-struktuur)
3. [Paigaldamine](#paigaldamine)
4. [Käivitamine](#käivitamine)
5. [API Dokumentatsioon](#api-dokumentatsioon)
6. [Testimine](#testimine)
7. [Deployment](#deployment)
8. [Lisainfo](#lisainfo)

---

## 🛠️ Tehnoloogiad

### Backend
- **Node.js** + **Express.js** - Server ja API
- **MariaDB** - Andmebaas (Docker konteineris)
- **JWT** - Autentimine
- **Bcrypt** - Paroolide krüpteerimine
- **Nodemailer** - E-mailide saatmine
- **Winston** - Logide haldamine
- **Axios** - CarQuery API integratsioon

### Frontend
- **React 18** - UI komponentide raamistik
- **Vite** - Build tool
- **React Router** - Navigatsioon
- **i18next** - Mitm ekeelne tugi
- **Formik** + **Yup** - Vormide valideerimine
- **Tailwind CSS** - Stiilid
- **React Calendar** - Kalendrikomponent
- **Axios** - API päringud

### Andmebaas
- **MariaDB** - Relatsioonandmebaas
- **Docker** - Konteinerimine

### Testimine
- **Playwright** - End-to-end testimine

---

## 📁 Projekti struktuur

```
BMA_MOTORS/
│
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── config/            # Konfiguratsioonid
│   │   │   ├── database.js    # Andmebaasi ühendus
│   │   │   ├── email.js       # E-maili seaded
│   │   │   └── logger.js      # Winston logger
│   │   ├── controllers/       # Äriloogika (tulevikus)
│   │   ├── middleware/        # Express middleware
│   │   │   ├── auth.js        # JWT autentimine
│   │   │   ├── errorHandler.js
│   │   │   ├── activityLogger.js
│   │   │   └── rateLimiter.js
│   │   ├── models/            # Andmemudelid
│   │   │   ├── Booking.js
│   │   │   ├── Client.js
│   │   │   ├── Service.js
│   │   │   ├── SparePartInquiry.js
│   │   │   └── SparePartStatus.js
│   │   ├── routes/            # API marsruudid
│   │   │   ├── admin.js
│   │   │   ├── booking.js
│   │   │   ├── cars.js
│   │   │   ├── contact.js
│   │   │   ├── gallery.js
│   │   │   ├── services.js
│   │   │   └── spareParts.js
│   │   ├── utils/
│   │   │   └── importCarData.js  # CarQuery API import
│   │   └── server.js          # Serveri käivitus
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                   # React rakendus
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # API klient
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── SpareParts.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       └── AdminDashboard.jsx
│   │   ├── i18n.js            # Mitmekeelsus
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── database/                   # Andmebaasi skriptid
│   ├── init.sql               # Skeema loomine
│   ├── seed.sql               # Algandmed
│   └── README.md
│
├── tests/                      # Playwright testid
│   ├── playwright/
│   │   └── tests/
│   │       ├── booking.spec.js
│   │       ├── spareparts.spec.js
│   │       ├── admin.spec.js
│   │       └── navigation.spec.js
│   ├── playwright.config.js
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml          # Docker orkestreerimine
└── README.md                   # See fail
```

---

## 🚀 Paigaldamine

### Eeldused

- **Node.js** 18+ ([Laadi alla](https://nodejs.org/))
- **Docker Desktop** ([Laadi alla](https://www.docker.com/products/docker-desktop))
- **Git** ([Laadi alla](https://git-scm.com/))

### 1. Klooni repositoorium

```powershell
cd c:\projektid
git clone <your-repo-url> BMA_MOTORS
cd BMA_MOTORS
```

### 2. Paigalda backend sõltuvused

```powershell
cd backend
npm install
```

### 3. Paigalda frontend sõltuvused

```powershell
cd ..\frontend
npm install
```

### 4. Paigalda testide sõltuvused

```powershell
cd ..\tests
npm install
npx playwright install
```

### 5. Konfigureeri keskkonnamuutujad

#### Backend `.env` fail

```powershell
cd ..\backend
copy .env.example .env
```

Muuda `.env` failis vajalikke väärtusi:

```env
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_USER=bma_admin
DB_PASSWORD=bma_admin_password
DB_NAME=bma_motors

# JWT
JWT_SECRET=your_super_secret_key_here

# Email (valikuline)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🎮 Käivitamine

### Variant 1: Docker Compose (Soovitatud)

Käivita kõik teenused (database, backend, frontend) ühe käsuga:

```powershell
docker-compose up -d
```

Teenused on kättesaadavad:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MariaDB**: localhost:3306

Peata teenused:

```powershell
docker-compose down
```

### Variant 2: Käsitsi käivitamine

#### 1. Käivita MariaDB konteiner

```powershell
docker-compose up -d mariadb
```

#### 2. Käivita Backend

```powershell
cd backend
npm run dev
```

Backend käivitub aadressil: http://localhost:5000

#### 3. Käivita Frontend (uues terminalis)

```powershell
cd frontend
npm run dev
```

Frontend käivitub aadressil: http://localhost:3000

### Admin kasutaja loomine

Admin parooli hash genereerimine:

```powershell
cd backend
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('Admin123!', 10).then(console.log)"
```

Kopeeri genereeritud hash ja asenda `database/seed.sql` failis:

```sql
INSERT INTO users (username, password_hash, email, role, is_active) VALUES
('admin', '$2b$10$<your_generated_hash>', 'admin@bmamotors.ee', 'admin', TRUE);
```

---

## 📚 API Dokumentatsioon

### Avalikud API endpoints

#### Teenused

```http
GET /api/services
GET /api/services/:id
GET /api/services/category/:category
GET /api/services/categories
```

#### Broneeringud

```http
GET /api/booking/available-slots?date=2025-10-10
POST /api/booking
GET /api/booking/:id
```

**POST /api/booking** - Loo broneering

```json
{
  "client_name": "Test Kasutaja",
  "client_email": "test@example.com",
  "client_phone": "+372 5555 5555",
  "booking_date": "2025-10-10",
  "booking_time": "10:00",
  "car_make": "BMW",
  "car_model": "X5",
  "notes": "Mootori diagnostika",
  "language": "est"
}
```

#### Varuosapäringud

```http
POST /api/spareparts/inquiry
GET /api/spareparts/inquiry
GET /api/spareparts/inquiry/:id
```

#### Auto andmed (CarQuery)

```http
GET /api/cars/makes
GET /api/cars/models/:makeId
GET /api/cars/search?make=bmw&year=2020
```

#### Kontakt

```http
POST /api/contact
```

### Admin API endpoints (nõuab JWT token)

```http
POST /api/admin/login
GET /api/admin/dashboard
GET /api/admin/broneeringud
PUT /api/admin/broneeringud/:id
DELETE /api/admin/broneeringud/:id
GET /api/admin/paringud
PUT /api/admin/paringud/:id
POST /api/admin/teenused
PUT /api/admin/teenused/:id
DELETE /api/admin/teenused/:id
GET /api/admin/logs
```

**POST /api/admin/login** - Admin sisselogimine

```json
{
  "username": "admin",
  "password": "Admin123!"
}
```

Vastus:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🧪 Testimine

### Playwright testide käivitamine

```powershell
cd tests
npm test
```

Testid UI režiimis:

```powershell
npm run test:ui
```

Testid brauseri aknaga:

```powershell
npm run test:headed
```

Testi raport:

```powershell
npm run report
```

Rohkem infot: [tests/README.md](tests/README.md)

---

## 🌐 Deployment

### Production build

#### Frontend

```powershell
cd frontend
npm run build
```

Build luuakse `dist/` kausta.

#### Backend

```powershell
cd backend
npm start
```

### Docker Production

```powershell
docker-compose -f docker-compose.yml up -d
```

### Nginx konfigur atsioon (valikuline)

```nginx
server {
    listen 80;
    server_name bmamotors.ee;

    location / {
        root /var/www/bmamotors/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔒 Turvalisus

- ✅ JWT autentimine adminile
- ✅ Bcrypt paroolide krüpteerimine
- ✅ Rate limiting API endpoints
- ✅ SQL injection kaitse (parameterized queries)
- ✅ CORS konfiguratsioon
- ✅ Helmet.js security headers
- ✅ Input valideerimised (Yup schema)

---

## 📊 Logid

Logid luuakse automaatselt:

### Backend logid

```
backend/logs/
├── combined.log      # Kõik logid
├── error.log         # Ainult vead
└── activity.log      # Kasutajate tegevused
```

### MariaDB logid

```
logs/mysql/
└── general.log       # MySQL päringud
```

Logide vaatamine:

```powershell
# Backend logid
Get-Content backend\logs\combined.log -Tail 50 -Wait

# MySQL logid
Get-Content logs\mysql\general.log -Tail 50 -Wait
```

---

## 🛠️ Arendamine

### Backend uue route loomine

```javascript
// backend/src/routes/myroute.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ success: true, data: [] });
});

module.exports = router;
```

Lisa `server.js` faili:

```javascript
const myRoute = require('./routes/myroute');
app.use('/api/myroute', myRoute);
```

### Frontend uue lehe loomine

```jsx
// frontend/src/pages/MyPage.jsx
function MyPage() {
  return (
    <div>
      <h1>My New Page</h1>
    </div>
  );
}

export default MyPage;
```

Lisa `App.jsx` faili:

```jsx
import MyPage from './pages/MyPage';

<Route path="/mypage" element={<MyPage />} />
```

---

## 📞 Tugi ja Kontakt

- **Email**: info@bmamotors.ee
- **Telefon**: +372 XXXX XXXX
- **Aadress**: Tallinn, Estonia

---

## 📝 Litsents

© 2025 BMA Motors. Kõik õigused kaitstud.

---

## ✅ Checklist enne käivitamist

- [ ] Docker Desktop on käivitatud
- [ ] Node.js on paigaldatud
- [ ] Backend `.env` fail on loodud
- [ ] MariaDB konteiner on käivitatud
- [ ] Backend on käivitatud
- [ ] Frontend on käivitatud
- [ ] Admin kasutaja on loodud
- [ ] CarQuery API andmed on imporditud
- [ ] Testid on läbitud

---

## 🎉 Edu projekti arendamisel!

Küsimuste korral vaata dokumentatsiooni või võta ühendust arendajaga.
