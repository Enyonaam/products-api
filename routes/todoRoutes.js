const express = require('express');

const {
    createTodoController,
    getAllTodosController,
    getTodoByIdController,
    updateTodoController,
    deleteTodoController
} = require('../controllers/todoController');

const router = express.Router();

router.post('/', createTodoController);

router.get('/', getAllTodosController);

router.get('/:id', getTodoByIdController);

router.put('/:id', updateTodoController);

router.delete('/:id', deleteTodoController);

module.exports = router;