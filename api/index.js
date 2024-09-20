require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const moment = require("moment");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log("server is running on port 3000");
});

const User = require("./models/user");
const Todo = require("./models/todo");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("email already registered");
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      await newUser.save();
      res.status(202).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log("registration failed", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    if (user.password != password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log("login failed", error);
    res.status(500).json({ message: "Login faield" });
  }
});

app.post("/:userId/logout", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    res.status(200).json({ message: `User ${userId} logged out successfully` });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
});

app.post("/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(403).json({ message: "User ID missing" });
    }
    const { title, category, description, dueDate } = req.body;

    const newTodo = new Todo({
      title,
      category,
      description,
      createdAt: moment().format("YYYY-MM-DD"),
      dueDate: dueDate,
    });

    await newTodo.save();

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    user?.todos.push(newTodo._id);
    await user.save();

    res.status(200).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    res.status(200).json({ message: "Todo not added", error: error.message });
  }
});

app.get("/users/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(403).json({ message: "User ID missing" });
    }
    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ error: "something went wrong", error });
  }
});

app.patch("/todos/:todoId/complete", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status: "completed",
      },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Todo marked as complete", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "sth went wrong", error });
  }
});

app.patch("/todos/:todoId/update", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const update = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, update, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating todo", error: error.message });
  }
});

app.delete("/todos/:todoId/delete", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (deletedTodo) {
      res.status(204).json({ message: "Todo deleted successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting the todo", error });
  }
});

app.get("/:userId/todos/completed/:date", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const user = await User.findById(userId).populate("todos");
    const date = req.params.date;
    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    // Filter the completed todos by status and createdAt date range
    const completedTodos = user.todos.filter((todo) => {
      return (
        todo.status === "completed" &&
        new Date(todo.createdAt) >= startOfDay &&
        new Date(todo.createdAt) <= endOfDay
      );
    });

    res.status(200).json({ completedTodos });
  } catch (error) {
    res.status(500).json({ error: "sth went wrong", error });
  }
});

app.get("/:userId/todos/count", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }
    const user = await User.findById(userId).populate("todos");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter todos based on their status
    const totalCompletedTodos = user.todos.filter(
      (todo) => todo.status === "completed"
    ).length;
    const totalPendingTodos = user.todos.filter(
      (todo) => todo.status === "pending"
    ).length;

    res.status(200).json({ totalCompletedTodos, totalPendingTodos });
  } catch (error) {
    res.status(500).json({ error: "Network error", error });
  }
});
