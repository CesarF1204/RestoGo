# RestoGo

RestoGo is a simple web application designed to manage a menu of food items. It provides users with essential functionalities to add, view, update, and delete menu items. This README provides an overview of the primary functionalities and how to use them.

## Features
### 1. Login and Register Authentication using JWT
- User authentication with JWT, including personal details such as first name, last name, email, and password.
- Passwords are securely hashed and stored using bcrypt.
- Token-based authentication.

### 2. Add Item
- Users can add new food items to the menu.
- Each item requires specific details such as:
    - Name of the food item
    - Description
    - Meal Category (Breakfast, Lunch, Dinner, or Drinks)
    - Image
    - Price
    - Quantity

### 3. View Items
- Displays a list of all available menu items.
- Shows details such as the name, description, meal category, image, price, and quantity.

### 4. Update Item
- Allows users to modify existing food items.
- Fields that can be updated include:
    - Name
    - Description
    - Meal Category (Breakfast, Lunch, Dinner, or Drinks)
    - Image
    - Price
    - Quantity

### 5. Delete Item
- Enables users to remove a food item from the menu.
- Ensures data integrity by confirming the action before deletion.

### *Both frontend and backend has validations to ensure secure and valid data input.*

## Technology Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT) and bcrypt
- **Cloud Storage**: Cloudinary (for image uploading)
- **File Handling**: Multer (for file uploads)

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- Cloudinary Account (for uploading images to the cloud)

## Steps to Run Locally
### 1. Clone this repository:
```
git clone https://github.com/CesarF1204/RestoGo.git
```
### 2. Set up the Backend and create your own .env file:
```
cd RestoGo
cd web-backend
touch .env
```
### 3. Add your own keys in the following format:
```
PORT=
FRONTEND_URL=
MONGO_URI=

# JWT Variables
JWT_SECRET=

# Cloudinary Variables
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
*Create an account to https://cloudinary.com/ and get the cloudinary api keys.*
### 4. Install dependencies and start the server:
```
npm install
npm run dev
```
### 5. Set up the Frontend and create your own .env file:
```
cd .. 
cd web-frontend
touch .env
```
### 6. Add your own keys in the following format:
```
VITE_API_BASE_URL=
```
### 7. Install dependencies and start the development server:
```
npm install
npm run dev
```

### 8. You may now go to your browser and enter url:
```
http://localhost:5173/
```
Enjoy working with the RestoGo!