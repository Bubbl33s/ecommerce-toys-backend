# 🧸 Ecommerce Toy Backend

This is the backend service for the Ecommerce Toy application. It provides APIs for managing products, orders, users, admin functionalities, and other functionalities required for the ecommerce platform.

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ecommerce-toy-backend.git
```

2. Navigate to the project directory:

```bash
cd ecommerce-toy-backend
```

3. Install dependencies:

```bash
npm install
```

## 💻️ Local Usage

1. Start the development server:

```bash
npm run dev
```

2. Or build with:

```bash
npm start
```

3. The server will be running at `http://localhost:9090`.

## 📓 API Endpoints Docs

You can find the full API documentation [here](https://ecommerce-toys-backend.onrender.com/api/docs/).

## ✨ Features

### 🔑 Authentication

- User registration and login
- Password hashing and verification
- JWT token generation and validation

### 🛡️ Authorization by Roles

- Role-based access control
- Middleware to protect routes based on user roles
- Admin and user roles with different permissions

### 📦 Payment Gateway

- Integration with Mercado Pago
- Payment confirmation

### 📧 Notifications

- Email notifications for order confirmations
- Email for account verification

### 📷 Image Upload

- Upload product images
- Upload user profile pictures
- Image storage and retrieval

## 🛠️ Development Technologies

### Backend

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **PostgreSQL**: Powerful, open-source object-relational database system.

### Documentation

- **Swagger**: Tool for designing and documenting APIs.

### Deployment

- **Render**: Web service deployment.

### Code Quality

- **Prettier**: Code formatter to ensure consistent style.
- **Husky**: Git hooks to automate tasks.
- **Commitlint**: Lint commit messages.
- **ESLint (Airbnb)**: Pluggable linting utility for JavaScript and JSX.
- **EditorConfig**: Maintain consistent coding styles between different editors and IDEs.

## 🧖 Author

Valeria Lozano _a.k.a._ **Bubbl33s**

- [GitHub](https://www.your-site.com)
- [Codepen](https://codepen.io/Bubbl33s)
