# Pokedex

## Usage

### Backend:
First change to the backend directory, create a virtual environment and add the installed apps in settings.py:
```
cd backend/
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers
```
Change to the app directory:
```
cd backendapi/
python3 manage.py migrate
python3 manage.py runserver
```
The backend server will be running on localhost:8000  

### Frontend:
```
npm install
npm run start
```
The frontend will be running on localhost:3000
