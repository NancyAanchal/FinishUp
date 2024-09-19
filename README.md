# 📋 Finish Up

Welcome to **Finish Up**, a cross-platform mobile app built using **React Native** and **Expo**. This app allows users to manage their tasks effortlessly by organizing, tracking, and filtering their to-dos with a smooth user experience.

<div align="center">
  <img src="your_image_url_1" alt="App Screenshot 1" width="200"/>
  <img src="your_image_url_2" alt="App Screenshot 2" width="200"/>
  <img src="your_image_url_3" alt="App Screenshot 3" width="200"/>
  <img src="your_image_url_4" alt="App Screenshot 4" width="200"/>
  <img src="your_image_url_5" alt="App Screenshot 5" width="200"/>
</div>

---

## ✨ Features

- **Login System**: Sync your tasks across multiple devices with secure login.
- **To-do Management**: Add, edit, and manage your tasks with titles, due dates, and descriptions.
- **Categorized To-dos**: Filter your tasks by categories such as 'All', 'Work', 'Personal', and more.
- **Task Editing**: Easily modify task details (title, due date, description) anytime.
- **Calendar Overview**: Visualize your task completion history with a day-wise breakdown.
- **Profile Section**: Track your productivity with a line graph comparing pending and completed tasks.

---

## 🚀 Technologies Used

- **Frontend**: React Native (Expo)
- **Backend**: Node.js with Nodemon
- **Database**: MongoDB
- **Authentication**: Login system to sync tasks across devices

---

## 📱 Screenshots

| Login Screen             | Home screen               | Calendar View            |
|-------------------------|----------------------------|--------------------------|
| ![Login](./screenshots/login.png)  | ![Home Screen](./screenshots/home.png) | ![Calendar](./screenshots/calendar.png) |

|Profile with Graph | Add a task        | Info and Edit page |
|-------------------------|-----------------------------|-------------------------|
| ![Profile Graph](./screenshots/profile.png) | ![Add screen](./screenshots/add.png) | ![Info and edit screen](./screenshots/editscreen.png)  |

---

## 🔧 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
2. **Install dependencies:**
   ```bash
   npm install
3. Run the app:
   ```bash
    npx expo start
4. Start the backend server:
    ```bash
    cd api
    nodemon server.js
    
🗂️ Project Structure
```perl

    
    📂 api
    ├── index.js        # Backend logic
    ├── ...              
    📂 app
    ├── (authenticate)/          
    ├── (tabs)/      
    ├── components/         
    └── index.js            
    └── StartingPage.js
