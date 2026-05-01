<div align="center">

```
███████╗██╗  ██╗ ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██║  ██║██╔═══██╗██╔══██╗██╔══██╗██╔════╝
███████╗███████║██║   ██║██████╔╝██████╔╝█████╗  
╚════██║██╔══██║██║   ██║██╔═══╝ ██╔═══╝ ██╔══╝  
███████║██║  ██║╚██████╔╝██║     ██║     ███████╗
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     ╚══════╝
```

**A full-stack ecommerce platform built with Django REST Framework + React**

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/Django-5.x-092E20?style=flat-square&logo=django&logoColor=white)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

</div>

---

## ✦ What is Shoppe?

**Shoppe** is a production-ready ecommerce platform with a decoupled architecture — a **Django REST Framework** backend serving a **React** frontend. Built for speed, scalability, and a seamless shopping experience.

> Think of it as your own Shopify, but one you actually own and understand.

---

## ⚡ Feature Highlights

| Area | Features |
|---|---|
| 🛍️ **Shopping** | Product catalog, search & filter, categories, product variants |
| 🛒 **Cart & Checkout** | Persistent cart, guest checkout, order summary |
| 💳 **Payments** | Stripe integration, order confirmation emails |
| 👤 **Auth** | JWT auth, user profiles, order history |
| 🔐 **Admin** | Django admin panel + custom dashboard |
| 📦 **Orders** | Order tracking, status updates, invoice generation |
| 🌙 **UX** | Responsive design, dark mode, skeleton loaders |

---

## 🏗️ Tech Stack

### Backend
```
Django 5         → Web framework
DRF              → REST API
PostgreSQL       → Primary database
Redis            → Caching & sessions
Celery           → Background tasks (emails, order processing)
JWT              → Authentication
Stripe           → Payment processing
Cloudinary       → Image storage
```

### Frontend
```
React 18         → UI library
React Router 6   → Client-side routing
Redux Toolkit    → State management
Axios            → HTTP client
Tailwind CSS     → Styling
React Query      → Server state & caching
Framer Motion    → Animations
```

---

## 📁 Project Structure

```
shoppe/
│
├── backend/                    # Django project
│   ├── config/                 # Settings, URLs, WSGI
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   └── production.py
│   │   └── urls.py
│   │
│   ├── apps/
│   │   ├── accounts/           # User auth & profiles
│   │   ├── products/           # Product catalog
│   │   ├── orders/             # Order management
│   │   ├── cart/               # Shopping cart
│   │   └── payments/           # Stripe integration
│   │
│   ├── requirements/
│   │   ├── base.txt
│   │   ├── development.txt
│   │   └── production.txt
│   └── manage.py
│
├── frontend/                   # React app
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route-level page components
│   │   ├── store/              # Redux slices
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service layer
│   │   └── utils/
│   └── package.json
│
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis 7+

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/shoppe.git
cd shoppe
```

### 2. Backend setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements/development.txt

# Set up environment variables
cp .env.example .env
# → Edit .env with your credentials

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Seed sample data (optional)
python manage.py seed_products

# Start development server
python manage.py runserver
```

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# → Set REACT_APP_API_URL=http://localhost:8000/api

# Start dev server
npm run dev
```

### 4. Start background workers (optional)

```bash
# In a new terminal, from the backend directory:
celery -A config worker --loglevel=info

# Celery Beat scheduler (for periodic tasks):
celery -A config beat --loglevel=info
```

> 🎉 Frontend runs at `http://localhost:5173` · Backend API at `http://localhost:8000/api`

---

## 🐳 Docker Setup

Spin up the entire stack with one command:

```bash
# Development
docker-compose up --build

# Production
docker-compose -f docker-compose.prod.yml up --build
```

Services started: `django` · `react` · `postgres` · `redis` · `celery` · `nginx`

---

## 🔑 Environment Variables

### Backend `.env`
```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/shoppe_db

# Redis
REDIS_URL=redis://localhost:6379/0

# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your@email.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Frontend `.env.local`
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 📡 API Overview

Base URL: `/api/v1/`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register/` | Register new user |
| `POST` | `/auth/login/` | Obtain JWT tokens |
| `POST` | `/auth/token/refresh/` | Refresh access token |
| `GET` | `/products/` | List all products |
| `GET` | `/products/:slug/` | Product detail |
| `GET` | `/products/?category=&search=` | Filter & search |
| `GET/POST` | `/cart/` | View or update cart |
| `POST` | `/orders/` | Place an order |
| `GET` | `/orders/:id/` | Order detail |
| `POST` | `/payments/create-intent/` | Create Stripe PaymentIntent |
| `POST` | `/payments/webhook/` | Stripe webhook handler |

Full API docs available at `/api/docs/` (Swagger UI) or `/api/redoc/`.

---

## 🧪 Testing

```bash
# Backend tests
cd backend
python manage.py test
pytest --cov=apps --cov-report=html    # with coverage report

# Frontend tests
cd frontend
npm test
npm run test:coverage
```

---

## 🚢 Deployment

Recommended stack: **Railway / Render** (backend) + **Vercel** (frontend) + **Neon** (PostgreSQL)

### Backend (Railway)
```bash
railway login
railway init
railway up
```

### Frontend (Vercel)
```bash
vercel --prod
```

Don't forget to:
- [ ] Set all environment variables in your hosting dashboards
- [ ] Configure Stripe webhooks for your production URL
- [ ] Set `DEBUG=False` and `ALLOWED_HOSTS` properly
- [ ] Enable HTTPS — Django will enforce it via `SECURE_SSL_REDIRECT`
- [ ] Run `collectstatic` for Django static files

---

## 🗺️ Roadmap

- [x] Product catalog & search
- [x] Cart & checkout flow
- [x] Stripe payments
- [x] JWT authentication
- [x] Order management
- [ ] Product reviews & ratings *(in progress)*
- [ ] Wishlist / saved items
- [ ] Discount codes & coupons
- [ ] Multi-currency support
- [ ] Vendor/seller dashboard
- [ ] Real-time order tracking (WebSockets)
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome and appreciated!

```bash
# 1. Fork the repo
# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes and commit
git commit -m "feat: add amazing feature"

# 4. Push and open a Pull Request
git push origin feature/amazing-feature
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) and make sure all tests pass before submitting a PR.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Built with 🖤 by [Hamza](https://github.com/TheOnlyRealYT)

*If this project helped you, a ⭐ on GitHub goes a long way!*

</div>
