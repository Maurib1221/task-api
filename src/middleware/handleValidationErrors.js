import { validationResult } from 'express-validator';

export function checkValidationResults(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const notFoundError = errors.array().find(err => 
      err.msg.includes('does not exist')
    );
    
    if (notFoundError) {
      return res.status(404).json({
        error: 'Task not found',
        message: notFoundError.msg
      });
    }
    
    return res
      .status(400)
      .json({
        error: 'Validation failed',
        details: errors.array().map((err) => err.msg),
      });
  }
  next();
}
