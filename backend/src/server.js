const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { testConnection } = require('./config/database');
const logger = require('./config/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { activityLogger } = require('./middleware/activityLogger');
const { generalLimiter } = require('./middleware/rateLimiter');

// Import routes
const servicesRoutes = require('./routes/services');
const bookingRoutes = require('./routes/booking');
const sparepartsRoutes = require('./routes/spareParts');
const contactRoutes = require('./routes/contact');
const galleryRoutes = require('./routes/gallery');
const carsRoutes = require('./routes/cars');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
}

// Activity logger
app.use(activityLogger);

// Rate limiting
app.use('/api/', generalLimiter);

// Static files
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/spareparts', sparepartsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'BMA Motors API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            services: '/api/services',
            booking: '/api/booking',
            spareparts: '/api/spareparts',
            contact: '/api/contact',
            gallery: '/api/gallery',
            cars: '/api/cars',
            admin: '/api/admin'
        }
    });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();
        if (!dbConnected) {
            logger.error('Failed to connect to database');
            process.exit(1);
        }

        app.listen(PORT, () => {
            logger.info(`🚀 BMA Motors server running on port ${PORT}`);
            logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            logger.info(`🔗 API URL: http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

startServer();

module.exports = app;
