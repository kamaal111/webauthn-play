import type {NextFunction, Response, Express} from 'express';

import type {AppRequest} from '../types';

const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR_MESSAGE = 'Okey we messed up';
const STATUS_CODE_TO_MESSAGE: {[code: number]: string} = {
  400: 'Bad Request',
  [NOT_FOUND_CODE]: 'Not Found',
  500: INTERNAL_SERVER_ERROR_MESSAGE,
};

class ErrorsController {
  constructor() {}

  handle(app: Express) {
    app.use(this.errorHandler);
    app.use(this.notFoundHandler);
  }

  private errorHandler(
    _request: AppRequest,
    response: Response,
    next: NextFunction
  ) {
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
  }

  private notFoundHandler(_request: AppRequest, response: Response) {
    response
      .status(NOT_FOUND_CODE)
      .json({details: STATUS_CODE_TO_MESSAGE[NOT_FOUND_CODE]});
  }
}

export default ErrorsController;
