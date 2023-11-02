# Remedy
### An integrated software solution for superspeciality clinics to connect between patients, doctors, and labs.

## Modules
### Module 1: Authentication
The authentication module deals with the admin, patient, doctor, and lab’s account creation, password reset, login, and logout.
### Module 2: Patients
The Patients module contains their pages, functionalities, and other basic data models.
### Module 3: Doctors and Labs
This module deals with Doctors, and Laboratories. Contains their pages, functionalities, and other basic data models.
### Module 4: Executives
The executives module deals with the management of the system, and approval of doctors and laboratories.
### Module 5: Appointments
The appointments module deals with management of appointments. It also supplies real-time information on time-slot availability
### Module 6: Payments
The payments module deals with the processing of payments for appointments. It stores required information related to payments as well.
### Module 7: Reports
The reports module deals with the generation of reports, especially creating lab reports, prescriptions, other relevant data storage as well.
### Module 8: Video call
This module deals with all video call related APIs, settings, keys, etc.
### Module 9: Chat
This module deals with all chat related APIs, settings, keys, etc.


## Prerequisites:
I am using VSCode for my development and its integrated terminal. Any IDE and command prompt is enough.
I have enabled 'autosave features'. So, 'save' won't be mentioned in the follwing instructions.

## Initial setup
Create a project directory with name 'Remedy_v1' using terminal
```
mkdir Remedy_v1
```

Navigate into the newly created directory
```
cd Remedy_v1
```

Open VSCode
```
code .
```

Open the terminal inside VSCode and you should be able to see something like:
```local-machine's-name Remedy_v1 %```

## Django installation

Now install pipenv, a virual environment manager
```
pip install pipenv
```

Activate the virtual environment
```
pipenv shell
```

Install django
```
pip install django
```

Initialize a new git repository
```
git init
```

Create two file named '.env' and .gitignore
```
touch .env
```
```
touch .gitignore
```

Add .env to the gitignore file

Install 'Python-decouple' package
```
pip install python-decouple
```

Now copy the 'secret key from settings.py to .env file.
In the .env file it should be something like the following:
```
SECRET_KEY = 'the_secret_key'
```
In the settings.py file, add the following lines:
```
from decouple import config
SECRET_KEY = config("SECRET_KEY")
```

Create a django project called backend. This will contain all backend files
```
django-admin startproject backend
```

Navigate into the backend directory
```
cd backend
```

Start new app for all modules
```
python manage.py startapp authentication; \
python manage.py startapp patients; \
python manage.py startapp doctors_and_labs; \
python manage.py startapp executives; \
python manage.py startapp appointments; \
python manage.py startapp payments; \
python manage.py startapp reports; \
python manage.py startapp video_call; \
python manage.py startapp chat;\
python manage.py startapp api_v1
```

Now add all the apps into settings.py > installed apps section

Install psycopg to interact with PostgreSQL
```
pip install psycopg
```

Create a new db in PSQL
add the credentials into the settings.

Add the following lines into settings.py to make the custom usermodel to be used for authentication.

```
AUTH_USER_MODEL = 'authentication.Account
```

Migrate the model to the database
```
python manage.py makemigrations
```
```
python manage.py migrate
```
Install REST and CORS for django
```
pipenv install djangorestframework django-cors-headers 
```
Install Python magic to validate files
```
pip install python-magic
```

To whitelist the frontend request, add the following lines to the backend/settings.py

```
CORS_ORIGIN_WHITELIST = [
     'http://localhost:3000'
]
```

Create serializer for Account.

Create sample API to check whether they are working or not 'GET' and 'POST' views. This can be confirmed using REST's default page.

Postman is used to interact with the API from this point.

Install simple JWT for access and refresh tokens

```
pip install djangorestframework-simplejwt
```
Install Razorpay for payment integration
```
pip install razorpay
```
Install pusher for chatting
```
pip install pusher
```


# React
Created a new react app using:
```
npx create-react-app frontend
```
Then deleted .git file from the frontend directory, added necessory lines into the project's global .gitignore file.

Created assets, components, pages, routes, and store directories inside src directory. Another 'Common' directory inside the newly created componenets directory.

From frontend directory, install react-redux, redux, react router dom, react-bootstrap reactstrap, bootstrap. I have installed reactstrap and react-bootstrap. This is not necessory. I have started with reactstrap, at one point of time, I felt it was limiting and installed react-bootstrap. 

```
npm install react-redux redux react-router-dom reactstrap react-bootstrap bootstrap
```
Install SASS related dependencies, formik and yup for form state management
```
npm install sass-loader node-sass css-loader style-loader postcss-loader formik yup
```

For all 4 types of users,
Login pages were added
Register pages were added
OTP pages were added

Header,Footer has been made. This will be used througout the patient facing pages.

Big cards and small cards were made. This will be shown in the landing page.

Doctor Specialties are hardcoded as of now.


Install react-table
```
npm i react-table
```
Install axios to send http request to backend and collect data
```
npm install axios
```
Install date fns for getting date related data
```
npm install date-fns
```
Install react toastify for pop-up messages
```
npm install react-toastify
```
Install razorpay package
```
npm install razorpay
```
Install .env to load keys directly from .env file
```
npm install dotenv
```
Install formik for form validation
```
npm install formik
```
Install react scrollbar
```
npm i react-perfect-scrollbar
```

Thanks to:

Attributions:
Profile icon:
<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>

Doctor prescription:
<a href="https://storyset.com/health">Health illustrations by Storyset</a>

Lab test selection:
<a href="https://storyset.com/analysis">Analysis illustrations by Storyset</a>

Doctor :
<a href="https://storyset.com/work">Work illustrations by Storyset</a>

Lab test:
<a href="https://storyset.com/analysis">Analysis illustrations by Storyset</a>

Online Doctor:
<a href="https://storyset.com/work">Work illustrations by Storyset</a>

Green successful tick:
<a href="https://www.flaticon.com/free-icons/correct" title="correct icons">Correct icons created by kliwir art - Flaticon</a>

Linkedin logo:
<a href="https://www.flaticon.com/free-icons/linkedin" title="linkedin icons">Linkedin icons created by riajulislam - Flaticon</a>

Github logo:
<a href="https://www.flaticon.com/free-icons/github" title="github icons">Github icons created by riajulislam - Flaticon</a>

