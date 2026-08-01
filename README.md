# ALF - Auto Lead Finder

ALF (Auto Lead Finder) is a lead discovery and management platform designed to help businesses and sales teams discover potential customers by automatically finding businesses, storing relevant information, and managing leads through a dashboard interface.

The goal of ALF is to simplify the process of finding businesses that may be potential customers by automating discovery workflows and providing an organized lead management system.

---

## Features

### Business Discovery

ALF can automatically discover businesses based on user-defined search queries.

Current discovery workflow:

- User enters one or more search queries
- Discovery jobs run in the background
- Businesses are collected and processed
- Businesses are stored in the database
- New leads are automatically created

Example:
```

"plumbers Brussels"  
"restaurants Antwerp"  
"electricians Ghent"

```

---

### Lead Management

Discovered businesses are converted into leads that can be managed through the dashboard.

Available functionality:

- View all discovered leads
- Search leads
- Filter leads by:
  - Status
  - Website availability
- Open detailed lead profiles
- Update lead information
- Add notes
- Exclude unwanted leads

---

### Lead Details

Each lead contains:

- Business information
- Contact information
- Website information
- Lead status
- Notes
- Score information (prepared for future scoring functionality)

---

### Contact Management

Contacts can be attached to leads.

Supported actions:

- Create contacts
- Update contacts
- Delete contacts
- View contact information

---

### User Profile

The application includes user profile functionality.

Current profile features:

- View profile information
- Edit profile information
- Upload avatar images

---

## Architecture

ALF consists of two main applications:
```

ALF  
│  
├── Backend  
│ ├── FastAPI  
│ ├── SQLAlchemy  
│ ├── Database layer  
│ ├── Discovery workers  
│ └── REST API  
│  
└── Frontend  
├── React  
├── TypeScript  
├── TailwindCSS  
└── React Query

````

---

# Backend

The backend is responsible for:

- API endpoints
- Database communication
- Discovery jobs
- Lead processing
- Contact management
- Business storage

Technology stack:

- Python
- FastAPI
- SQLAlchemy
- Pydantic

---

# Frontend

The frontend provides the user interface.

Technology stack:

- React
- TypeScript
- Vite
- TailwindCSS
- TanStack Query

Main sections:

- Dashboard
- Leads
- Lead details
- Discovery
- Profile

---

# Development Setup

## Backend

Navigate to the backend folder:

```bash
cd backend
````

Create a virtual environment:

```
python -m venv .venv
```

Activate it:

Windows:

```
.venv\Scripts\activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Run the API:

```
uvicorn main:app --reload
```

---

## Frontend

Navigate to the frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

---

# Future Goals

Planned improvements:

- Automated lead scoring
- Better discovery progress tracking
- Production deployment system
- User authentication improvements
- More advanced filtering
- Analytics dashboard
- AI-assisted lead qualification

---

# Project Status

ALF is currently in active development.

The current version focuses on establishing the core workflow:

```
Discover businesses
        ↓
Store businesses
        ↓
Create leads
        ↓
Manage leads
        ↓
Convert opportunities
```
