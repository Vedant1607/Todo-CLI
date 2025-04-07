# 📝 Todo CLI App

A simple Node.js command-line interface (CLI) tool for managing a to-do list using a local `data.json` file.

---

## 📦 Features

- Add a new todo
- Delete a todo by ID
- Update a todo by ID
- Print all todos

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone "https://github.com/Vedant1607/Todo-CLI.git"
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `data.json` file

Make sure a `data.json` file exists in your project directory with the following initial content:

```json
[]
```

---

## 🔧 Usage

Use the CLI with the following commands:

### ➕ Add a Todo

```bash
node index.js add "Buy groceries"
```

### ❌ Delete a Todo

```bash
node index.js delete <id>
```

### ✏️ Update a Todo

```bash
node index.js update <id> "Go to the gym"
```

### 📋 Print Todos

```bash
node index.js print
```

---

## 📁 Project Structure

```
.
├── data.json         # Stores todo items
├── index.js          # Main CLI logic
├── package.json
└── README.md
```

---

## 📌 Example

```bash
$ node index.js add "Finish homework"
Added: [0] Finish homework

$ node index.js print
Your Todos
-------------
ID:0 -> Finish homework
```

---

## ⚠️ Notes

- Make sure `data.json` is in valid JSON format.
- Todos are stored with an auto-incrementing `id`.

---

## 📃 License

This project is licensed under the MIT License.
