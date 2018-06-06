import { Request, Response, NextFunction, RequestHandler } from 'express';
import appConfig from '../config/app'

class IndexController{
    show() : RequestHandler{
        return ( req: Request, res: Response, next: NextFunction  ) =>{
                res.render('index', {
                    config : JSON.stringify(appConfig)
                })
        }
    }
}

export default IndexController