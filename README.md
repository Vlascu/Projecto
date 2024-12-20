# Projecto
Web portfolio that fetches Github projects.

## Overview
This project consists of a backend server and a frontend Angular application. It allows users to interact with a MongoDB database and requires a GitHub API key to fetch specific data. Below are the instructions to set up and run the project.

---

## Backend: Local Server

### Location
- The backend server is located in the `server` subfolder.

### File
- `server.js` is the main file for running the backend.

### Steps to Run the Backend
1. Navigate to the `server` folder:
   ```bash
   cd Projecto/server
   ```
2. Run the server using Node.js:
   ```bash
   node server.js
   ```

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed.

---

## Database: MongoDB

### Installation Guide
1. Download and install MongoDB Community Edition from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
2. Follow the platform-specific instructions to complete the installation:
   - [Windows Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
   - [macOS Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
   - [Linux Installation](https://www.mongodb.com/docs/manual/administration/install-on-linux/)

### Create and Connect Database
1. Start the MongoDB server:
   ```bash
   mongod
   ```
2. Open a new terminal and connect to MongoDB using the shell:
   ```bash
   mongo
   ```
3. Create a database named `projecto`:
   ```javascript
   use projecto
   ```
4. Add collections or data as needed for testing.

---

## Frontend: Angular Application

### Steps to Run the Frontend
1. Navigate to the project folder containing the Angular application:
   ```bash
   cd Projecto
   ```
2. Serve the application locally:
   ```bash
   ng serve -o
   ```
   This will automatically open the application in your default web browser.

### Prerequisites
- Ensure you have [Angular CLI](https://angular.io/cli) installed:
  ```bash
  npm install -g @angular/cli
  ```

---

## GitHub API Key Configuration

### Location
- In the file `projects.component.ts`, you need to provide your GitHub API key and GitHub link.

### Steps to Configure
1. Open `projects.component.ts` in a code editor.
2. Replace the placeholder with your GitHub API key:
   ```typescript
   const githubApiKey = 'YOUR_GITHUB_API_KEY';
   const githubLink = 'YOUR_GITHUB_PROFILE_LINK';
   ```
3. Save the changes.

**Note:** For security reasons, the GitHub API key is not included in the repository. Each user must use their own credentials.

---

## Additional Notes
- Ensure all dependencies for both the backend and frontend are installed by running `npm install` in their respective directories.
- For issues or troubleshooting, refer to the official documentation for Node.js, MongoDB, or Angular CLI.

