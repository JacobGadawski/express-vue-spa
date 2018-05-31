import { Request, Response, NextFunction, RequestHandler } from 'express';


class IndexController{
    show() : RequestHandler{
        return ( req: Request, res: Response, next: NextFunction  ) =>{
                res.render('index', {
                    config : JSON.stringify( {"appName":"ExpressVue","locale":"en","locales":{"en":"EN","zh-CN":"中文","es":"ES"},"githubAuth":null} )
                })
        }
    }
}

export default IndexController