import express from 'express';
import { logErrors, boomErrorHandler, errorHandler } from '../middlewares/errorHandler';


const router = express.Router();


router.get('/',
    async(_req, res, next) => {
        try{
            const Auth = _req.headers.authorization;
            if (Auth) {
            //res.json(await /*get person role */);
            //apply logic once authorization is OK

            }
        } catch(err){
            res.status(401).send({"Message": "You're Not Authorized!"});
            next(err)
        }
    }
)

/*router.get('/:id',
async(req, res, next) => {
    try {
        const id = Number( req.params.id);

    }
}


)*/