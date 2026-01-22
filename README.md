# Stock Prediction Portal

A full-stack Stock Prediction Web App built with Django REST Framework and React. The application visualizes historical stock data and provides ML-based price predictions for educational purposes.


## 🚀 Features
- 🔐 User authentication (JWT tokens)

- 📊 Interactive dashboard for stock data

- 📈 Plot historical stock prices

- 🤖 ML-based future stock price prediction

- 🔁 Backend API built with Django REST Framework

- ⚛️ Frontend UI built with React

- ⚡ Axios for API communication between frontend and backend

## Installation
Clone the repo
```
git clone https://github.com/midlajdev/stock-prediction-portal.git
cd stock-prediction-portal

```
Backend
```
cd backend-drf
python -m venv venv
venv\Scripts\activate           # Windows
pip install -r requirements.txt
```
Configure
```
SECRET_KEY=your-django-secret
DEBUG=True
```
Migrate and Run
```
python manage.py migrate
python manage.py runserver
```
Frontend
```
cd frontend-react
npm install
npm run dev
```
## Using the App

- Register or log in with your credentials

- Navigate to the dashboard

- Search for a stock ticker

- View historical performance





