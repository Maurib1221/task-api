import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { validateTask, validateId } from '../middleware/validateTask.js';

const router = express.Router();

router.get('/', taskController.getTasks);
router.get('/:id', validateId, taskController.getTaskById);
router.post('/', validateTask, taskController.createTask);

export default router;
