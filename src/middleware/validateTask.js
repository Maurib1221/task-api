import { body, param } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';
import * as taskService from '../services/taskService.js';

export const validateTask = [
  body('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be at least 3 and at most 100 characters'),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('completed must be true or false'),



  checkValidationResults,
];

export const validateId = [
  param('id')
    .exists()
    .withMessage('ID parameter is required')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('ID must be a positive integer')
    .bail()
    .custom(async (value) => {
      const task = await taskService.getTaskById(value);
      if (!task) {
        throw new Error(`Task with ID ${value} does not exist`);
      }
      return true;
    }),
  checkValidationResults,
];