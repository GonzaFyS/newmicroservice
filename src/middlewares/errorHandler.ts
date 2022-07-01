export const logErrors = (err: any, _req: any, _res: any, next:any) => {
    console.error(err);
    next(err);
}

export const errorHandler = (err: any, _req: any, res: any, next:any) => {
    res.status(500).json({
        message: err.message,
        error: err.stack
    });
    next();
}

export const boomErrorHandler = (err: any, _req: any, res: any, next:any) => {
    if(err.isBoom){
        const { output } = err;
        res.status(output.statusCode).json({
            message: output.payload.message,
            error: output.payload.error
        });
        next()
    }else {
        next(err);
    }
}