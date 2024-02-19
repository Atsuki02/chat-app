# Real-Time Chat Application

This project is a cutting-edge, real-time chat application that facilitates both group and direct messaging. Leveraged by the power of WebSocket through Socket.IO, it offers an instantaneous communication experience. It's designed with a modern tech stack, ensuring a responsive and intuitive user interface, seamless state management, and robust backend services.

## Frontend Technologies

- **React (v18.2.0):** 
- **Redux Toolkit (v2.1.0):** 
- **Tailwind CSS (v3.4.1):**
- **TypeScript (v5.2.2):** 
- **Vite (v5.0.8):**
- **Socket.IO Client (v4.7.4):**

## Backend Technologies

- **@prisma/client (v5.9.1):**
- **Express (v4.18.2):**
- **Socket.IO (v4.7.4):**
- **TypeScript (v5.3.3):**

## Key Features

- **Group Chat Creation:** Allows users to create dynamic group chats.
- **Real-Time Messaging:** Utilizes Socket.IO for instantaneous communication.
- **Direct Messaging:** Supports one-on-one conversations.
- **Authentication & Authorization:** Secures the application and protects user data.
- **Session Management:** Automatically deletes sessions after 24 hours of inactivity and marks users as offline.
- **Activity Tracking:** Monitors and records user activity.
- **MVC Architecture:** Organizes backend logic into models, views, and controllers for clarity and scalability.
- **Theme Support:** Offers light and dark mode to accommodate user preferences.
- **Responsive Design:** Ensures a seamless experience across various mobile devices.
- **Development Tools:** Implements Git hooks and GitHub Actions for streamlined code testing and integration.

## Current Limitations & Proposed Enhancements

### Limitations:

- **API Service Layer:** Encountered challenges with cache invalidation across different instances created by `createAPI`. Temporary solution involved merging queries within the same instance, though a segregated approach per feature is ideal.

### Enhancements:

- **Read Receipts:** Implement functionality to track when messages are read.
- **Notifications:** Develop a notification system for new messages.
- **Search Functionality:** Introduce search capabilities within chat, friends, and message lists.
- **Group Management:** Enable the removal of participants from group chats.
- **Invitations:** Facilitate the process of inviting additional members to chats.
- **Code Refactoring:** Continuous improvement of codebase for efficiency and maintainability.

