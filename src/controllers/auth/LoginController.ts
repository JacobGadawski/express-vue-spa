import { Request, Response, NextFunction, RequestHandler } from 'express';
import AuthService from '../../services/AuthService';

class LoginController{
    private _authService : AuthService
    constructor(){
        this._authService = new AuthService()
    }
    login() : RequestHandler {
        return async ( req: Request, res: Response, next: NextFunction ): Promise<Response> =>{
            try {
                return res.json( await this._authService.login( req.body.email, req.body.password ) )
            } catch (error) {
                next(error)
            }
        }
    }
}
export default LoginController