import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  est: {
    translation: {
      nav: {
        home: 'Avaleht',
        services: 'Teenused',
        booking: 'Broneerimine',
        gallery: 'Galerii',
        spareparts: 'Varuosapäring',
        contact: 'Kontakt'
      },
      home: {
        welcome: 'Tere tulemast BMA Motors',
        subtitle: 'Professionaalne autoremondi töökoda',
        cta: 'Broneeri aeg'
      },
      services: {
        title: 'Meie Teenused',
        repair: 'Remonttööd',
        engine: 'Mootoriremont',
        diagnostics: 'Diagnostika',
        electrical: 'Elektritööd',
        inspection: 'Ostueelne kontroll'
      },
      booking: {
        title: 'Broneeri Aeg',
        selectDate: 'Vali kuupäev',
        selectTime: 'Vali kellaaeg',
        name: 'Nimi',
        email: 'E-mail',
        phone: 'Telefon',
        carMake: 'Auto mark',
        carModel: 'Auto mudel',
        submit: 'Saada broneering',
        success: 'Broneering edukalt saadetud!'
      },
      spareparts: {
        title: 'Varuosapäring',
        name: 'Nimi',
        email: 'E-mail',
        phone: 'Telefon',
        carMake: 'Auto mark',
        carModel: 'Auto mudel',
        year: 'Väljalas ke aasta',
        vin: 'VIN kood',
        partName: 'Varuosa nimetus',
        description: 'Täpsem kirjeldus',
        submit: 'Saada päring',
        success: 'Päring edukalt saadetud!'
      },
      contact: {
        title: 'Võta Ühendust',
        name: 'Nimi',
        email: 'E-mail',
        phone: 'Telefon',
        subject: 'Teema',
        message: 'Sõnum',
        submit: 'Saada sõnum',
        success: 'Sõnum edukalt saadetud!'
      },
      footer: {
        rights: 'Kõik õigused kaitstud'
      }
    }
  },
  eng: {
    translation: {
      nav: {
        home: 'Home',
        services: 'Services',
        booking: 'Booking',
        gallery: 'Gallery',
        spareparts: 'Spare Parts',
        contact: 'Contact'
      },
      home: {
        welcome: 'Welcome to BMA Motors',
        subtitle: 'Professional Car Repair Workshop',
        cta: 'Book Appointment'
      },
      services: {
        title: 'Our Services',
        repair: 'Repair Works',
        engine: 'Engine Repair',
        diagnostics: 'Diagnostics',
        electrical: 'Electrical Works',
        inspection: 'Pre-purchase Inspection'
      },
      booking: {
        title: 'Book Appointment',
        selectDate: 'Select Date',
        selectTime: 'Select Time',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        carMake: 'Car Make',
        carModel: 'Car Model',
        submit: 'Submit Booking',
        success: 'Booking sent successfully!'
      },
      spareparts: {
        title: 'Spare Parts Inquiry',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        carMake: 'Car Make',
        carModel: 'Car Model',
        year: 'Year',
        vin: 'VIN Code',
        partName: 'Part Name',
        description: 'Description',
        submit: 'Submit Inquiry',
        success: 'Inquiry sent successfully!'
      },
      contact: {
        title: 'Contact Us',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
        success: 'Message sent successfully!'
      },
      footer: {
        rights: 'All rights reserved'
      }
    }
  },
  rus: {
    translation: {
      nav: {
        home: 'Главная',
        services: 'Услуги',
        booking: 'Бронирование',
        gallery: 'Галерея',
        spareparts: 'Запчасти',
        contact: 'Контакты'
      },
      home: {
        welcome: 'Добро пожаловать в BMA Motors',
        subtitle: 'Профессиональная авторемонтная мастерская',
        cta: 'Забронировать время'
      },
      services: {
        title: 'Наши Услуги',
        repair: 'Ремонтные работы',
        engine: 'Ремонт двигателя',
        diagnostics: 'Диагностика',
        electrical: 'Электромонтажные работы',
        inspection: 'Предпокупочная проверка'
      },
      booking: {
        title: 'Бронирование',
        selectDate: 'Выберите дату',
        selectTime: 'Выберите время',
        name: 'Имя',
        email: 'Электронная почта',
        phone: 'Телефон',
        carMake: 'Марка автомобиля',
        carModel: 'Модель автомобиля',
        submit: 'Отправить бронирование',
        success: 'Бронирование успешно отправлено!'
      },
      spareparts: {
        title: 'Запрос запчастей',
        name: 'Имя',
        email: 'Электронная почта',
        phone: 'Телефон',
        carMake: 'Марка автомобиля',
        carModel: 'Модель автомобиля',
        year: 'Год выпуска',
        vin: 'VIN код',
        partName: 'Название запчасти',
        description: 'Описание',
        submit: 'Отправить запрос',
        success: 'Запрос успешно отправлен!'
      },
      contact: {
        title: 'Свяжитесь с нами',
        name: 'Имя',
        email: 'Электронная почта',
        phone: 'Телефон',
        subject: 'Тема',
        message: 'Сообщение',
        submit: 'Отправить сообщение',
        success: 'Сообщение успешно отправлено!'
      },
      footer: {
        rights: 'Все права защищены'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'est',
    supportedLngs: ['est', 'eng', 'rus'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
