# Mobile SHOP Backend

## Project Description

The **Mobile SHOP Backend** is an online e-commerce for selling Latest Mobiles. It includes user authentication, mobile listing, order management, and secure API endpoints. The backend is built with **Express** and **TypeScript** to ensure type safety, maintainability, and scalability. Key features include user management, JWT authentication, and role-based access control.

## Live URLs

- **Backend**: [Mobile Shop Backend](https://mobile-shop-backend-seven.vercel.app/)
- **Frontend**: [Mobile Shop Frontend](https://mobile-shop-frontend-gamma.vercel.app/)

## Technology Stack

- **Node.js**: JavaScript runtime for server-side code.
- **Express.js**: Minimalist web framework for building APIs.
- **TypeScript**: Static typing for JavaScript to catch errors at compile time.
- **MongoDB**: NoSQL database for scalable data storage.
- **JWT**: JSON Web Tokens for secure authentication.
- **Zod**: Schema validation for request validation.

## Features

- **Database Integration**: Use **MongoDB** for storing users, mobiles, and orders.
- **User Authentication**: Secure login, registration, and password hashing using `bcrypt`.
- **JWT Authorization**: Protect routes using JWT-based authentication.
- **Mobile Management**: Add, edit, and delete Mobiles.
- **Order Management**: Track order status from pending to delivered.
- **Validation**: Input validation using **Zod** schema.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MAHossain1/mobile-shop-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mobile-shop-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run start:dev
   ```
