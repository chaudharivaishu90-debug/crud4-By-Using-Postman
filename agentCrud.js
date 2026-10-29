const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

const todoArr = [
    {
        userId: "1",
        id: "1",
        title: "delectus aut autem",
        completed: false
    },
    {
        userId: "2",
        id: "2",
        title: "quis ut nam facilis et officia qui",
        completed: false
    },
    {
        userId: "1",
        id: "3",
        title: "fugiat veniam minus",
        completed: false
    },
    {
        userId: "1",
        id: "4",
        title: "et porro tempora",
        completed: true
    },
    {
        userId: "1",
        id: "5",
        title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false
    }
];

const isValidTodo = (todo) => (
    todo &&
    typeof todo.userId === "string" &&
    todo.userId.trim() !== "" &&
    typeof todo.title === "string" &&
    todo.title.trim() !== "" &&
    typeof todo.completed === "boolean"
);

app.get("/api/todoArr", (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            body: todoArr
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            body: null
        });
    }
});

app.get("/api/todoArr/:id", (req, res) => {
    try {
        const todo = todoArr.find((item) => item.id === req.params.id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: `Todo not found with id ${req.params.id}`,
                body: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            body: todo
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            body: null
        });
    }
});

app.post("/api/todoArr", (req, res) => {
    try {
        if (!isValidTodo(req.body)) {
            return res.status(400).json({
                success: false,
                message: "Provide a non-empty userId, a non-empty title, and a boolean completed value",
                body: null
            });
        }

        const nextId = String(
            todoArr.reduce((maxId, todo) => Math.max(maxId, Number(todo.id) || 0), 0) + 1
        );
        const newTodo = {
            userId: req.body.userId.trim(),
            id: nextId,
            title: req.body.title.trim(),
            completed: req.body.completed
        };
        todoArr.push(newTodo);

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            body: newTodo
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            body: null
        });
    }
});

app.put("/api/todoArr/:id", (req, res) => {
    try {
        const todoIndex = todoArr.findIndex((item) => item.id === req.params.id);
        if (todoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Todo not found with id ${req.params.id}`,
                body: null
            });
        }

        if (!isValidTodo(req.body)) {
            return res.status(400).json({
                success: false,
                message: "Provide a non-empty userId, a non-empty title, and a boolean completed value",
                body: null
            });
        }

        const updatedTodo = {
            userId: req.body.userId.trim(),
            id: todoArr[todoIndex].id,
            title: req.body.title.trim(),
            completed: req.body.completed
        };
        todoArr[todoIndex] = updatedTodo;

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            body: updatedTodo
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            body: null
        });
    }
});

app.delete("/api/todoArr/:id", (req, res) => {
    try {
        const todoIndex = todoArr.findIndex((item) => item.id === req.params.id);
        if (todoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Todo not found with id ${req.params.id}`,
                body: null
            });
        }

        const [deletedTodo] = todoArr.splice(todoIndex, 1);
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            body: deletedTodo
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            body: null
        });
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err.status === 400 ? 400 : 500;
    return res.status(statusCode).json({
        success: false,
        message: statusCode === 400 ? "Invalid JSON request body" : "Internal server error",
        body: null
    });
});

app.listen(PORT, () => {
    console.log(`Todo CRUD server is running on port ${PORT}`);
});
