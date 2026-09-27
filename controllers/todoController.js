const {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} = require('../models/todoModel');

const createTodoController = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: 'Title is required'
            });
        }

        const result = await createTodo(title, description);

        res.status(201).json({
            message: 'Todo created successfully',
            todo: {
                id: result.insertId,
                title,
                description,
                completed: false
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to create todo',
            error: error.message
        });
    }
};

const getAllTodosController = async (req, res) => {
    try {
        const todos = await getAllTodos();

        res.status(200).json(todos);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to get todos',
            error: error.message
        });
    }
};

const getTodoByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await getTodoById(id);

        if (!todo) {
            return res.status(404).json({
                message: 'Todo not found'
            });
        }

        res.status(200).json(todo);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to get todo',
            error: error.message
        });
    }
};

const updateTodoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const todo = await getTodoById(id);

        if (!todo) {
            return res.status(404).json({
                message: 'Todo not found'
            });
        }

        await updateTodo(
            id,
            title,
            description,
            completed
        );

        res.status(200).json({
            message: 'Todo updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to update todo',
            error: error.message
        });
    }
};

const deleteTodoController = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await getTodoById(id);

        if (!todo) {
            return res.status(404).json({
                message: 'Todo not found'
            });
        }

        await deleteTodo(id);

        res.status(200).json({
            message: 'Todo deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete todo',
            error: error.message
        });
    }
};

module.exports = {
    createTodoController,
    getAllTodosController,
    getTodoByIdController,
    updateTodoController,
    deleteTodoController
};
