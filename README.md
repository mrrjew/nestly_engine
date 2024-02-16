# NESTLY Apartment Renting Website

NESTLY is a full-stack apartment renting website built using NestJS, Apollo Server, React, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

NESTLY is a comprehensive solution for renting apartments. It provides users with a platform to search for apartments based on various criteria, book apartments for specific dates, and manage their bookings. The website also includes features for user authentication and authorization, as well as support for various payment methods.

## Features

- **Apartment Search**: Users can search for apartments based on location, price, size, amenities, and other criteria.
- **Booking System**: Users can book apartments for specific dates and manage their bookings through the website.
- **User Authentication**: Secure user authentication and authorization system to protect user data and restrict access to certain features.
- **Payment Integration**: Support for various payment methods to confirm apartment bookings securely.
- **Admin Dashboard**: An admin dashboard to manage apartments, bookings, users, and other aspects of the system.

## Project Structure

The project follows a modular architecture with separate directories for the client-side (React) and server-side (NestJS) code:

- **[client](client/README.md)**: Contains the client-side codebase built with React.
- **[engine](engine/README.md)**: Contains the server-side codebase built with NestJS and Apollo Server.
- **shared**: Contains shared code, utilities, and GraphQL schema definitions used by both client and server.

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- npm or Yarn
- MongoDB (or any other supported database)

### Installation

1. Clone the repository:

`git clone https://github.com/jewtechx/nestly.git`

2. Navigate to the project directory:

`cd nestly`

3. Install dependencies for both the client and server:

```bash
  cd client
  npm install
  cd ../engine
  npm install
```

### Configuration

1. Create a .env file in the engine directory.

2. Add the following environment variables to the .env file:

```bash
NODE_ENV=development
PORT=8000
DEV_MONGO_URI=
TEST_MONGO_URI=
PROD_MONGO_URI=
JWT_SECRET=
TOKEN_EXPIRY=
LOGGER_LEVEL=
DEV_MAIL_USER=
DEV_MAIL_PASS=
DEV_MAIL_HOST=
DEV_MAIL_PORT=
DEV_MAIL_SECURE=

MAIL_USER=
MAIL_PASS=
MAIL_HOST=
MAIL_PORT=
MAIL_SECURE=
```

### Usage

Start both server by running 

```bash
npm run app
```

in root directory

### Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve NESTLY.

### License

This project is licensed under the MIT License.

### Author

Jew Kofi Larbi Danquah
