# Project Manager and Bug Tracker

A fullstack application that allows users to create projects, and manage them through adding tickets and comments.

Technologies used:

- React
- Redux
- Express
- NodeJS
- Mongodb
- Mongoose
- TailwindCSS

## Features and Information

Custom user authentication was implemented using JSON web tokens, and Redux was used to manage the global state of the application. A user can signin or signout, and fetch their respective projects, tickets and comments accordingly.

The backend stores user credentials, hashes passwords, and is responsible for handling tokens. This is achieved through a piece of middleware that catches all HTTP requests to the express server and authorises a user by by decoding the token to retrieve the user ID, and checking that against the database. This is the holy grail of the application and what allows us to fetch and retrieve individual user information.

The state of the application (frontend) is managed through Redux and the frontend is able to fetch information through a service that is invoked when an action is dispatched. These requests are made through axios that hit the /api/xyz endpoint.

## Get up and running

1. Clone the repository or download the zip file.
2. Run npm install on the root directory to install any packages.
3. Create a MongoDB account, and set up MongoDB Cloud with the database. Follow [this guide](https://www.mongodb.com/docs/atlas/getting-started/) to do so.
4. An optional step, install MongoDB Compass, a desktop app to monitor your database. Connect via the connection string generated through MongoDB cloud.
5. Create a .env file that contains your port number, MONGO_URI and JWT secret.
6. Change directory to the client by doing cd/client.
7. Run npm install to install any packages.
8. Run npm run dev to start the client and server, register a user to populate the database.

## To Do

- Implement ChartJS to display ticket priority.
- Alter the styling because design isn't my passion and is a pain to do.
- Implement RTK Query data fetching api to remove the need for thunks and reducers.
- Depending on how ambitious I am, might try and port it to NextJS for some fun.
