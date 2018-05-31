import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as jwt from 'jwt-simple'
import AuthService from '../services/AuthService';


class AuthController{
    private authService : AuthService
    constructor(){
        this.authService = new AuthService()
    }
    public login(): RequestHandler{
        return async ( req: Request, res: Response, next: NextFunction): Promise<Response> => {
            try {
                return res.json( await this.authService.login( req.body.email, req.body.password ) )
            } catch (error) {
                next(error)
            }
        }
    }
    public register(): RequestHandler{
        return async ( req: Request, res: Response, next: NextFunction ): Promise<Response> => {
            try {
                return res.json()
            } catch (error) {
                throw error
            }
        }
    }
}

export default AuthController