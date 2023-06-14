# Nest Egg Challenge

## Overview

This project is a Car Rental API developed with Node.js, Express, and SQLite. The API provides the ability to manage a fleet of cars, handle car rentals, and manage users. The goal of this project was to complete the REST API functionality (including validating inputs), to write an analytics middleware that outputs request duration, and to make the port configurable by the user.

## API Endpoints

To the existing endpoints, I have added the following:

- **GET /rents**: Retrieve all rents.
- **POST /rents**: Start a new rent. Requires a body with `car_id`, `user_id` and `rented_at` properties.
- **PUT /rents/:id**: End an existing rent. Requires a body with `new_milage` and `returned_at` properties.

The milage data is stored in a new column in the `rents` table which is titled `milage_done`. I have also added an auto-incremented `id` column to the `rents` table.

## Setup Instructions

### Installation Instructions

1. Clone or extract the repository to your local machine.
2. Navigate into the project directory.
3. Run `npm install` to install all necessary dependencies.
4. Follow the instructions provided in the Database Setup section of this README to set up your SQLite database.

### Database Creation and Seeding

To create and seed the database, follow these steps:

1. Delete the existing database if it already exists:

   ```
   rm database/db.sqlite
   ```

2. Change your current directory to the database directory:

   ```
   cd database
   ```

3. Run the following command to create and seed the database:
   ```
   sqlite3 db.sqlite < ddl.sql
   ```

This will create the necessary tables and seed them with some initial data for cars, users, and completed rents.

### Starting the Server

After setting up the database, you can start the server by returning to the root directory and using the `npm start` command:

```bash
cd ..
npm start
```

By default, the server will start on port 3000. If you wish to specify a different port, you can do so by setting the PORT environment variable before starting the server. For example, to start the server on port 5000, you could use the following command:

```bash
PORT=5000 npm start
```

## Potential Improvements

Here are some potential improvements for the project:

1. **Authentication and Authorization**: To ensure that only authorized users can perform certain operations, we could add authentication and authorization. This could be done using JWT (JSON Web Tokens) or OAuth.

2. **Error handling**: We could improve how errors are handled and returned to the user. For example, we could return more descriptive error messages and use appropriate HTTP status codes.

3. **Logging**: We could add more logging to help with debugging and understanding how the API is used.

4. **Testing**: Although the API has been manually tested using Insomnia, automated tests could have been written using testing frameworks such as Jest or Mocha.

5. **Endpoints**: Additional endpoints could have been included to give the API complete CRUD functionality.
