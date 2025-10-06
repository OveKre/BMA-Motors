const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Verify email configuration
const verifyEmailConfig = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email server is ready');
        return true;
    } catch (error) {
        console.error('❌ Email configuration error:', error.message);
        return false;
    }
};

// Send email helper
const sendEmail = async (options) => {
    try {
        const mailOptions = {
            from: `BMA Motors <${process.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};

// Email templates
const emailTemplates = {
    bookingConfirmation: (booking, lang = 'est') => {
        const templates = {
            est: {
                subject: 'Broneeringu kinnitus - BMA Motors',
                html: `
                    <h2>Tere, ${booking.client_name}!</h2>
                    <p>Teie broneering on edukalt registreeritud.</p>
                    <h3>Broneeringu detailid:</h3>
                    <ul>
                        <li><strong>Kuupäev:</strong> ${booking.booking_date}</li>
                        <li><strong>Kellaaeg:</strong> ${booking.booking_time}</li>
                        <li><strong>Teenus:</strong> ${booking.service_name || 'Üldine'}</li>
                    </ul>
                    <p>Kui soovite broneeringut muuta või tühistada, palun võtke meiega ühendust.</p>
                    <p>Lugupidamisega,<br>BMA Motors</p>
                `
            },
            eng: {
                subject: 'Booking Confirmation - BMA Motors',
                html: `
                    <h2>Hello, ${booking.client_name}!</h2>
                    <p>Your booking has been successfully registered.</p>
                    <h3>Booking Details:</h3>
                    <ul>
                        <li><strong>Date:</strong> ${booking.booking_date}</li>
                        <li><strong>Time:</strong> ${booking.booking_time}</li>
                        <li><strong>Service:</strong> ${booking.service_name || 'General'}</li>
                    </ul>
                    <p>To modify or cancel your booking, please contact us.</p>
                    <p>Best regards,<br>BMA Motors</p>
                `
            },
            rus: {
                subject: 'Подтверждение бронирования - BMA Motors',
                html: `
                    <h2>Здравствуйте, ${booking.client_name}!</h2>
                    <p>Ваше бронирование успешно зарегистрировано.</p>
                    <h3>Детали бронирования:</h3>
                    <ul>
                        <li><strong>Дата:</strong> ${booking.booking_date}</li>
                        <li><strong>Время:</strong> ${booking.booking_time}</li>
                        <li><strong>Услуга:</strong> ${booking.service_name || 'Общая'}</li>
                    </ul>
                    <p>Для изменения или отмены бронирования свяжитесь с нами.</p>
                    <p>С уважением,<br>BMA Motors</p>
                `
            }
        };
        return templates[lang] || templates.est;
    },

    inquiryConfirmation: (inquiry, lang = 'est') => {
        const templates = {
            est: {
                subject: 'Varuosapäringu kinnitus - BMA Motors',
                html: `
                    <h2>Tere, ${inquiry.client_name}!</h2>
                    <p>Oleme Teie varuosapäringu kätte saanud.</p>
                    <h3>Päringu detailid:</h3>
                    <ul>
                        <li><strong>Auto:</strong> ${inquiry.car_make} ${inquiry.car_model} (${inquiry.car_year || 'N/A'})</li>
                        <li><strong>Varuosa:</strong> ${inquiry.sparepart_name}</li>
                        <li><strong>Kirjeldus:</strong> ${inquiry.sparepart_description || 'N/A'}</li>
                    </ul>
                    <p>Võtame Teiega ühendust esimesel võimalusel.</p>
                    <p>Lugupidamisega,<br>BMA Motors</p>
                `
            },
            eng: {
                subject: 'Spare Part Inquiry Confirmation - BMA Motors',
                html: `
                    <h2>Hello, ${inquiry.client_name}!</h2>
                    <p>We have received your spare part inquiry.</p>
                    <h3>Inquiry Details:</h3>
                    <ul>
                        <li><strong>Vehicle:</strong> ${inquiry.car_make} ${inquiry.car_model} (${inquiry.car_year || 'N/A'})</li>
                        <li><strong>Part:</strong> ${inquiry.sparepart_name}</li>
                        <li><strong>Description:</strong> ${inquiry.sparepart_description || 'N/A'}</li>
                    </ul>
                    <p>We will contact you as soon as possible.</p>
                    <p>Best regards,<br>BMA Motors</p>
                `
            },
            rus: {
                subject: 'Подтверждение запроса запчасти - BMA Motors',
                html: `
                    <h2>Здравствуйте, ${inquiry.client_name}!</h2>
                    <p>Мы получили ваш запрос на запчасть.</p>
                    <h3>Детали запроса:</h3>
                    <ul>
                        <li><strong>Автомобиль:</strong> ${inquiry.car_make} ${inquiry.car_model} (${inquiry.car_year || 'Н/Д'})</li>
                        <li><strong>Запчасть:</strong> ${inquiry.sparepart_name}</li>
                        <li><strong>Описание:</strong> ${inquiry.sparepart_description || 'Н/Д'}</li>
                    </ul>
                    <p>Мы свяжемся с вами в ближайшее время.</p>
                    <p>С уважением,<br>BMA Motors</p>
                `
            }
        };
        return templates[lang] || templates.est;
    }
};

module.exports = {
    transporter,
    verifyEmailConfig,
    sendEmail,
    emailTemplates
};
