const db = require('../config/db');

const createTodo = async (title, description) => {
    const [result] = await db.query(
        `INSERT INTO todos (title, description)
         VALUES (?, ?)`,
        [title, description]
    );

    return result;
};

const getAllTodos = async () => {
    const [rows] = await db.query(
        'SELECT * FROM todos ORDER BY created_at DESC'
    );

    return rows;
};

const getTodoById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM todos WHERE id = ?',
        [id]
    );

    return rows[0];
};

const updateTodo = async (id, title, description, completed) => {
    const [result] = await db.query(
        `UPDATE todos
         SET title = ?, description = ?, completed = ?
         WHERE id = ?`,
        [title, description, completed, id]
    );

    return result;
};

const deleteTodo = async (id) => {
    const [result] = await db.query(
        'DELETE FROM todos WHERE id = ?',
        [id]
    );

    return result;
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};