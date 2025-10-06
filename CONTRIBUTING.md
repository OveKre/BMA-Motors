# Contributing to BMA Motors

## Kuidas panustada

Täname huvi eest BMA Motors projekti panustamiseks! Järgi neid juhiseid:

### 1. Fork repositoorium

Loo fork GitHubis ja klooni see oma arvutisse:

```powershell
git clone https://github.com/your-username/BMA_MOTORS.git
cd BMA_MOTORS
```

### 2. Loo uus branch

```powershell
git checkout -b feature/my-new-feature
```

Branch nimetamise konventsioon:
- `feature/` - uued funktsioonid
- `bugfix/` - veaparandused
- `hotfix/` - kiireloomulised parandused
- `docs/` - dokumentatsiooni muudatused

### 3. Tee muudatused

- Järgi olemasolevat koodi stiili
- Kommenteeri keerulised osad
- Lisa testid uutele funktsioonidele
- Uuenda dokumentatsiooni

### 4. Testi muudatusi

```powershell
# Backend testid
cd backend
npm test

# Frontend testid
cd frontend
npm test

# E2E testid
cd tests
npm test
```

### 5. Commit muudatused

Kasuta kirjeldavaid commit sõnumeid:

```powershell
git add .
git commit -m "feat: add booking cancellation feature"
```

Commit prefiksite konventsioonid:
- `feat:` - uus funktsioon
- `fix:` - veaparandus
- `docs:` - dokumentatsioon
- `style:` - koodi stiili muudatused
- `refactor:` - koodi refaktoreerimine
- `test:` - testide lisamine/muutmine
- `chore:` - build/konfiguratsioon

### 6. Push branch

```powershell
git push origin feature/my-new-feature
```

### 7. Loo Pull Request

- Mine GitHubi ja loo Pull Request
- Kirjelda muudatusi detailselt
- Lisa screenshotid (kui UI muudatused)
- Viita seotud issue'dele

## Koodi stiil

### JavaScript/Node.js

- Kasuta ES6+ süntaksit
- Kasuta async/await (mitte callbacks)
- 2 tühikut taandeks
- Semicolonid on kohustuslikud
- Kasuta const/let (mitte var)

```javascript
// Hea
const getUserById = async (id) => {
  const user = await query('SELECT * FROM users WHERE id = ?', [id]);
  return user[0];
};

// Halb
function getUserById(id, callback) {
  query('SELECT * FROM users WHERE id = ' + id, function(err, user) {
    callback(err, user);
  });
}
```

### React

- Kasuta functional components
- Kasuta hooks
- Prop-types või TypeScript (tulevikus)

```jsx
// Hea
function MyComponent({ title, onSubmit }) {
  const [value, setValue] = useState('');
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

// Halb
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  // ...
}
```

### SQL

- Kasuta UPPER CASE SQL võtmed
- Kasuta parameterized queries
- Lisa indeksid otsingutele

```sql
-- Hea
SELECT u.*, b.booking_date 
FROM users u
LEFT JOIN bookings b ON u.id = b.user_id
WHERE u.is_active = true
ORDER BY b.booking_date DESC;

-- Halb
select * from users where id = 1;
```

## Testimine

Kõik uued funktsioonid peavad sisaldama teste:

```javascript
// tests/playwright/tests/my-feature.spec.js
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should work correctly', async ({ page }) => {
    await page.goto('/my-feature');
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

## Dokumentatsioon

- Uuenda README.md kui vajalik
- Lisa JSDoc kommentaare funktsioonidele
- Dokumenteeri API muudatused

```javascript
/**
 * Hangi kasutaja ID järgi
 * @param {number} id - Kasutaja ID
 * @returns {Promise<Object>} Kasutaja objekt
 */
const getUserById = async (id) => {
  // ...
};
```

## Küsimused?

Kui sul on küsimusi, loo issue GitHubis või võta ühendust:
- Email: info@bmamotors.ee

Täname panustamise eest! 🙏
