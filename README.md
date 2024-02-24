# RentOrBuy.com

Online car dealer rental and sales full stack project.
![Dashboard](rentorbuy_frontEnd/src/screenshots/Homepage.png)

## Table of Contents:
1. Getting Started
2. API calls
3. Technologies Used
4. Front-End Libraries used
5. Back-End libraries used
6. Key Features
7. Credits 
8. Future Improvements 


## Getting Started 

1. Setup Front-End:
   >Creat a .env file with the following variables
   ```
   VITE_SERVER=http://localhost:8000
   ```
   
  
2. Login Credentials 
   - Create own account in Sign Up page or in Django admin
     ![Sign Up](rentorbuy_frontEnd/src/screenshots/SignUp.png)
   - Password should be more than 8 charcater and not be related to the user first name or last name

3. Login at the navigation bar 
   >Login Page
   ![Login Page](rentorbuy_frontEnd/src/screenshots/Login.png)

## How to run application dev environment on Docker

1. Navigate to the root directory on the app (same loc as the docker.yml file is located) 
2. run the following command
   ```
      docker-compose up -d 
   ```
3. Now enter the command shell in the backend container to migrate data from django ORM (Only for first run)
   ```
      pipenv run python3 manage.py migrate
   ```
4.  No other set up required as docker will handle the creation of the database


## API endpoints (11 endpoints consumed)

   - Customer registration | PUT
     ```
     /customer/register/
     ```
   - Customer delete account | DELETE
     ```
     /customer/delete
     ```
  - Customer info | GET
    ```
    /customer/details
    ```
  - Customer edit info | PATCH
    ```
    /customer/editInfo
    ```
  - Customer rental transaction | GET
    ```
    /customer/cars/rental
    ```
  - Customer rental reciept | POST
    ```
    /customer/rental
    ```
 - Customer sale transaction | GET
   ```
   /customer/cars/sales 
   ```
 - Customer sale receipt | POST
   ```
   /customer/carSale 
   ```
 - JWT Authentication
   ```
   /login/token
   ```
 - Dealer get all cars for sales | GET
   ```
   /dealer/cars/forsale
   ```
- Dealer get all cars for rent | GET
  ```
  /dealer/car/rentals
  ```
   

## Technologies Used:
**Front-End**
- React (javascript)
 <br/><br/>

**Back-End**
- Django (Python v3.11)
- Postgresql 

## Front-End Libraries Used: 
1. React Router Dom 
2. TailwindCSS 
3. flowbite-react
4. react-tailwindcss-datepicker
5. jwt-decode
6. dayjs
7. postcss

## Back-End Libraries Used: 
1. psycopg2-binary
2. djangorestframework
3. djangorestframework-simplejwt
4. django-cors-headers

## Key Features:
- CRUD functionality for customer accounts
- If customer deleted an account and customer creates an account again all the customer previous data retained
- Rental and Sales appointment booking systems
![Rental](rentorbuy_frontEnd/src/screenshots/Rentals.png)
- Rentals cannot overlap for a select car
![Booking](rentorbuy_frontEnd/src/screenshots/RentalBooking.png)
- Admin portal for dealer to add post to site automatically and update rental status 


## Current Bugs:
