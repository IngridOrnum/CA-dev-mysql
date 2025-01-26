# ca-dev-mysql

## Description
A Node.js API built with Express and MySQL designed to manage artist and album data. This API allows users to create artist profiles and albums associated with each artist. All data can be viewed on the homepage of the associated frontend application.

## Features
- Create artist profiles.
- Add albums to specific artists.
- View all artists and albums on the homepage.
- Environment variables managed through `dotenv`.
- Real-time development feedback with `nodemon`.
- Integrated Tailwind CSS for frontend styling needs.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (version 14 or above recommended)
- MySQL (version 8.0 or above recommended)
- A MySQL user with necessary permissions for the project

## Installation
Clone the repository:
git clone https://github.com/IngridOrnum/CA-dev-mysql.git
cd CA-dev-mysql

## Configuration
Create a .env file in the root directory of the project and update the following environment variables according to your setup:
DB_HOST=localhost
DB_USER=myUser
DB_PASS=myPassword
DB_NAME=myDatabase
PORT=3000

## Running the API
To start the server in development mode with live reloading:
- npm run dev

To start the server in production mode:
- npm start
