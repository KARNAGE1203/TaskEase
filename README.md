
# Task Manager Web App

## Overview

The **Task Manager Web App** is a full-stack web application designed to help users track their daily tasks, manage deadlines, and prioritize their to-do list. This app allows users to efficiently manage and monitor their tasks, ensuring they stay on top of important deadlines and priorities.

This project demonstrates full-stack development, incorporating **HTML**, **CSS**, **JavaScript (backend)**, and **MySQL (database)**. Additionally, **Bootstrap** templates are utilized to create a sleek and responsive user interface that works across devices.

## Features

- **Task Management:** Create, update, and delete tasks with titles, descriptions, and priorities.
- **Deadline Tracking:** Set deadlines for each task to keep track of upcoming due dates.
- **Priority Levels:** Assign priority levels to tasks, making it easy to focus on what's most important.
- **User Interface:** Clean and responsive UI powered by **Bootstrap**.
- **Database Integration:** Uses **MySQL** to store tasks, user data, and manage the persistence of tasks across sessions.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - Bootstrap (for UI components and responsiveness)
  - JavaScript (for frontend interactivity)

- **Backend:**
  - Node.js with **Express.js** (to handle server-side logic and routing)
  - **MySQL** (for task data storage and management)

## Installation

### Prerequisites

- **Node.js** (and **npm**)
- **MySQL** (installed locally or through services like MAMP)
- **Git** (optional, for version control)

### Steps

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/task-manager-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd task-manager-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up MySQL database:
   - Create a database named `task_manager` in MySQL.
   - Create a table named `tasks` with columns for task title, description, deadline, and priority.

5. Configure the database connection:
   - Open `server/db.js` and update the database credentials (if needed).

6. Start the Node.js server:
   ```bash
   npm start
   ```

7. Visit the app at `http://localhost:3000` in your browser.

## Usage

- Create new tasks by entering a task name, description, deadline, and priority.
- View tasks in a list format with the ability to sort by priority or deadline.
- Update or delete tasks as necessary.

## Future Enhancements

- User authentication (Login/Signup) to allow multiple users to manage their tasks.
- Task categories or tags for further organization.
- Mobile notifications or email reminders for approaching deadlines.
- Task filtering options (by date, priority, or status).

## License

This project is licensed under the MIT License.
