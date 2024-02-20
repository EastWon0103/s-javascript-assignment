import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../../util/error/applicationError';
import { GlobalResponse, IGlobalResponse } from '../../util/response/globalResponse';

const errorHandler = (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const errorResponse: IGlobalResponse = new GlobalResponse({
        success: false,
        status: err.status,
        message: err.message,
    });
    res.status(err.status).json(errorResponse);
};

export { errorHandler };
