# Employee-Tracker

Employee Tracker is a command-line application that allows you to manage your company's departments, roles, and employees efficiently.

[Walkthrough Video](https://www.youtube.com/watch?v=PzMjEP_VmIk)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles
- View employees by manager
- Delete departments, roles, and employees

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MahmoudAhmed0528/Employee-Tracker.git
   ```

2. Navigate to the project directory:
   cd employee-tracker

3. Install dependencies:
   npm install

4. Set up your MySQL database. You can use the provided schema.sql and seed.sql files
   mysql -u your-username -p < schema.sql
   mysql -u your-username -p < seed.sql

5. Configure the database connection in the server.js file
   const db = mysql.createPool({
   host: "your-host",
   user: "your-username",
   password: "your-password",
   database: "employee_tracker_db",
   multipleStatements: true,
   });

## Usage

Run the application with the following command:
npm start
Follow the on-screen prompts to interact with the Employee Tracker.

## Contributing

Contributions to this project are welcome. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License
