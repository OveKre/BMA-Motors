# Käivitusjuhend - BMA Motors

## Kiire käivitus (Docker)

### 1. Käivita Docker Desktop

Veendu, et Docker Desktop on käivitatud.

### 2. Käivita kõik teenused

```powershell
cd c:\projektid\BMA_MOTORS
docker-compose up -d
```

### 3. Ava brauser

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin: http://localhost:3000/admin

### 4. Admin sisselogimine

- Kasutajanimi: `admin`
- Parool: `Admin123!`

---

## Samm-sammult käivitus (ilma Dockerita)

### 1. Andmebaas

```powershell
docker-compose up -d mariadb
```

Oota 10-15 sekundit, kuni andmebaas käivitub.

### 2. Backend (uues terminalis)

```powershell
cd c:\projektid\BMA_MOTORS\backend
npm install
npm run dev
```

Oota sõnumit: `🚀 BMA Motors server running on port 5000`

### 3. Frontend (uues terminalis)

```powershell
cd c:\projektid\BMA_MOTORS\frontend
npm install
npm run dev
```

Ava brauser: http://localhost:3000

### 4. Impordi auto andmed (valikuline)

```powershell
cd c:\projektid\BMA_MOTORS\backend
npm run import-cars
```

---

## Testide käivitamine

```powershell
cd c:\projektid\BMA_MOTORS\tests
npm install
npx playwright install
npm test
```

---

## Probleemide lahendamine

### Port on juba kasutusel

```powershell
# Leia protsess port 3000-l
netstat -ano | findstr :3000

# Sulge protsess (asenda PID numbriga)
taskkill /PID <PID> /F
```

### Andmebaas ei käivitu

```powershell
# Kontrolli Docker konteineri staatust
docker ps -a

# Vaata logisid
docker logs bma_motors_db

# Taaskäivita konteiner
docker restart bma_motors_db
```

### Backend vead

```powershell
# Kontrolli .env faili
cd backend
type .env

# Kui puudub, loo see
copy .env.example .env
```

### Frontend ei käivitu

```powershell
# Kustuta node_modules ja reinstalli
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

---

## Lühike kontroll

- ✅ Docker Desktop käib
- ✅ MariaDB konteiner käib (http://localhost:3306)
- ✅ Backend käib (http://localhost:5000/health)
- ✅ Frontend käib (http://localhost:3000)
- ✅ Saad teha broneeringut
- ✅ Saad sisse logida adminina

---

## Peata teenused

```powershell
# Docker teenused
docker-compose down

# Käsitsi (Ctrl+C terminalis)
```

---

Edu! 🚀
