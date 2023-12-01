import { Router } from 'express';
import db from '../db';

// todosRouter
const router = Router();

// GET /api/todos/123
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const [todo] = await db.todos.getOne(id);
        res.json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// GET /api/todos/
router.get('/', async (req, res) => {
    try {
        const todos = await db.todos.getAll();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// POST /api/todos/
// { description: string }
router.post('/', async (req, res) => {
    try {
        const newTodo = req.body;
        const result = await db.todos.insert(newTodo.description);
        res.json({ message: 'Todo created', id: result.insertId })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

export default router;