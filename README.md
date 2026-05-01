<div align="center">

```
███████╗██╗  ██╗ ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██║  ██║██╔═══██╗██╔══██╗██╔══██╗██╔════╝
███████╗███████║██║   ██║██████╔╝██████╔╝█████╗  
╚════██║██╔══██║██║   ██║██╔═══╝ ██╔═══╝ ██╔══╝  
███████║██║  ██║╚██████╔╝██║     ██║     ███████╗
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     ╚══════╝
```

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/Django-5.x-092E20?style=flat-square&logo=django&logoColor=white)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)

</div>

---

A full-stack ecommerce app — **Django REST Framework** backend, **React + Vite** frontend.

## 🛠️ Tech Stack

| Side | Tech |
|---|---|
| **Backend** | Django, Django REST Framework, PostgreSQL |
| **Frontend** | React 18, Tailwind CSS, Vite |

## 📁 Structure

```
├── backend/
│   ├── backend/        # Django project (settings, urls)
│   ├── store/          # Main app (models, views, serializers)
│   ├── media/          # Uploaded product images
│   └── manage.py
│
└── frontend/
    ├── src/            # React components & pages
    ├── public/
    └── vite.config.js
```

## 🚀 Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> Backend → `http://localhost:8000` · Frontend → `http://localhost:5173`

## 🗺️ Roadmap

- [ ] User authentication
- [ ] Online payments

## 📄 License

MIT © [Hamza](https://github.com/yourusername)
