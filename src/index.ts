import express from 'express';
import itemsRouter from './routes/items'
import { connectPostgreSQL } from '../libs/dbConnection';

import { logErrors, boomErrorHandler, errorHandler } from './middlewares/errorHandler';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());
const PORT = 3000;
const HOST = (process.env.HOST as string) || 'localhost';


app.use('/items', itemsRouter);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// app.listen(PORT)

app.listen(PORT, HOST, async () => {
    try {
        //connect to postgreSQL database
        await connectPostgreSQL();
    } catch (error) {
        console.log(error);
        console.log(
            "Error al conectar a la Base de Datos. Verifique la conexión y las credenciales.",
        );
    }
    console.log(`Server listing at http://${HOST}:${PORT}`);
});

