import { HttpException, HttpStatus } from '@nestjs/common';

export const successResponse = (message: string, data: any = undefined) => ({
    success: true,
    message,
    data,
});

export const errorResponse = (
    message: string,
    error: any = null,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
) => {
    throw new HttpException(
        {
            success: false,
            message,
            error,
        },
        statusCode,
    );
};