import { Request, Response, NextFunction, RequestHandler } from 'express';
import appConfig from '../config/app'

class AdminController{
    show() : RequestHandler{
        return ( req: Request, res: Response, next: NextFunction  ) =>{
                res.render('admin', {
                    config : JSON.stringify(appConfig)
                })
        }
    }
}

export default AdminController