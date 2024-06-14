# Weather Forecasting Web App

This is a repository for a `Weather Forecating Web App`

## Weather App Backend

This is the backend for a weather forecasting web application built using Node.js with Express.js and MySQL. It integrates with the OpenWeather API to provide weather data and forecasts. The backend manages user authentication, location data, weather forecasts, and user feedback.

## Features

- Location management
- Weather data retrieval from OpenWeather API
- Weather forecast retrieval
- User feedback/reporting

## Prerequisites

- Node.js
- MySQL
- Redis
- npm (Node Package Manager)
- OpenWeather API Key

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Bamidele0102/weather-app.git
   cd weather-app-backend

2. Install dependencies:

```bash
    npm install
```

3. Set up environment variables:
Create a .env file in the root directory and add the following:

```bash
    PORT=3000
    JWT_SECRET=your_jwt_secret_here
    OPENWEATHER_API_KEY=your_openweather_api_key_here
```

4. Set up the MySQL database:

- Create a database named weather_app_db.
- Import the provided schema.sql file to create the required tables.
- Update database configuration in `src/config/db.js` if necessary.
- Running the Server
- Start the server using nodemon:

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

## API Endpoints

- You can test the API Endpoints with a tool such as `Thuder Client`, `Postman` or use `Curl`.

### User Routes

### Location Routes

#### Add Location

- `POST /api/locations`
- `Body: { "name": "New York" }`
- `Headers: Authorization: Bearer <token>`

#### Get All Locations

- `GET /api/locations`
- `Headers: Authorization: Bearer <token>`

### Weather Data Routes

#### Get Weather Data

- `GET /api/weather/:location`
- `Headers: Authorization: Bearer <token>`

### Weather Forecast Routes

#### Add Weather Forecast

- `POST /api/forecasts`
- `Body: { "locationId": 1, "forecastDate": "2024-06-01", "temperature": 25, "humidity": 60, "description": "Sunny" }`
- `Headers: Authorization: Bearer <token>`

#### Get Weather Forecasts by Location

- `GET /api/forecasts/:locationId`
- `Headers: Authorization: Bearer <token>`

### Feedback Routes

#### Submit Feedback

- `POST /api/feedback`
- `Body: { "userId": 1, "message": "Great app!" }`
- `Headers: Authorization: Bearer <token>`


## Weather App Frontend
The frontend for this weather app is still a work in progress and will be added soon. Stay tuned for updates on the repository!

## Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/Bamidele0102/weather-app.git
    cd weather-app-frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    Create a .env file in the root directory and add the following:
    ```bash
    REACT_APP_API_BASE_URL=http://localhost:3000/api
    ```
4. Start the development server:
    ```bash
    npm start
    ```
    The app will run on `http://localhost:3000`.

## Features
- Display weather data and forecasts
- User authentication and registration
- Location search and management
- User feedback and reporting

## Technologies Used
- React.js
- Redux
- Axios
- React Router
- Material-UI


Contributions are welcome! Please fork this repository and submit pull requests.

## License

This project is licensed under the [Apache License](./LICENSE). See the LICENSE file for details

## Contact

For any inquiries, please contact me via <a href="mailto:idowu.olayiwola.bamidele@gmail.com">Email</a></p>
