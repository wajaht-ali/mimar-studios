# Mimar Studios

This is a full-stack web application that showcases my expertise in developing web applications using modern web technologies. This project is designed and developed to demonstrates the integration of third-party APIs, 3D object visualization, and a responsive user experience.

## Project Features

### Frontend

- **Frameworks and Libraries**: React + TypeScript
- **Styling**: TailwindCSS for styling and designing
- **Authentication**: Google OAuth for secure login
- **APIs Integration**:
  - Weather API: Displays current weather conditions for specific city.
  - Random Quotes API: Fetches and displays random quotes.
- **Responsiveness**: Optimized for mobile and desktop devices.
- **3D Visualization**: A small interactive 3D cube created using Three.js + WebGL.

### Backend

- **Technologies**: Node.js, Express.js
- **Database**: MongoDB with Mongoose for users data management.
- **Authentication**: Google OAuth library for backend authentication for google auth.
- **API Integration**: Backend handling for third-party API interactions.

## Core Functionalities

1. Full-stack web application demonstrating:
   - Integration of third-party APIs
   - Responsive design and smooth user experience
   - Forgot Password
2. 3D object visualization using Three.js to enhance the interactivity of the application.

## 🛠️ Technologies Used

### Frontend

- React
- React Hook Form
- TailwindCSS
- Context API
- TypeScript
- Google Auth
- Three.js

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- Google Auth Library
- Nodemailer
- JsonWebToken
- Crypto-js

## 📂 Project Structure

```
/mimar-studios
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │    ├── pages
│   │   │    ├── layouts
│   │   │    └── others
│   │   ├── context
│   │   └── styles
├── backend
│   ├── routes
│   ├── models
│   ├── middlewares
│   ├── controllers
│   ├── services
│   └── utils
└── README.md
```

## Project Demo

### Installation

1. Clone the repository:

```bash
https://github.com/wajaht-ali/mimar-studios.git
```

2. Go to the project directory:

```bash
cd mimar-studios
```

3. Install dependencies for both frontend and backend:

```bash
# client
cd client
npm i

# server
cd ../server
npm i
```

4. Configure environment variables:

   - Create `.env` files in both `frontend` and `backend` directories and add keys from `.env.example` file.

5. Start the application:

```bash
# Start frontend
cd client
npm run dev

# Start server
cd ../server
npm start
```

### Usage

- Open your browser and navigate to `http://localhost:5173` for the frontend.
- Ensure the backend is running at `http://localhost:8000`.

## Preview

### Mobile Responsive Design

![Mobile Responsive Screenshot](path-to-screenshot)

### 3D Visualization

![3D Cube Screenshot](path-to-screenshot)


## Contact

- **Email**: [contact.chwajahat@gmail.com](mailto:contact.chwajahat@gmail.com)
- **LinkedIn**: [Wajahat Ali](https://linkedin.com/in/wajhat-ali/)
