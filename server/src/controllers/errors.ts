import type { NextFunction, Response, Express } from 'express';

import type { AppRequest } from '../types';

const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR_MESSAGE = 'Okey we messed up';
const STATUS_CODE_TO_MESSAGE: Record<number, string> = {
  400: 'Bad Request',
  [NOT_FOUND_CODE]: 'Not Found',
  409: 'Resource already exists',
  500: INTERNAL_SERVER_ERROR_MESSAGE,
};

class ErrorsController {
  handle(app: Express) {
    app.use(this.errorHandler);
    app.use(this.notFoundHandler);
  }

  private readonly errorHandler = (
    _request: AppRequest,
    response: Response,
    next: NextFunction
  ) => {
    const statusCode = response.statusCode;
    if (
      statusCode === NOT_FOUND_CODE ||
      (statusCode >= 200 && statusCode < 400)
    ) {
      next();
      return;
    }

    const message =
      STATUS_CODE_TO_MESSAGE[statusCode] ?? INTERNAL_SERVER_ERROR_MESSAGE;
    response.status(statusCode).json({
      details: message,
    });
  };

  private readonly notFoundHandler = (
    _request: AppRequest,
    response: Response
  ) => {
    response
      .status(NOT_FOUND_CODE)
      .json({ details: STATUS_CODE_TO_MESSAGE[NOT_FOUND_CODE] });
  };
}

export default ErrorsController;
