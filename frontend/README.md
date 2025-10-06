# BMA Motors Frontend

## Ülevaade

React 18 + Vite frontend rakendus BMA Motors veebilehe jaoks.

## Funktsionaalsus

- ✅ Mitmekeelne tugi (EST/ENG/RUS)
- ✅ Kalendripõhine broneeringute süsteem
- ✅ Varuosapäringute vorm
- ✅ Admin paneel
- ✅ Responsive disain (Tailwind CSS)
- ✅ Form valideerimised (Formik + Yup)

## Paigaldamine

```powershell
npm install
```

## Käivitamine

### Arendus

```powershell
npm run dev
```

Avab http://localhost:3000

### Production build

```powershell
npm run build
```

Build luuakse `dist/` kausta.

### Preview

```powershell
npm run preview
```

## Projektstruktuur

```
src/
├── api/            # API klient (axios)
├── components/     # Taaskasutatavad komponendid
├── pages/          # Lehekülgede komponendid
├── i18n.js         # Mitmekeelne konfiguratsioon
├── App.jsx         # Peamine App komponent
└── main.jsx        # Entry point
```

## Mitmekeelne tugi (i18next)

Keelevahe tus toimub automaatselt:

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('eng')}>
        English
      </button>
    </div>
  );
}
```

Tõlked on defineeritud `src/i18n.js` failis.

## Styling

Projekt kasutab **Tailwind CSS** raamistikku.

Utility klassid:
```jsx
<button className="btn-primary">Click me</button>
<input className="input-field" />
<div className="card">Content</div>
```

## API Integration

```jsx
import api from './api/axios';

// GET request
const response = await api.get('/services');

// POST request
const response = await api.post('/booking', data);
```

## Environment Variables

Loo `.env` fail:

```env
VITE_API_URL=http://localhost:5000/api
```

## Deployment

Build production jaoks:

```powershell
npm run build
```

Deploy `dist/` kaust serverisse.
