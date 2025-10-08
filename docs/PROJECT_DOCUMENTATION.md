# BMA MOTORS - Auto Repair Shop Management System
## Project Design and Analysis Documentation

---

## 1. Introduction

### 1.1 Project Purpose and Scope

BMA MOTORS is a comprehensive web-based management system designed for an automotive repair shop specializing in BMW vehicles. The system provides end-to-end management of customer interactions, service bookings, spare parts inquiries, and administrative operations.

**Primary Goals:**
- Streamline customer service booking process
- Manage spare parts inquiries and responses
- Handle customer communications efficiently
- Provide administrative oversight and reporting
- Support multilingual operations (Estonian, English, Russian)

**Scope:**
- Online service booking with real-time availability
- Spare parts inquiry system with admin response capabilities
- Contact message management
- Service catalog management
- Admin dashboard with comprehensive reporting
- Responsive web interface for desktop and mobile devices

### 1.2 Background and Current Situation

BMA MOTORS is an established automotive repair shop with 10+ years of experience. The business previously relied on phone calls and manual booking systems, leading to:

- Inefficient booking management
- Delayed response to spare parts inquiries
- Poor tracking of customer communications
- Limited reporting capabilities
- Language barrier challenges with international clients

The new system addresses these challenges by digitizing all customer-facing and internal processes.

### 1.3 Stakeholders and Target Audience

**Primary Stakeholders:**
- **Business Owner**: Overall system oversight, business analytics
- **Shop Managers**: Day-to-day operations, booking management
- **Mechanics**: Service execution, technical consultations
- **Administrative Staff**: Customer communication, inquiry handling

**Target Users:**
- **Customers**: BMW vehicle owners seeking repair services, spare parts, or consultations
- **Administrators**: Shop staff managing bookings, inquiries, and communications
- **Potential Clients**: Visitors researching services and company information

**Geographic Focus:** Estonian market with Russian and English-speaking clientele

---

## 2. Terms and Terminology

### 2.1 Glossary

| Term | Definition |
|------|------------|
| **Booking** | A scheduled service appointment made by a customer |
| **Spare Parts Inquiry** | Customer request for specific vehicle parts with details |
| **Service** | A type of automotive repair or maintenance work offered |
| **Admin Dashboard** | Administrative interface for managing system data |
| **Time Slot** | A specific time period (30-minute intervals) available for booking |
| **JWT** | JSON Web Token - authentication mechanism |
| **CRUD** | Create, Read, Update, Delete operations |
| **API** | Application Programming Interface |
| **ER Diagram** | Entity-Relationship Diagram |
| **SPA** | Single Page Application |
| **SMTP** | Simple Mail Transfer Protocol |
| **CORS** | Cross-Origin Resource Sharing |
| **Docker** | Containerization platform |
| **MariaDB** | Open-source relational database (MySQL fork) |

### 2.2 Abbreviations

- **BMW**: Bayerische Motoren Werke (target vehicle brand)
- **UI/UX**: User Interface / User Experience
- **REST**: Representational State Transfer
- **HTTP**: HyperText Transfer Protocol
- **SSL/TLS**: Secure Sockets Layer / Transport Layer Security
- **GDPR**: General Data Protection Regulation
- **i18n**: Internationalization
- **ACC**: Adaptive Cruise Control
- **ADAS**: Advanced Driver Assistance Systems

---

## 3. Business Needs and Context

### 3.1 Problem Description

**Current Pain Points:**
1. **Manual Booking Process**: Phone-based bookings lead to scheduling conflicts and missed opportunities outside business hours
2. **Inefficient Parts Inquiry**: Email-based spare parts requests lack structure and tracking
3. **Communication Gaps**: No centralized system for customer messages and follow-ups
4. **Limited Visibility**: No real-time view of bookings, workload, or inquiry status
5. **Language Barriers**: International clients struggle with Estonian-only communication
6. **No Analytics**: Difficulty tracking business metrics and customer trends

### 3.2 Business Processes and Workflows

#### Service Booking Workflow
```
Customer Visit → Browse Services → Select Service → Choose Date/Time 
→ Provide Details → Submit Booking → Receive Confirmation (Email)
→ Admin Reviews → Approve/Modify → Customer Notification
→ Service Execution → Completion → Follow-up
```

#### Spare Parts Inquiry Workflow
```
Customer Request → Fill Inquiry Form → Submit with Vehicle Details
→ Admin Reviews → Check Availability/Price → Send Response (Email)
→ Customer Decision → Order Processing → Delivery/Pickup
```

#### Contact Message Workflow
```
Customer Message → Submit via Contact Form → Admin Dashboard Alert
→ Admin Reads Message → Mark as Read/Replied → Customer Follow-up
→ Closure/Archive
```

#### Admin Service Management Workflow
```
Admin Login → Navigate to Services Tab → Create/Edit Service
→ Add Multilingual Details → Set Category/Price/Duration
→ Activate/Deactivate → Save → Update Live Website
```

### 3.3 User and Customer Needs

**Customer Needs:**
- 24/7 online booking without phone calls
- Real-time availability visibility
- Multilingual interface (EST/ENG/RUS)
- Quick spare parts price quotes
- Easy contact and inquiry submission
- Service transparency and pricing information

**Administrative Needs:**
- Centralized booking management
- Inquiry tracking with response history
- Service catalog management
- Customer communication hub
- Business analytics and reporting
- Efficient workflow automation

### 3.4 Competition and Alternative Solutions

**Competitors:**
- **Generic Booking Systems**: Calendly, Acuity Scheduling
  - *Limitation*: Not specialized for automotive industry
- **Automotive Shop Management**: Mitchell 1, Shop-Ware
  - *Limitation*: Expensive, overly complex for small shops
- **Custom Solutions**: Proprietary systems by larger dealerships
  - *Limitation*: High development cost, vendor lock-in

**BMA MOTORS System Advantages:**
- Tailored for automotive repair shops
- Integrated spare parts inquiry system
- BMW specialization features
- Affordable and maintainable
- Multilingual support for Estonian market
- Open-source technology stack

---

## 4. Functional Requirements

### 4.1 Use Cases and User Scenarios

## User Story UC-01: View Car Repair Company Homepage

As a user  
I want to view the car repair company homepage  
So that I can understand what the company does and learn basic information about them

---

### Description

When a user visits the car repair company website for the first time, they should immediately see:
- What type of business it is (car repair workshop)
- Key company information and statistics
- Available services
- How to contact or book an appointment

---

### Acceptance Criteria

#### AC1: Company Identity Display
- Given user visits the car repair company homepage
- When the page loads
- Then user sees the company logo at the top
- And user sees the main headline "Professionaalne autoremondi töökoda" (Professional car repair workshop)
- And user understands this is a car repair service

#### AC2: Company Statistics Display
- Given user is on the homepage
- When user views the page
- Then user sees company credibility statistics displayed clearly

#### AC3: Service Overview Access
- Given user wants to learn about services
- When user views the homepage
- Then user sees a "Vaata teenuseid" (View services) button
- And navigation menu contains "Teenused" (Services) link
- And user can access service information easily

#### AC4: Call-to-Action Visibility
- Given user wants to take action
- When user views the homepage
- Then user sees "Broneeri aeg" (Book appointment) button prominently displayed
- And "Kontakt" (Contact) link is available in navigation

#### AC5: Multi-language Support
- Given user may speak different languages
- When user views the homepage
- Then language options (EST, ENG, РУС) are visible
- And user can switch between languages

#### AC6: Complete Navigation
- Given user wants to explore the website
- When user views the homepage
- Then navigation menu shows all main sections:
  - Avaleht (Home)
  - Teenused (Services)
  - Broneerimime (Booking)
  - Galerii (Gallery)
  - Värvisotsraring (Color matching)
  - Kontakt (Contact)

---

### Story Points: 5 SP

#### Time Estimation Breakdown:
- Backend development (API endpoints for content, statistics): 2h
- Frontend development (layout, sections, styling): 3h
- Content integration (text, images, statistics): 1h
- Responsive design implementation: 1h
- Language switching setup: 1h
- Testing (frontend, backend, responsiveness): 1.5h
- Deployment to staging: 0.5h
- Total: ~10h ≈ 5 Story Points

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Styling: CSS/Tailwind CSS
- i18n: react-i18next for language switching
- Images: Optimized formats (WebP)
- Performance: Lazy loading for images below the fold
- API Endpoints: 
  - GET /api/homepage-content (company info, statistics)
  - GET /api/translations (language data)

---

### Dependencies

- Company logo and branding assets
- Professional car images
- Translated content (EST, ENG, РУС)
- Company statistics data
- Backend API setup

---

### Definition of Done

- All acceptance criteria met
- Backend API endpoints created and tested
- Homepage displays company identity clearly
- All statistics and information are accurate
- Navigation works on all devices
- Language switching functional
- Responsive design tested (mobile, tablet, desktop)
- Backend and frontend code reviewed and merged
- Unit and integration tests passing
- Deployed to staging environment
- Product Owner approval received

---

### Priority: High
### Sprint: Sprint 1
### Epic: Website Foundation

## User Story UC-02: View Services Page

As a user  
I want to view all available services offered by the car repair company  
So that I can understand what services are available and choose what I need

---

### Description

When a user navigates to the Services page, they should see:
- Complete list of all services categorized by type
- Service descriptions in selected language
- Pricing information for each service
- Service duration estimates
- Clear call-to-action to book a service

---

### Acceptance Criteria

#### AC1: Services List Display
- Given user navigates to the Services page
- When the page loads
- Then user sees all active services displayed
- And services are organized by categories (Engine Repair, Diagnostics, Electrical Work, Brake System, etc.)

#### AC2: Service Details
- Given user is viewing the services list
- When user views a service
- Then user sees service name in selected language
- And user sees detailed description
- And user sees price in EUR
- And user sees estimated duration

#### AC3: Service Categories
- Given user wants to browse specific service types
- When user views the page
- Then services are grouped by categories
- And each category is clearly labeled
- And categories are visually separated

#### AC4: Multilingual Content
- Given user has selected a language (EST/ENG/РУС)
- When user views the Services page
- Then all service names and descriptions are displayed in selected language
- And pricing currency format matches locale

#### AC5: Booking Integration
- Given user wants to book a service
- When user views a service
- Then user sees "Broneeri" (Book) button for each service
- And clicking the button redirects to booking page with service pre-selected

---

### Story Points: 5 SP

#### Time Estimation Breakdown:
- Backend development (API endpoints for services): 2h
- Frontend development (services page layout, cards): 3h
- Category filtering and organization: 1h
- Responsive design implementation: 1h
- Multilingual content integration: 1h
- Testing (frontend, backend, responsiveness): 1.5h
- Deployment to staging: 0.5h
- Total: ~10h ≈ 5 Story Points

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Styling: CSS/Tailwind CSS
- i18n: react-i18next for translations
- API Endpoints:
  - GET /api/services (fetch all active services)
  - GET /api/services/category/:category (filter by category)
- Data Format: JSON with multilingual fields (name_est, name_eng, name_rus, description_est, etc.)

---

### Dependencies

- Services database populated with initial data
- Service images/icons
- Translated content for all services (EST, ENG, РУС)
- Backend API for services retrieval
- Booking page (UC-03) for integration

---

### Definition of Done

- All acceptance criteria met
- Backend API returns services correctly
- Services page displays all services with correct information
- Category organization functional
- Language switching works for all service content
- Responsive design tested (mobile, tablet, desktop)
- Book button redirects correctly to booking page
- Code reviewed and merged
- Unit and integration tests passing
- Deployed to staging environment
- Product Owner approval received

---

### Priority: High
### Sprint: Sprint 1
### Epic: Website Foundation

---

## User Story UC-03: Book a Service Appointment

As a customer  
I want to book a service appointment online  
So that I can schedule my car repair without calling the shop

---

### Description

When a customer wants to book a service, they should:
- Select an available date from a calendar
- Choose from available time slots
- Provide personal and vehicle information
- Select the type of service needed
- Receive confirmation via email

---

### Acceptance Criteria

#### AC1: Calendar Display
- Given customer is on the booking page
- When the page loads
- Then customer sees a calendar with current month
- And dates are color-coded (green=available, yellow=partially booked, red=fully booked)
- And customer can navigate between months

#### AC2: Date Selection
- Given customer views the calendar
- When customer clicks on an available date
- Then the date is selected and highlighted
- And available time slots for that date are displayed below
- And fully booked dates are not clickable

#### AC3: Time Slot Selection
- Given customer has selected a date
- When available time slots are displayed
- Then customer sees time slots in 30-minute intervals (e.g., 09:00, 09:30, 10:00)
- And customer can select one time slot
- And already booked slots are disabled

#### AC4: Booking Form Completion
- Given customer has selected date and time
- When customer scrolls to booking form
- Then customer fills in required fields:
  - Full name
  - Email address
  - Phone number
  - Car make and model
  - Service type (dropdown)
  - Additional description (optional)
- And all fields have validation

#### AC5: Form Validation
- Given customer submits the booking form
- When form is submitted
- Then system validates all required fields are filled
- And email format is correct
- And phone number format is correct
- And error messages are displayed for invalid fields

#### AC6: Booking Confirmation
- Given customer submits valid booking form
- When booking is successfully created
- Then customer sees success message
- And customer receives confirmation email
- And booking is saved with "pending" status
- And admin receives notification

---

### Story Points: 8 SP

#### Time Estimation Breakdown:
- Backend development (booking API, availability logic): 4h
- Frontend development (calendar component, form): 5h
- Date/time slot availability calculation: 2h
- Form validation (client and server): 2h
- Email notification integration: 2h
- Responsive design implementation: 1.5h
- Testing (frontend, backend, E2E): 3h
- Deployment to staging: 0.5h
- Total: ~20h ≈ 8 Story Points

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Calendar Library: react-calendar
- Form Management: Formik + Yup validation
- Email Service: Nodemailer with Gmail SMTP
- API Endpoints:
  - GET /api/booking/available-slots?date=YYYY-MM-DD
  - GET /api/booking/month-availability?year=YYYY&month=MM
  - POST /api/booking (create booking)
- Database: MariaDB bookings table

---

### Dependencies

- Services list (UC-02) for service dropdown
- Email SMTP configuration
- Calendar component library
- Backend booking availability logic
- Database schema for bookings table

---

### Definition of Done

- All acceptance criteria met
- Calendar displays availability correctly
- Time slots are accurately calculated based on existing bookings
- Form validation works on client and server side
- Booking is saved to database with correct data
- Confirmation email sent to customer
- Admin notification sent
- Responsive design tested (mobile, tablet, desktop)
- Code reviewed and merged
- Unit and E2E tests passing (booking flow)
- Deployed to staging environment
- Product Owner approval received

---

### Priority: Critical
### Sprint: Sprint 1
### Epic: Customer Features

---

## User Story UC-04: Submit Spare Parts Inquiry

As a customer  
I want to submit a spare parts inquiry  
So that I can get a price quote for specific car parts I need

---

### Description

When a customer needs spare parts, they should:
- Fill out an inquiry form with vehicle details
- Describe the parts they need
- Upload images of parts (optional)
- Submit inquiry for admin review
- Receive response via email

---

### Acceptance Criteria

#### AC1: Inquiry Form Display
- Given customer navigates to Spare Parts page
- When the page loads
- Then customer sees inquiry form
- And form contains all necessary fields

#### AC2: Vehicle Information Input
- Given customer is filling the form
- When customer enters vehicle information
- Then customer can select car make from dropdown
- And customer can select car model from dropdown (filtered by make)
- And customer can enter vehicle year

#### AC3: Parts Description
- Given customer needs to describe parts
- When customer fills the form
- Then customer can enter part name/description in text field
- And customer can provide additional details in text area
- And character count is displayed

#### AC4: Image Upload
- Given customer wants to show the part visually
- When customer clicks upload button
- Then customer can upload up to 3 images
- And supported formats are JPG, PNG, WebP
- And maximum file size is 5MB per image
- And image preview is displayed after upload

#### AC5: Contact Information
- Given customer needs to be contacted
- When customer fills the form
- Then customer provides name, email, phone number
- And all fields are validated
- And email format is validated

#### AC6: Inquiry Submission
- Given customer completes the form
- When customer clicks submit
- Then inquiry is saved to database
- And customer sees success message
- And customer receives confirmation email
- And admin receives inquiry notification

---

### Story Points: 5 SP

#### Time Estimation Breakdown:
- Backend development (inquiry API, image upload): 3h
- Frontend development (form, image upload UI): 3h
- Car make/model dropdown integration: 1.5h
- Image upload and storage logic: 2h
- Form validation: 1.5h
- Email notification: 1h
- Testing (frontend, backend): 2h
- Deployment to staging: 0.5h
- Total: ~14.5h ≈ 5 Story Points

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- File Upload: Multer middleware
- Image Storage: Local filesystem or cloud storage (future)
- Form Validation: Formik + Yup
- Email Service: Nodemailer
- API Endpoints:
  - GET /api/car-makes (fetch car makes)
  - GET /api/car-models?make_id=X (fetch models by make)
  - POST /api/spareparts (submit inquiry with images)
- Database: MariaDB sparepart_inquiries table

---

### Dependencies

- Car makes/models database populated
- Image upload middleware configured
- File storage solution
- Email SMTP configuration
- Admin dashboard (UC-11) for reviewing inquiries

---

### Definition of Done

- All acceptance criteria met
- Form displays and validates correctly
- Car make/model dropdowns work with correct data
- Image upload works (multiple files, size validation)
- Inquiry saved to database with all data
- Images stored securely
- Confirmation email sent to customer
- Admin notification sent
- Responsive design tested (mobile, tablet, desktop)
- Code reviewed and merged
- Unit and integration tests passing
- Deployed to staging environment
- Product Owner approval received

---

### Priority: High
### Sprint: Sprint 2
### Epic: Customer Features

---

## User Story UC-05: View Gallery

As a user  
I want to view a gallery of completed work  
So that I can see the quality of services provided

---

### Description

When a user visits the Gallery page, they should:
- See a collection of images showcasing completed repair work
- View images in organized layout
- Click on images to view in full size
- Navigate through images easily

---

### Acceptance Criteria

#### AC1: Gallery Page Display
- Given user navigates to Gallery page
- When the page loads
- Then user sees a grid of images
- And images are displayed in responsive grid layout (3-4 columns on desktop, 2 on tablet, 1 on mobile)

#### AC2: Image Quality
- Given user views gallery images
- When images load
- Then images are optimized for web (WebP format)
- And images maintain aspect ratio
- And lazy loading is implemented for performance

#### AC3: Image Lightbox
- Given user wants to view image in detail
- When user clicks on an image
- Then image opens in full-screen lightbox/modal
- And user can navigate to next/previous images with arrows
- And user can close lightbox with X button or ESC key

#### AC4: Image Information
- Given user views an image in lightbox
- When lightbox is open
- Then user sees image caption/description (if available)
- And user sees service type tag (if available)

#### AC5: Loading State
- Given gallery is loading images
- When page is loading
- Then user sees loading skeleton/spinner
- And images load progressively

---

### Story Points: 3 SP

#### Time Estimation Breakdown:
- Backend development (gallery API): 1.5h
- Frontend development (gallery grid, lightbox): 3h
- Image optimization and lazy loading: 1.5h
- Lightbox navigation implementation: 1.5h
- Responsive design: 1h
- Testing: 1.5h
- Deployment to staging: 0.5h
- Total: ~10.5h ≈ 3 Story Points

---

### Technical Notes

- Frontend Framework: React/Next.js
- Lightbox Library: react-image-lightbox or custom implementation
- Styling: CSS/Tailwind CSS
- Image Optimization: WebP format, Next.js Image component
- Lazy Loading: Intersection Observer API
- API Endpoints:
  - GET /api/gallery (fetch all gallery images)
- Database: MariaDB gallery table (optional) or static image files

---

### Dependencies

- Gallery images provided by client
- Image optimization tools
- Lightbox component library
- Backend API for gallery (if dynamic) or static file hosting

---

### Definition of Done

- All acceptance criteria met
- Gallery displays images in responsive grid
- Images are optimized and load quickly
- Lightbox opens and closes correctly
- Navigation between images works
- Lazy loading implemented
- Responsive design tested (mobile, tablet, desktop)
- Code reviewed and merged
- Performance tested (Lighthouse score > 90)
- Deployed to staging environment
- Product Owner approval received

---

### Priority: Medium
### Sprint: Sprint 2
### Epic: Website Foundation

---

## User Story UC-06: Send Contact Message

As a user  
I want to send a message to the car repair company  
So that I can ask questions or request information

---

### Description

When a user wants to contact the company, they should:
- Fill out a contact form with their information
- Write their message or question
- Submit the form
- Receive confirmation that message was sent
- Admin receives the message for follow-up

---

### Acceptance Criteria

#### AC1: Contact Form Display
- Given user navigates to Contact page
- When the page loads
- Then user sees contact form with required fields
- And user sees company contact information (address, phone, email)

#### AC2: Form Fields
- Given user is filling contact form
- When user enters information
- Then user fills in required fields:
  - Full name
  - Email address
  - Phone number
  - Subject
  - Message (text area)
- And all fields have proper labels and placeholders

#### AC3: Form Validation
- Given user submits the contact form
- When form is submitted
- Then system validates all required fields are filled
- And email format is validated
- And phone format is validated
- And message length is at least 10 characters
- And error messages displayed for invalid fields

#### AC4: Message Submission
- Given user submits valid form
- When form is successfully submitted
- Then message is saved to database
- And user sees success notification
- And user receives confirmation email
- And admin receives notification email with message details

#### AC5: Form Reset
- Given user successfully submitted message
- When success notification is displayed
- Then form fields are cleared
- And user can submit another message if needed

---

### Story Points: 3 SP

#### Time Estimation Breakdown:
- Backend development (contact message API): 2h
- Frontend development (contact form): 2h
- Form validation (client and server): 1.5h
- Email notification setup: 1.5h
- Responsive design: 1h
- Testing: 1.5h
- Deployment to staging: 0.5h
- Total: ~10h ≈ 3 Story Points

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Form Management: Formik + Yup validation
- Email Service: Nodemailer
- Styling: CSS/Tailwind CSS
- API Endpoints:
  - POST /api/contact (submit contact message)
- Database: MariaDB contact_messages table

---

### Dependencies

- Email SMTP configuration
- Contact form validation library
- Backend API for message storage
- Admin dashboard (UC-12) for viewing messages

---

### Definition of Done

- All acceptance criteria met
- Contact form displays correctly
- Form validation works on client and server
- Message saved to database
- Confirmation email sent to user
- Admin notification email sent
- Form resets after successful submission
- Responsive design tested (mobile, tablet, desktop)
- Code reviewed and merged
- Unit and integration tests passing
- Deployed to staging environment
- Product Owner approval received

---

### Priority: Medium
### Sprint: Sprint 2
### Epic: Customer Features

---

## User Story UC-07: Switch Language

As a user  
I want to switch the website language  
So that I can view content in my preferred language (Estonian, English, or Russian)

---

### Description

Users should be able to:
- See language options in the navigation bar
- Switch between EST, ENG, and РУС
- Have all website content update to selected language
- Have language preference persist during session

---

### Acceptance Criteria

#### AC1: Language Switcher Display
- Given user is on any page
- When user views the navigation bar
- Then user sees language options (EST, ENG, РУС)
- And current language is highlighted/active

#### AC2: Language Selection
- Given user wants to change language
- When user clicks on a language option
- Then the entire website content updates to selected language
- And navigation menu updates
- And all page content updates
- And buttons and labels update

#### AC3: Content Translation
- Given user has selected a language
- When viewing any page
- Then all static content displays in selected language
- And all dynamic content (services, bookings, etc.) displays in selected language
- And date/time formats match locale

#### AC4: Language Persistence
- Given user has selected a language
- When user navigates to different pages
- Then selected language persists across all pages
- And language preference is stored in browser (localStorage or cookie)

#### AC5: Default Language
- Given new user visits website
- When user has not selected a language
- Then website defaults to Estonian (EST)
- And user can change language at any time

---

### Story Points: 3 SP

#### Time Estimation Breakdown:
- Backend development (translation API if needed): 1h
- Frontend i18n setup and configuration: 2h
- Translation files creation (EST, ENG, РУС): 3h
- Language switcher component: 1.5h
- localStorage/cookie integration: 1h
- Testing all pages in 3 languages: 2h
- Deployment to staging: 0.5h
- Total: ~11h ≈ 3 Story Points

---

### Technical Notes

- Frontend Framework: React/Next.js
- i18n Library: react-i18next
- Translation Files: JSON format (en.json, et.json, ru.json)
- Storage: localStorage or cookies for language preference
- Locale Formatting: date-fns or Intl API for date/time
- Fallback: Default to Estonian if translation missing

---

### Dependencies

- All website content translated to 3 languages
- Translation files organized by namespace (common, home, services, booking, etc.)
- Native speakers for translation review
- i18n library installed and configured

---

### Definition of Done

- All acceptance criteria met
- Language switcher functional in navigation
- All pages support 3 languages
- Translation files complete for all content
- Language preference persists in browser
- No missing translations (fallback to Estonian)
- Date/time formatting matches locale
- Responsive design maintained in all languages
- Code reviewed and merged
- Tested on all pages in 3 languages
- Deployed to staging environment
- Product Owner approval received

---

### Priority: High
### Sprint: Sprint 1
### Epic: Website Foundation

## User Story UC-08: Admin Login

As an admin  
I want to log in to the admin panel by navigating to /admin  
So that I can access administrative features securely

---

### Description

Admin accesses the admin panel by:
- Navigating to http://bmamotors.ee/admin in browser
- Entering username and password in login form
- Being authenticated and redirected to admin dashboard
- Seeing admin UI overlay on top of main website
- Being logged out automatically when navigating to public pages

---

### Acceptance Criteria

#### AC1: Admin Panel Access via URL
- Given admin wants to access admin features
- When admin navigates to /admin URL directly
- Then login form is displayed as modal/overlay
- And main website navigation is visible in background

#### AC2: Login Form Display
- Given admin is on /admin URL
- When login modal appears
- Then admin sees username field
- And admin sees password field
- And admin sees "Login" button
- And password field has show/hide toggle icon

#### AC3: Credential Validation
- Given admin enters credentials
- When admin submits login form
- Then system validates username is not empty
- And system validates password is not empty
- And error messages displayed for empty fields

#### AC4: Successful Authentication
- Given admin submits valid credentials
- When credentials are correct
- Then JWT token is generated and stored (HTTP-only cookie)
- And admin is redirected to /admin/dashboard
- And admin dashboard UI is displayed
- And navigation shows admin sections (Broneeringud, Varuosapäringud, Sõnumid, Teenused)
- And session persists for 7 days

#### AC5: Failed Login
- Given admin submits invalid credentials
- When credentials are incorrect
- Then error message "Vale kasutajanimi või parool" (Invalid username or password) is displayed
- And admin remains on login page
- And rate limiting applied (5 attempts per 15 minutes)

#### AC6: Already Authenticated
- Given admin is already logged in
- When admin navigates to /admin URL
- Then admin is redirected to /admin/dashboard automatically

#### AC7: Public Navigation Logout
- Given admin is logged in and on admin dashboard
- When admin clicks on public navigation links (Avaleht, Teenused, Broneerimime, etc.)
- Then admin is logged out automatically
- And admin session is cleared
- And admin is redirected to public page
- And admin cannot access admin features anymore

---

### Story Points: 5 SP

#### Time Estimation Breakdown:
- Backend development (authentication API, JWT): 3h
- Frontend development (login modal/form): 2.5h
- JWT token generation and storage: 1.5h
- Rate limiting implementation: 1h
- Password hashing (bcrypt): 1h
- Auto-logout on public navigation: 2h
- Session management: 1h
- Testing (authentication flow, auto-logout): 2.5h
- Deployment to staging: 0.5h
- Total: ~15h ≈ 5 Story Points

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Authentication: JWT (JSON Web Token)
- Password Hashing: bcryptjs (10 salt rounds)
- Token Storage: HTTP-only cookies
- Token Expiration: 7 days
- Rate Limiting: express-rate-limit (5 attempts/15 min)
- Navigation Interceptor: React Router onNavigate hook to detect public page navigation
- API Endpoints:
  - POST /api/auth/login (authenticate user)
  - POST /api/auth/logout (clear session)
  - GET /api/auth/verify (verify token validity)
- Middleware: authMiddleware for protected routes

---

### Dependencies

- Users table in database with hashed passwords
- JWT secret in environment variables
- Rate limiting middleware
- Protected route middleware
- Navigation guard for auto-logout
- Admin dashboard (UC-09)

---

### Definition of Done

- All acceptance criteria met
- Admin can access login via /admin URL
- Login form displays and validates correctly
- Authentication works with correct credentials
- JWT token generated and stored securely
- Invalid credentials show error message
- Rate limiting prevents brute force attacks
- Admin redirected to dashboard after login
- Admin automatically logged out when clicking public navigation
- Session cleared on logout
- Code reviewed and merged
- Security tested (no plain text passwords, secure token storage)
- Unit and integration tests passing
- Auto-logout functionality tested
- Deployed to staging environment
- Product Owner approval received

---

### Priority: Critical
### Sprint: Sprint 1
### Epic: Admin Features

---

## User Story UC-09: View Admin Dashboard

As an admin  
I want to view the admin dashboard after logging in  
So that I can see an overview of bookings, inquiries, and messages

---

### Description

When admin successfully logs in, they see:
- Admin Dashboard with statistics cards showing key metrics
- Today's Bookings count (Broneeringud Täna)
- New Inquiries count (Uued päringud)
- Total Bookings count (Ootel broneeringud)
- Unread Messages count (Sõnumid)
- Tabs to navigate between sections: Broneeringud, Varuosapäringud, Sõnumid, Teenused
- Logout button (Logi välja) in top right
- Main website navigation still visible at top

---

### Acceptance Criteria

#### AC1: Dashboard Access After Login
- Given admin has successfully logged in
- When authentication completes
- Then admin is redirected to /admin/dashboard
- And dashboard page loads with admin UI

#### AC2: Statistics Cards Display
- Given admin is on dashboard
- When page loads
- Then admin sees 4 statistics cards:
  - "Broneeringud (Täna)" - Today's Bookings count
  - "Uued päringud" - New spare parts inquiries count
  - "Ootel broneeringud" - Pending bookings count
  - "Sõnumid" - Unread messages count
- And each card displays current count with large number
- And cards use distinct colors (blue, light blue, orange, etc.)

#### AC3: Navigation Tabs Display
- Given admin wants to navigate to specific section
- When admin views dashboard
- Then admin sees horizontal tabs:
  - Broneeringud (3) - with count
  - Varuosapäringud (4) - with count
  - Sõnumid (1) - with count
  - Teenused (21) - with count
- And active tab is highlighted with blue underline
- And clicking each tab navigates to respective section

#### AC4: Logout Button
- Given admin wants to log out
- When admin clicks "Logi välja" (Logout) button in top right
- Then admin session is cleared
- And admin is redirected to homepage
- And admin cannot access admin features anymore

#### AC5: Main Navigation Visibility
- Given admin is on dashboard
- When dashboard loads
- Then main website navigation is visible at top (Avaleht, Teenused, Broneerimime, Galerii, etc.)
- And language switcher (EST, ENG, РУС) is visible
- And BMA logo is visible

#### AC6: Protected Access
- Given user is not authenticated
- When user tries to access /admin/dashboard
- Then user is redirected to /admin login page

---

### Story Points: 5 SP

#### Time Estimation Breakdown:
- Backend development (dashboard statistics API): 3h
- Frontend development (dashboard layout, cards, tabs): 4h
- Statistics calculation and database queries: 2h
- Navigation tabs with counts: 1.5h
- Logout functionality: 1h
- Main navigation integration: 1h
- Testing (dashboard, protected routes, logout): 2h
- Deployment to staging: 0.5h
- Total: ~15h ≈ 5 SP

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Styling: CSS/Tailwind CSS to match screenshot design
- State Management: React hooks (useState, useEffect)
- Authentication: JWT verification middleware
- API Endpoints:
  - GET /api/admin/dashboard (fetch all statistics)
- Database Queries: 
  - COUNT bookings WHERE booking_date = TODAY()
  - COUNT bookings WHERE status = 'pending'
  - COUNT sparepart_inquiries WHERE status = 'new'
  - COUNT contact_messages WHERE is_read = false
  - COUNT services total

---

### Dependencies

- Admin authentication (UC-08)
- Database with bookings, inquiries, messages, services data
- Protected route middleware
- Navigation tabs component
- Statistics calculation logic
- Logout functionality

---

### Definition of Done

- All acceptance criteria met
- Dashboard displays all 4 statistics cards correctly
- Statistics show accurate real-time counts
- Navigation tabs functional with correct counts
- Active tab highlighted correctly
- Logout button clears session and redirects
- Main navigation visible and functional
- Protected route redirects unauthenticated users
- Responsive design tested
- Code reviewed and merged
- Unit and integration tests passing
- Deployed to staging environment
- Product Owner approval received

---

### Priority: Critical
### Sprint: Sprint 1
### Epic: Admin Features

---

## User Story UC-10: Manage Bookings

As an admin  
I want to view and manage customer bookings from admin dashboard  
So that I can confirm, update, or delete appointments

---

### Description

When admin clicks "Broneeringud" tab in dashboard, they see:
- Table with all bookings showing ID, Client name, Contact, Date/Time, Car, Status, Actions
- "Uuenda" (Add new) button to manually create booking
- Status dropdown to change booking status (Ootel = Pending, etc.)
- "Kustuta" (Delete) button for each booking
- Ability to filter and search bookings

---

### Acceptance Criteria

#### AC1: Bookings Tab Navigation
- Given admin is on admin dashboard
- When admin clicks "Broneeringud" tab
- Then bookings table is displayed
- And tab shows count in parentheses (e.g., "Broneeringud (3)")
- And table shows columns: ID, Klient (Client), Kontakt (Contact), Kuupäev (Date), Aeg (Time), Auto (Car), Staatus (Status), Toimingud (Actions)

#### AC2: Bookings Table Display
- Given admin is viewing bookings table
- When table loads
- Then all bookings are displayed with:
  - ID (e.g., #2, #1, #3)
  - Client name (e.g., "sanja")
  - Contact (email: SANJA@gmail.com, phone: 55666310)
  - Date (e.g., 2025-10-05T21:00:00.000Z)
  - Time (e.g., 09:00:00, 17:00:00)
  - Car model (e.g., "bmw x5")
  - Status dropdown (yellow "Ootel" tag)
  - Red "Kustuta" (Delete) button

#### AC3: Add New Booking Button
- Given admin wants to manually add booking
- When admin clicks blue "Uuenda" (Add new) button
- Then booking creation form/modal opens
- And admin can fill in booking details manually

#### AC4: View Booking Details
- Given admin wants to see full booking information
- When admin clicks on a booking row
- Then modal/detail panel opens
- And displays all booking information:
  - Customer name, email, phone
  - Car make and model
  - Service type
  - Date and time
  - Description
  - Status
  - Created at timestamp

#### AC5: Update Booking Status
- Given admin wants to change booking status
- When admin clicks status dropdown (yellow "Ootel" tag)
- Then dropdown shows status options (Ootel, Kinnitatud, Lõpetatud, Tühistatud)
- And admin selects new status
- Then booking status updates in database
- And status tag color changes
- And customer receives status update email (optional)

#### AC6: Delete Booking
- Given admin wants to remove a booking
- When admin clicks red "Kustuta" (Delete) button
- Then confirmation dialog appears "Kas oled kindel, et soovid broneeringu kustutada?" (Are you sure you want to delete this booking?)
- And if admin confirms, booking is deleted from database
- And booking disappears from table
- And success notification displayed

---

### Story Points: 8 SP

#### Time Estimation Breakdown:
- Backend development (bookings CRUD API): 4h
- Frontend development (table matching screenshot design): 5h
- Status dropdown component with color tags: 2h
- Add booking modal/form: 2h
- Delete confirmation dialog: 1h
- Email notifications for status updates: 1.5h
- Testing (CRUD operations): 3h
- Deployment to staging: 0.5h
- Total: ~19h ≈ 8 SP

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Table Component: Custom styled to match screenshot
- Styling: CSS/Tailwind CSS
- Status Tags: Yellow for "Ootel", Green for "Kinnitatud", etc.
- Email Service: Nodemailer for status updates (optional)
- API Endpoints:
  - GET /api/admin/broneeringud (fetch all bookings)
  - GET /api/admin/broneeringud/:id (fetch single booking)
  - POST /api/admin/broneeringud (create booking manually)
  - PUT /api/admin/broneeringud/:id (update booking status)
  - DELETE /api/admin/broneeringud/:id (delete booking)
- Database: MariaDB bookings table

---

### Dependencies

- Admin authentication (UC-08)
- Admin dashboard with tabs (UC-09)
- Email SMTP for notifications
- Bookings database table
- Protected API routes

---

### Definition of Done

- All acceptance criteria met
- Bookings table matches screenshot design
- Table displays all bookings with correct columns
- "Uuenda" button opens booking creation form
- Status dropdown works and updates database
- Status tag colors change based on status
- Delete button works with confirmation dialog
- Customer email sent on status update (if implemented)
- Responsive design tested
- Code reviewed and merged
- Unit and integration tests passing
- E2E test for booking management flow
- Deployed to staging environment
- Product Owner approval received

---

### Priority: Critical
### Sprint: Sprint 2
### Epic: Admin Features

---

## User Story UC-11: Respond to Spare Parts Inquiries

As an admin  
I want to respond to spare parts inquiries from admin dashboard  
So that I can provide price quotes and availability to customers

---

### Description

When admin clicks "Varuosapäringud" tab, they see:
- Table with all spare parts inquiries
- Inquiry details including customer info, car details, part description
- Form to respond with price quote and availability
- Ability to update inquiry status
- Send response via email to customer

---

### Acceptance Criteria

#### AC1: Inquiries Tab Navigation
- Given admin is on admin dashboard
- When admin clicks "Varuosapäringud" tab
- Then inquiries table is displayed
- And tab shows count (e.g., "Varuosapäringud (4)")
- And table shows: ID, Customer Name, Car Model, Part Description, Status, Date, Actions

#### AC2: Inquiries Table Display
- Given admin is viewing inquiries table
- When table loads
- Then all inquiries are displayed with:
  - ID number
  - Customer name
  - Contact info (email, phone)
  - Car make and model
  - Part description
  - Status (Uus, Vastatud, Suletud)
  - Submission date
  - View/Respond button

#### AC3: View Inquiry Details
- Given admin wants to see full inquiry
- When admin clicks "Vaata" (View) button or inquiry row
- Then modal/detail panel opens
- And displays complete information:
  - Customer name, email, phone
  - Car make, model, year
  - Part description
  - Uploaded images (if any)
  - Submission date
  - Current status

#### AC4: View Uploaded Images
- Given inquiry has uploaded images
- When admin views inquiry details
- Then admin sees image thumbnails
- And clicking thumbnail opens full-size image in lightbox
- And admin can navigate between multiple images

#### AC5: Respond to Inquiry
- Given admin wants to provide price quote
- When admin clicks "Vasta" (Respond) button
- Then response form appears with fields:
  - Hind (Price) in EUR
  - Saadavus (Availability): dropdown (Laos, Tellida, Ei ole saadaval)
  - Tarneaeg (Delivery Time): text input (e.g., "2-3 päeva")
  - Lisainfo (Additional Info): text area
- And admin fills form and clicks "Saada vastus" (Send response)

#### AC6: Send Response Email
- Given admin submits response
- When response form is submitted
- Then response data is saved to database
- And email is sent to customer with:
  - Price quote
  - Availability status
  - Delivery time estimate
  - Additional information
  - Contact details for follow-up
- And inquiry status automatically updated to "Vastatud" (Responded)
- And success notification "Vastus saadetud" displayed

#### AC7: Update Inquiry Status
- Given admin wants to manually update status
- When admin changes status dropdown (Uus, Vastatud, Suletud)
- Then status updates in database immediately
- And status badge color changes

---

### Story Points: 5 SP

#### Time Estimation Breakdown:
- Backend development (inquiries API, response): 3h
- Frontend development (table, detail view, response form): 4h
- Image viewing lightbox: 1.5h
- Email response template and sending: 2h
- Status update logic: 1h
- Testing (inquiry management, email): 2.5h
- Deployment to staging: 0.5h
- Total: ~14.5h ≈ 5 SP

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Image Viewer: react-image-lightbox or custom modal
- Styling: CSS/Tailwind CSS matching admin panel design
- Email Service: Nodemailer for response emails
- File Storage: Local filesystem or cloud storage
- API Endpoints:
  - GET /api/admin/paringud (fetch all inquiries)
  - GET /api/admin/paringud/:id (fetch single inquiry)
  - POST /api/admin/paringud/:id/vastus (submit response)
  - PUT /api/admin/paringud/:id (update status)
- Database: MariaDB sparepart_inquiries, sparepart_responses tables

---

### Dependencies

- Admin authentication (UC-08)
- Admin dashboard with tabs (UC-09)
- Email SMTP configuration
- Spare parts inquiry submission (UC-04)
- Image storage system
- Protected API routes

---

### Definition of Done

- All acceptance criteria met
- Inquiries table displays all inquiries correctly
- Inquiry details show complete information
- Uploaded images display and open in lightbox
- Response form validates all fields
- Response email sent successfully to customer
- Email template is professional and in Estonian
- Status updates save correctly
- Responsive design tested
- Code reviewed and merged
- Unit and integration tests passing
- Email sending tested
- Deployed to staging environment
- Product Owner approval received

---

### Priority: High
### Sprint: Sprint 2
### Epic: Admin Features

---

## User Story UC-12: Manage Contact Messages

As an admin  
I want to view and manage contact messages from admin dashboard  
So that I can respond to customer inquiries and track communications

---

### Description

When admin clicks "Sõnumid" tab, they see:
- Table with all contact messages
- Message details
- Mark messages as read/unread
- Reply to messages via email
- Delete messages

---

### Acceptance Criteria

#### AC1: Messages Tab Navigation
- Given admin is on admin dashboard
- When admin clicks "Sõnumid" tab
- Then messages table is displayed
- And tab shows count (e.g., "Sõnumid (1)")
- And table shows: ID, Nimi (Name), E-post (Email), Teema (Subject), Kuupäev (Date), Staatus (Status), Toimingud (Actions)

#### AC2: Messages Table Display
- Given admin is viewing messages table
- When table loads
- Then all contact messages are displayed with:
  - Message ID
  - Customer name
  - Email address
  - Subject line
  - Submission date
  - Status badge (Lugemata/Loetud - Unread/Read, Vastatud - Replied)
  - Actions (View, Reply, Delete)
- And unread messages are visually highlighted (bold or colored badge)

#### AC3: View Message Details
- Given admin wants to read a message
- When admin clicks "Vaata" (View) button or message row
- Then modal/detail panel opens
- And displays full message:
  - Customer name, email, phone
  - Subject
  - Full message text
  - Submission date and time
  - Read status
  - Reply status

#### AC4: Mark as Read Automatically
- Given admin opens a message
- When message detail modal appears
- Then message is automatically marked as "Loetud" (Read)
- And unread count in "Sõnumid" tab decreases by 1
- And status badge changes from "Lugemata" to "Loetud"

#### AC5: Reply to Message
- Given admin wants to respond to customer
- When admin clicks "Vasta" (Reply) button in message details
- Then email compose form/modal appears with:
  - To: customer email (pre-filled, read-only)
  - Subject: "Re: [original subject]" (pre-filled)
  - Message: rich text area for response
- And admin writes response and clicks "Saada" (Send)
- Then email is sent to customer
- And message marked as "Vastatud" (Replied)
- And success notification "E-kiri saadetud" displayed

#### AC6: Delete Message
- Given admin wants to remove a message
- When admin clicks "Kustuta" (Delete) button
- Then confirmation dialog appears "Kas oled kindel, et soovid sõnumi kustutada?"
- And if admin confirms, message is deleted from database
- And message removed from table
- And success notification displayed

---

### Story Points: 5 SP

#### Time Estimation Breakdown:
- Backend development (messages API, reply): 3h
- Frontend development (table, reply form): 4h
- Auto mark as read logic: 1h
- Email reply functionality: 2h
- Delete confirmation: 1h
- Status badges styling: 1h
- Testing (message management, email): 2h
- Deployment to staging: 0.5h
- Total: ~14.5h ≈ 5 SP

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Styling: CSS/Tailwind CSS
- Status Badges: Different colors for Lugemata/Loetud/Vastatud
- Email Service: Nodemailer for replies
- API Endpoints:
  - GET /api/admin/sonumid (fetch all messages)
  - GET /api/admin/sonumid/:id (fetch single message)
  - PUT /api/admin/sonumid/:id (update read/replied status)
  - POST /api/admin/sonumid/:id/reply (send reply email)
  - DELETE /api/admin/sonumid/:id (delete message)
- Database: MariaDB contact_messages table

---

### Dependencies

- Admin authentication (UC-08)
- Admin dashboard with tabs (UC-09)
- Email SMTP configuration
- Contact message submission (UC-06)
- Protected API routes

---

### Definition of Done

- All acceptance criteria met
- Messages table displays all messages correctly
- Unread messages visually highlighted
- Message details display complete information
- Mark as read automatically updates status
- Reply form sends email successfully
- Delete functionality works with confirmation
- Status badges display correct colors
- Responsive design tested
- Code reviewed and merged
- Unit and integration tests passing
- Email reply tested
- Deployed to staging environment
- Product Owner approval received

---

### Priority: Medium
### Sprint: Sprint 2
### Epic: Admin Features

---

## User Story UC-13: Manage Services (CRUD)

As an admin  
I want to create, view, update, and delete services from admin dashboard  
So that I can maintain the service catalog offered to customers

---

### Description

When admin clicks "Teenused" tab, they see:
- Table with all services (active and inactive)
- Button to add new service
- Edit existing services with multilingual content
- Activate/deactivate services
- Delete services
- Services organized by category

---

### Acceptance Criteria

#### AC1: Services Tab Navigation
- Given admin is on admin dashboard
- When admin clicks "Teenused" tab
- Then services table is displayed
- And tab shows total count (e.g., "Teenused (21)")
- And table shows: ID, Nimi (Name EST), Kategooria (Category), Hind (Price), Kestus (Duration), Staatus (Status), Toimingud (Actions)

#### AC2: Services Table Display
- Given admin is viewing services table
- When table loads
- Then all services are displayed with:
  - Service ID
  - Service name in Estonian
  - Category (Mootorite remont, Diagnostika, etc.)
  - Price in EUR
  - Duration in minutes
  - Status (Aktiivne/Mitteaktiivne - Active/Inactive)
  - Actions (Edit, Delete buttons)
- And services can be filtered by category

#### AC3: Add New Service
- Given admin wants to create new service
- When admin clicks "Lisa teenus" (Add service) button
- Then service creation modal opens with tabs for 3 languages
- And form contains fields:
  - Tab 1 - EESTI (Estonian):
    - Nimi (Name)
    - Kirjeldus (Description)
  - Tab 2 - INGLISE (English):
    - Name
    - Description
  - Tab 3 - VENE (Russian):
    - Название (Name)
    - Описание (Description)
  - Common fields:
    - Kategooria (Category) dropdown
    - Hind (Price) in EUR
    - Kestus (Duration) in minutes
    - Aktiivne (Active) checkbox
- And admin fills all required fields
- And clicks "Salvesta" (Save)
- Then service is created in database
- And new service appears in table

#### AC4: Multilingual Content Validation
- Given admin is creating/editing service
- When admin submits form
- Then system validates:
  - All 3 language name fields are filled
  - All 3 language description fields are filled
  - Price is positive number
  - Duration is positive integer
  - Category is selected
- And error messages displayed for invalid/empty fields

#### AC5: Edit Existing Service
- Given admin wants to update a service
- When admin clicks "Muuda" (Edit) button on service row
- Then edit modal opens with pre-filled data
- And all fields can be modified
- And admin clicks "Uuenda" (Update)
- Then service is updated in database
- And changes reflect in table immediately

#### AC6: Activate/Deactivate Service
- Given admin wants to change service availability
- When admin toggles "Aktiivne" (Active) checkbox in edit form
- And saves changes
- Then service active status updates in database
- And inactive services hidden from public Services page (UC-02)
- And active services visible on public Services page

#### AC7: Delete Service
- Given admin wants to remove a service
- When admin clicks "Kustuta" (Delete) button
- Then confirmation dialog appears "Kas oled kindel? See kustutab teenuse jäädavalt."
- And if admin confirms, service is deleted from database
- And warning shown if service has existing bookings
- And success notification displayed

---

### Story Points: 8 SP

#### Time Estimation Breakdown:
- Backend development (services CRUD API): 4h
- Frontend development (table, modal, tabs): 6h
- Multilingual form with 3 language tabs: 3h
- Form validation (client and server): 2h
- Category filtering: 1.5h
- Delete confirmation with booking check: 1.5h
- Testing (CRUD operations): 3h
- Deployment to staging: 0.5h
- Total: ~21.5h ≈ 8 SP

---

### Technical Notes

- Frontend Framework: React/Next.js
- Backend Framework: Node.js/Express
- Form Management: Formik + Yup validation or custom
- Styling: CSS/Tailwind CSS matching admin panel
- Tab Component: For 3 languages (EST, ENG, RUS)
- API Endpoints:
  - GET /api/admin/teenused (fetch all services)
  - GET /api/admin/teenused/:id (fetch single service)
  - POST /api/admin/teenused (create service)
  - PUT /api/admin/teenused/:id (update service)
  - DELETE /api/admin/teenused/:id (delete service)
- Database: MariaDB services table with multilingual columns
- Validation: All 3 language fields required, positive price/duration

---

### Dependencies

- Admin authentication (UC-08)
- Admin dashboard with tabs (UC-09)
- Services database table with multilingual fields (name_est, name_eng, name_rus, description_est, etc.)
- Category enumeration/lookup
- Protected API routes
- Public Services page (UC-02) displays only active services

---

### Definition of Done

- All acceptance criteria met
- Services table displays all services correctly
- "Lisa teenus" button opens creation modal
- Form has 3 language tabs working correctly
- All 3 languages can be entered and saved
- Create service validates and saves correctly
- Edit service updates existing service correctly
- Active/inactive toggle works
- Inactive services hidden from public Services page
- Delete functionality works with confirmation
- Warning shown if deleting service with bookings
- Category filter works
- Responsive design tested
- Code reviewed and merged
- Unit and integration tests passing
- E2E test for service CRUD flow
- Deployed to staging environment
- Product Owner approval received

---

### Priority: High
### Sprint: Sprint 2
### Epic: Admin Features

---

---

### 4.2 System Functionality Description

**Public Features:**
- **Homepage**: Hero section, statistics, service overview
- **Services Page**: Categorized service listings with descriptions
- **Booking System**: Interactive calendar with availability indicators
- **Spare Parts Inquiry**: Form with car database integration
- **Gallery**: Portfolio of completed work
- **Contact Page**: Contact form and business information
- **Language Switcher**: EST/ENG/RUS interface switching

**Admin Features:**
- **Dashboard**: Overview statistics (bookings, inquiries, messages)
- **Bookings Management**: View, update status, delete bookings
- **Inquiries Management**: Respond to spare parts requests
- **Messages Management**: Read and reply to contact messages
- **Services Management**: CRUD operations on service catalog
- **Authentication**: JWT-based secure login

### 4.3 User Roles and Permissions

| Role | Permissions |
|------|------------|
| **Public User** | - View services<br>- Submit bookings<br>- Submit inquiries<br>- Send contact messages<br>- View gallery |
| **Admin** | - All public permissions<br>- Access admin dashboard<br>- Manage bookings (view, update, delete)<br>- Manage inquiries (view, respond, update)<br>- Manage messages (read, reply, delete)<br>- Manage services (create, edit, delete)<br>- View analytics |
| **Manager** | - Same as Admin<br>- Respond to inquiries<br>- Manage bookings |

**Authentication:**
- Admins authenticate via username/password
- JWT tokens with 7-day expiration
- Password hashing with bcrypt
- Protected API routes with middleware

---

## 5. Non-Functional Requirements

### 5.1 Performance and Scalability

**Performance Requirements:**
- Page load time: < 2 seconds on 4G connection
- API response time: < 500ms for standard queries
- Database query optimization with indexing
- Image optimization (WebP format, CDN delivery)
- Lazy loading for gallery images

**Scalability:**
- Support 1000+ concurrent users
- Database capable of handling 10,000+ bookings
- Horizontal scaling via Docker containers
- Stateless API design for load balancing
- Database connection pooling (max 10 connections)

### 5.2 Availability and Reliability

**Availability:**
- Target uptime: 99.5% (excluding planned maintenance)
- Graceful degradation if external services fail
- Database backup daily at 3:00 AM
- Error logging and monitoring

**Reliability:**
- Transaction integrity for bookings
- Email delivery retry mechanism (3 attempts)
- Form validation on client and server side
- CORS configuration for secure cross-origin requests

### 5.3 Security

**Authentication & Authorization:**
- JWT-based authentication with HTTP-only cookies
- bcrypt password hashing (salt rounds: 10)
- Role-based access control (RBAC)
- Protected admin routes with middleware

**Data Security:**
- SQL injection prevention (parameterized queries)
- XSS protection (input sanitization)
- CORS whitelist for allowed origins
- Rate limiting on API endpoints (100 requests/15 min)
- Secure headers (helmet.js)

**Privacy:**
- GDPR compliance for customer data
- No password storage in plain text
- Secure environment variables
- Customer data retention policy

### 5.4 Usability

**User Experience:**
- Responsive design (mobile-first approach)
- Intuitive navigation with clear call-to-actions
- Form validation with helpful error messages
- Loading indicators for async operations
- Success/error toast notifications
- Accessibility features (ARIA labels, keyboard navigation)

**Internationalization:**
- Language switcher in navbar
- i18next library for translations
- Locale-specific date/time formatting
- Fallback to Estonian if translation missing

### 5.5 Compatibility and Integrations

**Browser Compatibility:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Integrations:**
- **Email Service**: Nodemailer with Gmail SMTP
- **Image CDN**: Unsplash API for hero images
- **Car Database**: NHTSA API for vehicle makes/models
- **Future**: Payment gateway integration (Stripe/PayPal)

**Standards Compliance:**
- REST API design principles
- HTTP status codes (200, 201, 400, 401, 404, 500)
- JSON data format
- Semantic HTML5
- WCAG 2.1 accessibility guidelines (Level AA target)

---

## 6. Data Model

### 6.1 Core Data Entities

**Primary Entities:**
1. **Users**: Admin accounts
2. **Bookings**: Customer service appointments
3. **Services**: Service catalog items
4. **Spare Part Inquiries**: Customer part requests
5. **Contact Messages**: Customer communications
6. **Car Makes/Models**: Vehicle database

### 6.2 Entity-Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ BOOKINGS : manages
    SERVICES ||--o{ BOOKINGS : has
    CAR_MAKES ||--o{ CAR_MODELS : contains
    CAR_MODELS ||--o{ SPAREPART_INQUIRIES : references
    SPAREPART_INQUIRIES ||--o{ SPAREPART_RESPONSES : has
    
    USERS {
        int id PK
        string username UK
        string password_hash
        string email UK
        string full_name
        enum role
        timestamp created_at
        timestamp updated_at
    }
    
    BOOKINGS {
        int id PK
        int service_id FK
        string client_name
        string client_email
        string client_phone
        date booking_date
        time booking_time
        string car_model
        text description
        enum status
        timestamp created_at
    }
    
    SERVICES {
        int id PK
        string name_est
        string name_eng
        string name_rus
        text description_est
        text description_eng
        text description_rus
        enum category
        decimal price
        int duration_minutes
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    SPAREPART_INQUIRIES {
        int id PK
        string client_name
        string client_email
        string client_phone
        int car_model_id FK
        text part_description
        string image_url
        int status_id
        timestamp created_at
    }
    
    SPAREPART_RESPONSES {
        int id PK
        int inquiry_id FK
        decimal price
        string availability
        string delivery_time
        text additional_info
        timestamp created_at
    }
    
    CONTACT_MESSAGES {
        int id PK
        string name
        string email
        string phone
        string subject
        text message
        boolean is_read
        boolean replied
        timestamp created_at
    }
    
    CAR_MAKES {
        int id PK
        string name UK
        timestamp created_at
    }
    
    CAR_MODELS {
        int id PK
        int make_id FK
        string name
        timestamp created_at
    }
```

### 6.3 Object Relationships

**Relationships:**
- **One-to-Many**: 
  - `USERS → BOOKINGS` (one admin manages many bookings)
  - `SERVICES → BOOKINGS` (one service has many bookings)
  - `CAR_MAKES → CAR_MODELS` (one make has many models)
  - `SPAREPART_INQUIRIES → SPAREPART_RESPONSES` (one inquiry can have one response)
  
**Key Constraints:**
- Foreign keys ensure referential integrity
- Unique constraints on usernames, emails
- Indexed fields: email, booking_date, status
- Soft deletes not implemented (hard deletes used)

**Data Types:**
- `enum`: Predefined values (status, role, category)
- `decimal(10,2)`: Monetary values
- `timestamp`: Auto-updated modification tracking
- `text`: Unlimited length descriptions

---

## 7. System Architecture

### 7.1 Architecture Principles and Choices

**Architecture Style**: **Three-Tier Architecture**
- **Presentation Layer**: React SPA
- **Application Layer**: Node.js/Express REST API
- **Data Layer**: MariaDB relational database

**Key Principles:**
- **Separation of Concerns**: Frontend, backend, and database are independent
- **Stateless API**: No session state on server (JWT tokens)
- **RESTful Design**: Standard HTTP methods and status codes
- **Containerization**: Docker for consistent deployment
- **Environment-based Configuration**: .env files for secrets

**Design Decisions:**
- **React over Vue/Angular**: Component reusability, large ecosystem
- **Express over Nest.js**: Simplicity, lightweight
- **MariaDB over PostgreSQL**: Better MySQL compatibility, performance
- **JWT over sessions**: Scalable authentication for stateless API

### 7.2 Technologies and Frameworks

**Frontend:**
- **React 18.2.0**: UI library
- **React Router DOM 6.x**: Client-side routing
- **Tailwind CSS 3.x**: Utility-first styling
- **i18next**: Internationalization
- **Axios**: HTTP client
- **Formik + Yup**: Form management and validation
- **React-Toastify**: Notifications
- **React-Calendar**: Date picker

**Backend:**
- **Node.js 18+**: Runtime environment
- **Express 4.x**: Web framework
- **mysql2**: MariaDB driver with promises
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **nodemailer**: Email sending
- **dotenv**: Environment variables
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing

**Database:**
- **MariaDB 10.11**: Relational database
- **Docker**: Database containerization

**Development Tools:**
- **Vite**: Frontend build tool
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Playwright**: E2E testing
- **Git**: Version control

### 7.3 Logical Architecture (Components and Relationships)

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │              React SPA (Port 5173)              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │   │
│  │  │  Pages   │  │Components│  │ Services │     │   │
│  │  │          │  │          │  │          │     │   │
│  │  │ - Home   │  │ - Navbar │  │ - API    │     │   │
│  │  │ - Services│ │ - Footer │  │   Client │     │   │
│  │  │ - Booking│  │ - Modals │  │ - i18n   │     │   │
│  │  │ - Gallery│  │          │  │          │     │   │
│  │  │ - Contact│  │          │  │          │     │   │
│  │  │ - Admin  │  │          │  │          │     │   │
│  │  └──────────┘  └──────────┘  └──────────┘     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                    HTTP/REST API
                          │
┌─────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │        Express REST API (Port 5000)             │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │   │
│  │  │  Routes  │  │  Models  │  │Middleware│     │   │
│  │  │          │  │          │  │          │     │   │
│  │  │ - auth   │  │ - User   │  │ - auth   │     │   │
│  │  │ - booking│  │ - Booking│  │ - error  │     │   │
│  │  │ - services│ │ - Service│  │ - logger │     │   │
│  │  │ - admin  │  │ - Inquiry│  │ - cors   │     │   │
│  │  │ - contact│  │ - Message│  │          │     │   │
│  │  └──────────┘  └──────────┘  └──────────┘     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                      SQL Queries
                          │
┌─────────────────────────────────────────────────────────┐
│                      DATA LAYER                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │          MariaDB (Port 3306)                    │   │
│  │  ┌──────────────────────────────────────────┐  │   │
│  │  │  Tables:                                 │  │   │
│  │  │  - users                                 │  │   │
│  │  │  - bookings                              │  │   │
│  │  │  - services                              │  │   │
│  │  │  - sparepart_inquiries                   │  │   │
│  │  │  - sparepart_responses                   │  │   │
│  │  │  - contact_messages                      │  │   │
│  │  │  - car_makes, car_models                 │  │   │
│  │  └──────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Component Responsibilities:**

**Frontend Components:**
- **Pages**: Route-level components for each view
- **Components**: Reusable UI elements (Navbar, Footer, Modals)
- **API Client**: Axios instance with interceptors for auth
- **State Management**: React hooks (useState, useEffect)

**Backend Components:**
- **Routes**: API endpoint definitions
- **Models**: Database interaction layer
- **Middleware**: Request processing (auth, error handling, logging)
- **Controllers**: Business logic (implicit in routes)

### 7.4 Physical Architecture / Deployment View

```
┌────────────────────────────────────────────────────┐
│              Production Environment                 │
│                                                    │
│  ┌──────────────────────────────────────────┐    │
│  │         Docker Host (Linux/Windows)       │    │
│  │                                           │    │
│  │  ┌─────────────────────────────────┐     │    │
│  │  │  Frontend Container              │     │    │
│  │  │  - Nginx                         │     │    │
│  │  │  - Static React build            │     │    │
│  │  │  - Port: 3000                    │     │    │
│  │  └─────────────────────────────────┘     │    │
│  │              ↓                            │    │
│  │  ┌─────────────────────────────────┐     │    │
│  │  │  Backend Container               │     │    │
│  │  │  - Node.js + Express             │     │    │
│  │  │  - Port: 5000                    │     │    │
│  │  └─────────────────────────────────┘     │    │
│  │              ↓                            │    │
│  │  ┌─────────────────────────────────┐     │    │
│  │  │  Database Container              │     │    │
│  │  │  - MariaDB 10.11                 │     │    │
│  │  │  - Port: 3306                    │     │    │
│  │  │  - Volume: /var/lib/mysql        │     │    │
│  │  └─────────────────────────────────┘     │    │
│  │                                           │    │
│  │  Docker Network: bma_motors_network      │    │
│  └──────────────────────────────────────────┘    │
└────────────────────────────────────────────────────┘
                     │
                     │ HTTPS
                     ↓
┌────────────────────────────────────────────────────┐
│                Client Browsers                      │
│  - Desktop (Chrome, Firefox, Safari, Edge)         │
│  - Mobile (iOS Safari, Chrome Mobile)              │
└────────────────────────────────────────────────────┘
```

**Deployment Details:**

**Docker Compose Configuration:**
```yaml
services:
  frontend:
    build: ./frontend
    ports: 3000:80
    depends_on: backend
    
  backend:
    build: ./backend
    ports: 5000:5000
    environment:
      - DB_HOST=db
      - DB_PORT=3306
    depends_on: db
    
  db:
    image: mariadb:10.11
    ports: 3306:3306
    volumes:
      - db_data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=***
      - MYSQL_DATABASE=bma_motors
```

**Network Configuration:**
- All containers on same Docker network
- Backend exposes port 5000 to host
- Frontend exposes port 3000 to host
- Database port 3306 exposed for local development

**Data Persistence:**
- Database volume mounted for persistent storage
- Daily backups to external storage
- Backup retention: 30 days

---

## 8. User Interface and Prototypes

### 8.1 Key Screen Wireframes

#### 8.1.1 Homepage
```
┌───────────────────────────────────────────────────┐
│  [BMA MOTORS Logo]  Home Services Booking Gallery│
│                     Spare Parts Contact  [EN ▼]  │
├───────────────────────────────────────────────────┤
│                                                   │
│        HERO SECTION (BMW Background)              │
│                                                   │
│        BMA MOTORS Auto Repair                     │
│        Professional BMW Service                   │
│                                                   │
│        [Book Service] [Contact Us]                │
│                                                   │
├───────────────────────────────────────────────────┤
│                                                   │
│  STATISTICS SECTION (Blue Gradient)               │
│                                                   │
│                 10+ Years                         │
│                 Experience                        │
│                                                   │
├───────────────────────────────────────────────────┤
│                                                   │
│  SERVICES OVERVIEW                                │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐   │
│  │ Engine │  │Diagnos-│  │Electric│  │ Brake  │   │
│  │ Repair │  │ tics   │  │  Work  │  │ System │   │
│  └────────┘  └────────┘  └────────┘  └────────┘   │
│                                                   │
└───────────────────────────────────────────────────┘
```

#### 8.1.2 Booking Page
```
┌───────────────────────────────────────────────────┐
│  [Navigation Bar]                                 │
├───────────────────────────────────────────────────┤
│                                                   │
│        HERO: Book a Service                       │
│                                                   │
├───────────────────────────────────────────────────┤
│                                                   │
│  BOOKING FORM                                     │
│                                                   │
│  CALENDAR (Color-coded Availability)              │
│  ┌─────────────────────────────────────────┐     │
│  │  Su Mo Tu We Th Fr Sa                   │     │
│  │      1  2  3  4  5  6 [7]  ← Selected   │     │
│  │  8  9 [10][11][12] 13 14                │     │
│  │      ▓ Fully booked                      │     │
│  │      ░ Partially booked                  │     │
│  │      □ Available                         │     │
│  └─────────────────────────────────────────┘     │
│                                                   │
│  Time Slots: [09:00] [09:30] [10:00] ...         │
│                                                   │
│  Name: [________________]                         │
│  Email: [________________]                        │
│  Phone: [________________]                        │
│  Car Model: [____________]                        │
│  Service: [Dropdown ▼]                            │
│  Description: [_________________________]         │
│                                                   │
│  [Submit Booking]                                 │
│                                                   │
└───────────────────────────────────────────────────┘
```

#### 8.1.3 Admin Dashboard
```
┌───────────────────────────────────────────────────┐
│  BMA MOTORS Admin  [Logout]                       │
├───────────────────────────────────────────────────┤
│                                                   │
│  STATISTICS CARDS                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────│
│  │ Today's  │ │ Pending  │ │   New    │ │Unread │
│  │ Bookings │ │ Bookings │ │Inquiries │ │Messages│
│  │    5     │ │    12    │ │    3     │ │   7   │
│  └──────────┘ └──────────┘ └──────────┘ └───────│
│                                                   │
├───────────────────────────────────────────────────┤
│  [Bookings] [Inquiries] [Messages] [Services]     │
├───────────────────────────────────────────────────┤
│                                                   │
│  BOOKINGS TABLE                [+ Add Booking]    │
│  ┌────┬──────────┬──────┬───────┬────────┬─────┐ │
│  │ ID │ Customer │ Date │ Time  │ Status │ ... │ │
│  ├────┼──────────┼──────┼───────┼────────┼─────┤ │
│  │ 45 │ John Doe │12/05 │ 10:00 │[Pending]│[✓][✗]│
│  │ 44 │ Jane S.  │12/05 │ 14:30 │Confirmed│[✓][✗]│
│  │ 43 │ Mike K.  │12/04 │ 09:00 │Completed│[✓][✗]│
│  └────┴──────────┴──────┴───────┴────────┴─────┘ │
│                                                   │
└───────────────────────────────────────────────────┘
```

#### 8.1.4 Services Management Modal
```
┌───────────────────────────────────────────────────┐
│  Add/Edit Service                            [×]  │
├───────────────────────────────────────────────────┤
│                                                   │
│  ESTONIAN                                         │
│  Name (EST): [Pidurisüsteemi remont_________]    │
│  Description: [___________________________]       │
│                                                   │
│  ENGLISH                                          │
│  Name (ENG): [Brake system repair__________]     │
│  Description: [___________________________]       │
│                                                   │
│  RUSSIAN                                          │
│  Name (RUS): [Ремонт тормозной системы_____]     │
│  Description: [___________________________]       │
│                                                   │
│  SERVICE DATA                                     │
│  Category: [Repair Work ▼]                        │
│  Price (€): [___150.00___]                        │
│  Duration (min): [___90___]                       │
│  [✓] Active Service                               │
│                                                   │
│  [Cancel] [Save Service]                          │
│                                                   │
└───────────────────────────────────────────────────┘
```

### 8.2 User Experience Principles

**Design Philosophy:**
1. **Clarity**: Clear visual hierarchy, readable typography
2. **Consistency**: Uniform styling across all pages
3. **Feedback**: Immediate response to user actions (toasts, loading states)
4. **Efficiency**: Minimize clicks to complete tasks
5. **Accessibility**: Keyboard navigation, ARIA labels, high contrast

**UX Guidelines:**
- **Mobile-First**: Responsive design starting from 320px width
- **Color Coding**: Visual cues for status (red=booked, yellow=partial, green=available)
- **Progressive Disclosure**: Show advanced options only when needed
- **Error Prevention**: Form validation before submission
- **Undo Capability**: Confirmation dialogs for destructive actions
- **Loading States**: Skeleton screens and spinners during data fetch

**Accessibility Features:**
- Semantic HTML5 elements
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard focus indicators
- Minimum contrast ratio 4.5:1
- Screen reader compatible

**Multilingual UX:**
- Language switcher always visible in navbar
- Flag icons for language identification
- Right-to-left (RTL) support (future enhancement)
- Date/time formatting per locale

---

## 9. Risk Analysis

### 9.1 Primary Risks

#### 9.1.1 Technical Risks

| Risk | Probability | Impact | Severity |
|------|-------------|--------|----------|
| **Database Failure** | Low | High | Critical |
| **API Performance Degradation** | Medium | Medium | High |
| **Third-party Service Downtime** (Email, CDN) | Medium | Medium | Medium |
| **Browser Compatibility Issues** | Low | Low | Low |
| **Mobile Responsiveness Bugs** | Medium | Medium | Medium |

**Details:**
- **Database Failure**: Corruption, hardware failure, or backup issues could lead to data loss
- **API Performance**: Unoptimized queries or traffic spikes may slow response times
- **Email Service**: Gmail SMTP throttling or authentication issues could block notifications
- **Browser Issues**: Edge cases in older browsers may break functionality
- **Mobile Bugs**: Layout issues on specific devices or screen sizes

#### 9.1.2 Security Risks

| Risk | Probability | Impact | Severity |
|------|-------------|--------|----------|
| **SQL Injection** | Low | Critical | High |
| **XSS Attacks** | Low | High | High |
| **Unauthorized Admin Access** | Medium | Critical | Critical |
| **CSRF Attacks** | Low | Medium | Medium |
| **Data Breach** (GDPR violation) | Low | Critical | Critical |

**Details:**
- **SQL Injection**: Malicious SQL code injected via forms (mitigated by parameterized queries)
- **XSS**: Script injection through user inputs (mitigated by input sanitization)
- **Admin Access**: Weak passwords or token theft could compromise admin accounts
- **CSRF**: Cross-site request forgery targeting admin actions (mitigated by JWT)
- **Data Breach**: Exposure of customer data violates GDPR, leading to fines

#### 9.1.3 Business Risks

| Risk | Probability | Impact | Severity |
|------|-------------|--------|----------|
| **Low User Adoption** | Medium | High | High |
| **Customer Data Privacy Concerns** | Low | High | Medium |
| **Email Deliverability Issues** | High | Medium | High |
| **Incomplete Translations** | Medium | Low | Low |
| **Competitor Feature Gap** | Low | Medium | Low |

**Details:**
- **User Adoption**: Customers may prefer phone bookings if UI is complex
- **Privacy Concerns**: Lack of clear data policies may deter users
- **Email Issues**: Notifications may land in spam folders
- **Translations**: Missing Russian/English translations reduce usability
- **Competitor Gap**: Other shops may offer features like online payment

#### 9.1.4 Project Risks

| Risk | Probability | Impact | Severity |
|------|-------------|--------|----------|
| **Scope Creep** | High | Medium | Medium |
| **Resource Constraints** (time, budget) | Medium | High | High |
| **Knowledge Gaps** (new technologies) | Low | Medium | Low |
| **Testing Inadequacy** | Medium | High | High |
| **Documentation Debt** | Medium | Medium | Medium |

**Details:**
- **Scope Creep**: Continuous feature requests may delay core functionality
- **Resource Constraints**: Limited development time or budget overruns
- **Knowledge Gaps**: Learning curve for React, Docker, or MariaDB
- **Testing**: Insufficient E2E or unit tests may introduce bugs
- **Documentation**: Lack of code comments or API docs hinders maintenance

### 9.2 Risk Mitigation Strategies

#### Technical Risk Mitigation
1. **Database Failure**:
   - Daily automated backups to external storage
   - Database replication (master-slave setup)
   - Monitoring with alerts for disk space, CPU usage
   - Disaster recovery plan with RTO < 4 hours

2. **API Performance**:
   - Database indexing on frequently queried fields (email, date, status)
   - Query optimization and EXPLAIN analysis
   - Connection pooling (max 10 concurrent)
   - Caching layer for static data (future: Redis)
   - Load testing with 1000+ concurrent users

3. **Third-party Downtime**:
   - Fallback email service (SendGrid as backup)
   - Local image hosting for critical UI elements
   - Graceful degradation (queue emails for retry)

4. **Browser/Mobile Issues**:
   - Playwright E2E tests across browsers
   - Responsive design testing (320px - 2560px)
   - BrowserStack for device testing

#### Security Risk Mitigation
1. **SQL Injection**:
   - Always use parameterized queries (mysql2 prepared statements)
   - Input validation on client and server
   - Code review checklist for database queries

2. **XSS Attacks**:
   - Sanitize all user inputs with validator.js
   - React's default XSS protection (JSX escaping)
   - Content Security Policy (CSP) headers

3. **Unauthorized Access**:
   - Strong password policy (min 8 chars, uppercase, number)
   - JWT tokens with short expiration (7 days)
   - Rate limiting on login endpoint (5 attempts/15 min)
   - Two-factor authentication (future enhancement)

4. **CSRF**:
   - JWT in Authorization header (not cookies)
   - SameSite cookie attribute
   - CORS whitelist for allowed origins

5. **Data Breach**:
   - Encrypt passwords with bcrypt
   - HTTPS/TLS in production
   - Regular security audits (npm audit)
   - GDPR compliance policy
   - Minimal data collection principle

#### Business Risk Mitigation
1. **Low User Adoption**:
   - User testing with 5+ customers before launch
   - Onboarding tutorial on first visit
   - Phone support during transition period
   - A/B testing for UI improvements

2. **Privacy Concerns**:
   - Clear privacy policy on Contact page
   - GDPR consent checkbox on forms
   - Data deletion request mechanism
   - Transparent data usage explanation

3. **Email Deliverability**:
   - SPF, DKIM, DMARC email authentication
   - Professional email domain (no @gmail.com sender)
   - Unsubscribe link in footer
   - Monitor bounce rates

4. **Incomplete Translations**:
   - Translation review by native speakers
   - Fallback to Estonian if key missing
   - Translation completion checklist
   - Community translation contributions

#### Project Risk Mitigation
1. **Scope Creep**:
   - Fixed MVP feature list
   - Change request approval process
   - Sprint planning with prioritization
   - "Nice-to-have" backlog for post-launch

2. **Resource Constraints**:
   - Realistic timeline with buffer (20% contingency)
   - Automated deployment pipelines
   - Reuse existing libraries (React, Express)
   - Phased rollout (MVP → enhancements)

3. **Knowledge Gaps**:
   - Documentation for all custom code
   - Pair programming for complex features
   - Online course budget
   - Stack Overflow and GitHub issue tracking

4. **Testing Inadequacy**:
   - Minimum 80% code coverage target
   - Playwright E2E tests for critical paths
   - Manual QA checklist before deployment
   - Staging environment for pre-production testing

5. **Documentation Debt**:
   - JSDoc comments for all functions
   - README.md in each major folder
   - API documentation with examples
   - Inline code comments for complex logic

---

## 10. Additional Documentation

### 10.1 Constraints and Assumptions

#### Constraints
1. **Budget**: Limited to open-source technologies only
2. **Time**: MVP development within 3 months
3. **Team Size**: Small development team (1-2 developers)
4. **Infrastructure**: Deployment on shared hosting or VPS (not cloud-scale)
5. **Language Support**: Estonian, English, Russian only
6. **Payment Processing**: Not included in MVP (cash/bank transfer only)
7. **Browser Support**: Modern browsers only (no IE11 support)

#### Assumptions
1. **Internet Access**: Customers have reliable internet connectivity
2. **Email Access**: Customers check email regularly for confirmations
3. **Digital Literacy**: Users can navigate basic web forms
4. **Mobile Usage**: 40%+ of traffic will be mobile devices
5. **Data Accuracy**: Customers provide correct contact information
6. **Business Hours**: Bookings only during shop working hours (Mon-Fri 9-18,)
7. **Service Availability**: All listed services are currently offered
8. **Admin Availability**: Admin reviews bookings within 24 hours

### 10.2 Relationships with Other Systems

#### Current Integrations
1. **Unsplash API**:
   - **Purpose**: Hero background images
   - **Type**: REST API (public)
   - **Dependency**: Non-critical (fallback to local images)
   - **Rate Limit**: 50 requests/hour

2. **Gmail SMTP**:
   - **Purpose**: Email notifications (booking confirmations, inquiry responses)
   - **Type**: SMTP (authenticated)
   - **Dependency**: Critical (backup: SendGrid)
   - **Rate Limit**: 500 emails/day (free tier)

3. **NHTSA API**:
   - **Purpose**: Vehicle make/model database
   - **Type**: REST API (public)
   - **Dependency**: One-time data seeding only
   - **Rate Limit**: No official limit

#### Future Integrations
1. **Payment Gateway** (Stripe/PayPal):
   - Online payment for services and parts
   - Deposit system for bookings
   - Refund processing

2. **SMS Service** (Twilio):
   - Booking confirmation via SMS
   - Reminder notifications 24h before appointment

3. **Google Calendar API**:
   - Sync bookings to admin's Google Calendar
   - Two-way synchronization

4. **Inventory Management System**:
   - Real-time spare parts availability
   - Automatic stock updates

5. **Accounting Software** (e.g., QuickBooks):
   - Invoice generation
   - Financial reporting

### 10.3 Future Plans and Enhancement Opportunities

#### Phase 2 Enhancements (6-12 months)
1. **Customer Portal**:
   - Customer registration and login
   - Booking history
   - Service records for vehicles
   - Loyalty points system

2. **Advanced Booking**:
   - Recurring bookings (e.g., monthly maintenance)
   - Multi-service bookings in one appointment
   - Mechanic selection
   - Calendar export (iCal, Outlook)

3. **E-commerce Features**:
   - Online spare parts catalog
   - Shopping cart and checkout
   - Payment integration
   - Order tracking

4. **Communication**:
   - Live chat support
   - SMS notifications
   - Push notifications (PWA)
   - WhatsApp integration

5. **Analytics and Reporting**:
   - Customer analytics dashboard
   - Revenue reports
   - Service popularity metrics
   - Booking trends and forecasting

#### Phase 3 Enhancements (1-2 years)
1. **Mobile App**:
   - Native iOS/Android apps
   - Push notifications
   - Offline booking draft
   - Photo upload from camera

2. **AI/ML Features**:
   - Chatbot for common inquiries
   - Predictive maintenance recommendations
   - Dynamic pricing based on demand
   - Part recommendation engine

3. **Multi-location Support**:
   - Branch management
   - Location-based booking
   - Inventory across locations
   - Centralized reporting

4. **Partner Integrations**:
   - Insurance company APIs
   - Parts supplier integrations
   - Towing service partnerships
   - Rental car services

5. **Advanced Admin Features**:
   - Employee management
   - Task assignment to mechanics
   - Inventory management
   - Financial dashboards
   - Customer relationship management (CRM)

#### Technical Debt and Improvements
1. **Code Quality**:
   - Increase test coverage to 90%
   - Refactor large components into smaller ones
   - Implement custom hooks for reusable logic
   - Add TypeScript for type safety

2. **Performance**:
   - Implement Redis caching
   - Optimize database queries
   - Lazy load components
   - Image compression and CDN

3. **Security**:
   - Two-factor authentication
   - Rate limiting on all endpoints
   - Security audit and penetration testing
   - GDPR data export functionality

4. **DevOps**:
   - CI/CD pipeline (GitHub Actions)
   - Automated testing on commits
   - Staging environment
   - Blue-green deployment
   - Monitoring and alerting (Prometheus, Grafana)

5. **Accessibility**:
   - WCAG 2.1 Level AA compliance
   - Screen reader optimization
   - Voice navigation support
   - High contrast mode

---

## Appendices

### Appendix A: API Endpoints

**Public Endpoints:**
- `GET /api/services` - List all active services
- `GET /api/services/:id` - Get service details
- `POST /api/booking` - Create booking
- `GET /api/booking/available-slots` - Get available time slots
- `GET /api/booking/month-availability` - Get month calendar data
- `POST /api/spareparts` - Submit spare parts inquiry
- `POST /api/contact` - Submit contact message

**Admin Endpoints (JWT Required):**
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/broneeringud` - List bookings
- `PUT /api/admin/broneeringud/:id` - Update booking
- `DELETE /api/admin/broneeringud/:id` - Delete booking
- `GET /api/admin/paringud` - List inquiries
- `POST /api/admin/paringud/:id/vastus` - Respond to inquiry
- `GET /api/admin/sonumid` - List messages
- `PUT /api/admin/sonumid/:id` - Mark message as read/replied
- `DELETE /api/admin/sonumid/:id` - Delete message
- `GET /api/admin/teenused` - List all services
- `POST /api/admin/teenused` - Create service
- `PUT /api/admin/teenused/:id` - Update service
- `DELETE /api/admin/teenused/:id` - Delete service

### Appendix B: Database Schema

See Section 6.2 for complete ER diagram.

### Appendix C: Environment Variables

**Backend (.env):**
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=***
DB_NAME=bma_motors
JWT_SECRET=***
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=***
EMAIL_PASS=***
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

### Appendix D: Deployment Checklist

- [ ] Update environment variables for production
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure SMTP with production email
- [ ] Set up database backups (daily)
- [ ] Configure CORS for production domain
- [ ] Optimize images and assets
- [ ] Run security audit (`npm audit`)
- [ ] Test all critical user flows
- [ ] Monitor error logs after launch
- [ ] Prepare rollback plan

---

## Document Metadata

- **Version**: 1.0.0
- **Last Updated**: 2025-10-06
- **Author**: BMA MOTORS Development Team
- **Status**: In Development (MVP Phase)
- **Review Date**: 2025-12-31
- **Repository**: https://github.com/bma-motors/bma-motors

---

**End of Documentation**
