# SYNERGIA EVENT HANDLING

A RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** to manage event bookings.

This project implements full **CRUD** (Create, Read, Update, Delete) functionality, validates incoming data, and provides endpoints for searching by email and filtering by event.

---

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js & npm:** Download from [nodejs.org](https://nodejs.org/).
* **Git:** Download from [git-scm.com](https://git-scm.com/).
* **MongoDB:** You must have a MongoDB database. You can:
    * Install it locally on your machine.
    * Use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended, has a free tier).

---

## 🔧 Installation

Follow these steps to get your development environment set up.

1.  **Clone the Repository**
    Open your terminal and run the following command:

    ```bash
    git clone [https://github.com/NishitSK/syng.git](https://github.com/NishitSK/syng.git)
    ```

2.  **Navigate to the Project Directory**

    ```bash
    cd syngmongo
    ```

3.  **Install Dependencies**
    This command will read the `package.json` file and install all required packages (like `express`, `mongoose`, `dotenv`, etc.).

    ```bash
    npm install
    ```

4.  **Set Up Environment Variables**
    This project uses a `.env` file to store your MongoDB connection string securely.

    * In the root of the project, create a new file named `.env`
    * Open this new `.env` file and add the following line, replacing the placeholder with your actual MongoDB connection string:

    ```env
    # Get your connection string from MongoDB Atlas or your local setup
    MONGO_URI="mongodb+srv://<your_username>:<your_password>@cluster0.xxxxx.mongodb.net/myBookingDatabase?retryWrites=true&w=majority"
    
    # The port your server will run on
    PORT=5000
    ```

    > **🔒 SECURITY NOTE:** The `.gitignore` file in this project should be set up to ignore `.env`. This ensures you **never** accidentally commit your database credentials to GitHub.

---

## 🏃‍♀️ Running the Application

Once your dependencies are installed and your `.env` file is ready, you can start the server.

* **For production:**
    ```bash
    npm start
    ```
* **For development (if `nodemon` is configured in `package.json`):**
    ```bash
    npm run dev
    ```

Your API will now be running on `http://localhost:5000` (or whatever port you specified in your `.env` file).

---

## 📖 API Endpoints

The base URL for all endpoints is `/api/bookings`.

### Core CRUD Operations

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get all bookings |
| `POST` | `/` | Create a new booking |
| `GET` | `/:id` | Get a single booking by its ID |
| `PUT` | `/:id` | Update a booking by its ID |
| `DELETE` | `/:id` | Delete a booking by its ID |

### Search & Filter

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/search?email=xyz@test.com` | Search booking by email |
| `GET` | `/filter?event=Synergia` | Filter bookings by event |

---

## 📦 Data Model

### Booking Schema

The `Booking` model has the following schema. `name`, `email`, and `event` are required fields.

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: String, required: true },
  ticketType: { type: String },
  createdAt: { type: Date, default: Date.now }
}
