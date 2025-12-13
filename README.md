# To-Do List CRUD Application

A lightweight and efficient **CRUD (Create, Read, Update, Delete) To-Do List application** built with **Vanilla JavaScript**, leveraging the **Browser LocalStorage API** for persistent client-side data storage.

---

## Overview

This project demonstrates fundamental front-end development concepts, including DOM manipulation, event handling, and client-side data persistence. It is designed as a simple yet scalable foundation for task management applications.

---

## Features

- Create new tasks
- Read and display stored tasks
- Update existing tasks
- Delete tasks
- Persistent storage using LocalStorage
- Automatic state restoration on page reload

---

## Technology Stack

- **HTML5** – Markup structure
- \*\*TAILWINDCSS - Styling
- **JavaScript (ES6+)** – Application logic
- **LocalStorage API** – Client-side persistence

---

## 🧩 CRUD Operations

### Create

Add a new task using the input field and save it to LocalStorage.

### Read

Retrieve and display all saved tasks when the page loads.

### Update

Edit a task using a prompt and update it in LocalStorage.

### Delete

Remove a task permanently from LocalStorage.

## Application Flow

1. User inputs a task
2. Task is stored as an object with a unique ID
3. Data is serialized and saved in LocalStorage
4. Tasks are rendered dynamically in the DOM
5. Any update or deletion is immediately persisted
