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
        cta: 'Broneeri aeg',
        heroTitle: 'BMW TEENINDUS',
        heroDescription: 'BMA Motors on spetsialiseerunud BMW remondile, kuid pakub professionaalseid hooldus- ja remonditöid ka teiste automarkidele.',
        bookAppointment: 'Broneeri aeg',
        viewServices: 'Vaata teenuseid',
        aboutTitle: 'BMA MOTORS autoremont',
        aboutP1: 'BMA Motors on alates 2019. aastast tegutsev autoremondiettevõte, mis spetsialiseerub BMW autodele, kuid pakub professionaalset remonti ja hooldust ka teistele automarkidele.',
        aboutP2: 'Meie firma asutaja on spetsialiseerunud BMW-le ja omab BMW remondis ning hoolduses üle 20-aastast kogemust. See pikaajaline praktika tagab teie autole parima võimaliku teeninduse.',
        aboutP3: 'BMA Motors pakub kompleksset lähenemist – alates igapäevasest hooldusest nagu õlivahetus kuni keerukate diagnostika- ja remonttöödeni. Olenemata probleemi keerukusest, meie kogenud meeskond leiab teie autole parima lahenduse.',
        aboutP4: 'Usaldage oma BMW meie kätesse – siin kohtuvad pikaajaline kogemus, spetsialiseerumine ja kiindumus BMW markesse.',
        locationTitle: 'Meie Asukoht',
        address: 'Aadress',
        phone: 'Telefon',
        email: 'Email',
        openingHours: 'Lahtiolekuajad',
        monFri: 'E-R: 9:00 - 18:00',
        saturday: 'L: Suletud',
        sunday: 'P: Suletud',
        sparePartsTitle: 'Vaja varuosi?',
        sparePartsDescription: 'Saada meile päring ja saame pakkuda parima hinna!'
      },
      services: {
        title: 'TEENUSED',
        subtitle: 'BMA autoremondi teenused sõidukitele',
        categories: 'Kategooriad',
        mainTitle: 'Hooldus ja remont',
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
        cta: 'Book Appointment',
        heroTitle: 'BMW SERVICE',
        heroDescription: 'BMA Motors specializes in BMW repairs, but also offers professional maintenance and repair services for other car brands.',
        bookAppointment: 'Book Appointment',
        viewServices: 'View Services',
        aboutTitle: 'BMA MOTORS Car Repair',
        aboutP1: 'BMA Motors is a car repair company operating since 2019, specializing in BMW cars, but also offering professional repairs and maintenance for other car brands.',
        aboutP2: 'Our company founder specializes in BMW and has over 20 years of experience in BMW repairs and maintenance. This long-term practice ensures the best possible service for your car.',
        aboutP3: 'BMA Motors offers a comprehensive approach – from everyday maintenance like oil changes to complex diagnostic and repair work. Regardless of the complexity of the problem, our experienced team will find the best solution for your car.',
        aboutP4: 'Trust your BMW to us – here long-term experience, specialization and passion for the BMW brand meet.',
        locationTitle: 'Our Location',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        openingHours: 'Opening Hours',
        monFri: 'Mon-Fri: 9:00 AM - 6:00 PM',
        saturday: 'Sat: Closed',
        sunday: 'Sun: Closed',
        sparePartsTitle: 'Need Spare Parts?',
        sparePartsDescription: 'Send us an inquiry and we will offer you the best price!'
      },
      services: {
        title: 'SERVICES',
        subtitle: 'BMA car repair services for vehicles',
        categories: 'Categories',
        mainTitle: 'Maintenance and Repair',
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
        cta: 'Забронировать время',
        heroTitle: 'СЕРВИС BMW',
        heroDescription: 'BMA Motors специализируется на ремонте BMW, но также предлагает профессиональное обслуживание и ремонт других марок автомобилей.',
        bookAppointment: 'Забронировать время',
        viewServices: 'Посмотреть услуги',
        aboutTitle: 'BMA MOTORS — ремонт автомобилей',
        aboutP1: 'BMA Motors — это компания по ремонту автомобилей, работающая с 2019 года и специализирующаяся на автомобилях BMW, но также предлагающая профессиональный ремонт и обслуживание других марок.',
        aboutP2: 'Основатель нашей компании специализируется на BMW и имеет более 20 лет опыта в ремонте и обслуживании BMW. Этот многолетний опыт гарантирует лучший сервис для вашего автомобиля.',
        aboutP3: 'BMA Motors предлагает комплексный подход — от повседневного обслуживания, такого как замена масла, до сложных диагностических и ремонтных работ. Независимо от сложности проблемы, наша опытная команда найдет лучшее решение для вашего автомобиля.',
        aboutP4: 'Доверьте свой BMW нам — здесь встречаются многолетний опыт, специализация и любовь к марке BMW.',
        locationTitle: 'Наше Местоположение',
        address: 'Адрес',
        phone: 'Телефон',
        email: 'Электронная почта',
        openingHours: 'Часы работы',
        monFri: 'Пн-Пт: 9:00 - 18:00',
        saturday: 'Сб: Закрыто',
        sunday: 'Вс: Закрыто',
        sparePartsTitle: 'Нужны запчасти?',
        sparePartsDescription: 'Отправьте нам запрос, и мы предложим лучшую цену!'
      },
      services: {
        title: 'УСЛУГИ',
        subtitle: 'Услуги автосервиса BMA для транспортных средств',
        categories: 'Категории',
        mainTitle: 'Обслуживание и ремонт',
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
