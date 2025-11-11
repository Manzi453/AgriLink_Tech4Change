# AgriLink – Tech4Change

AgriLink is a platform designed to connect farmers with buyers, enabling direct product listing, viewing, and agricultural transactions. The project is organized into two main components: a React-based frontend and a Spring Boot/Java + PostgreSQL backend.

## Table of Contents

- About
- Features
- Technologies Used
- Getting Started (Frontend & Backend)
- Usage
- Live Demo
- Contribution Guidelines
- License
- Contact

## About

AgriLink empowers farmers by providing a digital marketplace where they can market their produce, access buyers directly, and manage transactions efficiently. The platform helps increase profits and transparency by removing unnecessary intermediaries.

## Features

- Farmer product listing and management
- Buyer product browsing, searching, and ordering
- Direct farmer-to-buyer messaging and negotiation
- Admin dashboard with platform oversight
- Secure user authentication and role management
- Order processing and status tracking
- Responsive UI for web/mobile

## Technologies Used

- **Frontend:** JavaScript, React, HTML, CSS
- **Backend:** Java (Spring Boot), PostgreSQL
- **Deployment:** Netlify (frontend), suitable cloud/on-premise service for backend
- **Other:** REST APIs for communication, (List payment/messaging APIs if integrated)

## Getting Started

### Frontend (React)

1. **Clone the frontend repo**

    ```
    git clone https://github.com/Manzi453/AgriLink_Tech4Change.git
    cd AgriLink_Tech4Change/frontend
    ```

2. **Install dependencies**

    ```
    npm install
    ```

3. **Start the frontend server**

    ```
    npm start
    ```

### Backend (Spring Boot & PostgreSQL)

1. **Clone the backend repo**

   - If your backend resides in a subfolder, go to that directory.

2. **Configure PostgreSQL database**

   - Create a PostgreSQL database and user.
   - Set credentials in the `application.properties` or `application.yml` file:

    ```
    spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
    spring.datasource.username=your_db_user
    spring.datasource.password=your_db_password
    ```

3. **Install Java and Maven**
   - Ensure Java (JDK >= 11) and Maven are installed on your system.

4. **Run backend setup and migrations**

- The backend will be available at `http://localhost:8080` (default).

5. **Update frontend API endpoints**
- Make sure the frontend fetches data from your backend’s correct address.

## Usage

- Register or manage accounts as a farmer, buyer, or admin.
- Farmers create listings, manage orders, and interact with buyers.
- Buyers search, view, and order products.
- Admins oversee the platform and moderate content.
- Visit the live deployment for the frontend:  
[https://agri-linkk.netlify.app/](https://agri-linkk.netlify.app/)

## Live Demo

- Frontend: [https://agri-linkk.netlify.app/](https://agri-linkk.netlify.app/)
- Backend: (deploy and insert URL if public)

## Contribution Guidelines

- Fork this repo and use feature branches for your changes.
- Commit with detailed messages.
- Open a pull request for code review.

## License

Distributed under the MIT License. See the LICENSE file for details.

## Contact

Maintained by [Manzi453](https://github.com/Manzi453). Open an issue for support or feature requests.

---

*Empowering farmers. Connecting communities. Transforming agriculture!*

