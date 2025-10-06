# BMA Motors - Testide Dokumentatsioon

## Ülevaade

BMA Motors projekti testid on loodud **Playwright** raamistikuga, mis võimaldab automatiseeritud testimist erinevates brauserites (Chrome, Firefox, Safari).

## Testimise struktuur

```
tests/
├── package.json              # Testide sõltuvused
├── playwright.config.js      # Playwright seadistused
├── playwright/
│   └── tests/               # Test failid
│       ├── booking.spec.js      # Broneeringute testid
│       ├── spareparts.spec.js   # Varuosapäringute testid
│       ├── admin.spec.js        # Admin paneeli testid
│       └── navigation.spec.js   # Navigatsiooni testid
└── README.md                # See fail
```

## Paigaldamine

### 1. Installi sõltuvused

```powershell
cd tests
npm install
```

### 2. Installi brauserid

```powershell
npx playwright install
```

## Testide käivitamine

### Kõik testid

```powershell
npm test
```

### Testid brauseri aknaga (headed mode)

```powershell
npm run test:headed
```

### Testid debug režiimis

```powershell
npm run test:debug
```

### Testid UI režiimis (interactive)

```powershell
npm run test:ui
```

### Konkreetne test grupp

```powershell
# Ainult broneeringute testid
npm run test:booking

# Ainult varuosapäringute testid
npm run test:spareparts

# Ainult admin testid
npm run test:admin
```

## Test Coverage

### 1. Broneeringute testid (`booking.spec.js`)

- ✅ Broneeringu lehe laadimine
- ✅ Kalendri kuvamine
- ✅ Kuupäeva valimine
- ✅ Vabade aegade laadimine
- ✅ Vormi täitmine ja saatmine
- ✅ Valideerimise kontroll
- ✅ Keelevahetuse test

### 2. Varuosapäringute testid (`spareparts.spec.js`)

- ✅ Päringu vormi laadimine
- ✅ Auto margide laadimine
- ✅ Mudelite laadimine margi järgi
- ✅ Vormi täitmine ja saatmine
- ✅ E-maili valideerimise kontroll
- ✅ VIN koodi pikkuse kontroll

### 3. Admin paneeli testid (`admin.spec.js`)

- ✅ Sisselogimise lehe kuvamine
- ✅ Tühjade andmete valideerimine
- ✅ Sisselogimise katse
- 🔒 Dashboard testid (nõuavad autentimist)

### 4. Navigatsiooni testid (`navigation.spec.js`)

- ✅ Kõigi lehtede avamine
- ✅ Menüü kuvamine
- ✅ Mobiili menüü funktsioon
- ✅ Keelevahetuse funktsioon
- ✅ Keele säilitamine navigeerimisel

## Testide tulemused

Testide käivitamise järel luuakse HTML raport:

```powershell
npm run report
```

See avab detailse raporti brauseris, kus näed:
- ✅ Läbitud testid
- ❌ Ebaõnnestunud testid
- 📸 Screenshotid vigadest
- 🎥 Videod ebaõnnestunud testidest

## CI/CD integratsioon

Testid on konfiguree ritud töötama GitHub Actions või muus CI/CD keskkonnas:

```yaml
# .github/workflows/tests.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd tests
          npm install
          npx playwright install --with-deps
      - name: Run tests
        run: |
          cd tests
          npm test
```

## Parimad praktikad

1. **Käivita testid regulaarselt** - enne iga commiti
2. **Uuenda teste** - kui funktsionaalsus muutub
3. **Lisa uued testid** - uute funktsioonide jaoks
4. **Kontrolli raporteid** - analüüsi ebaõnnestunud teste

## Testide laiendamine

### Uue testi lisamine

```javascript
// tests/playwright/tests/mytest.spec.js
import { test, expect } from '@playwright/test';

test.describe('My Test Suite', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

### API testimine

```javascript
test('should create booking via API', async ({ request }) => {
  const response = await request.post('/api/booking', {
    data: {
      client_name: 'Test',
      client_email: 'test@example.com',
      // ...
    }
  });
  
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.success).toBe(true);
});
```

## Probleemide lahendamine

### Testid ebaõnnestuvad

1. Kontrolli, kas frontend ja backend on käivitatud
2. Kontrolli, kas port 3000 on vaba
3. Kontrolli, kas andmebaas on käivitatud

### Brauserid ei installi

```powershell
# Käivita administraatori õigustega
npx playwright install --with-deps
```

### Testid aeguvad (timeout)

Suurenda timeout väärtust `playwright.config.js` failis:

```javascript
use: {
  timeout: 60000, // 60 sekundit
}
```

## Lisainfo

- [Playwright dokumentatsioon](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
