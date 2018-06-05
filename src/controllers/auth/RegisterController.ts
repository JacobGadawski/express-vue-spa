import { Request, Response, NextFunction, RequestHandler } from 'express';
import AuthService from '../../services/AuthService';

class RegisterController{
    private _authService: AuthService
    constructor(){
        this._authService = new AuthService()
    }
    public register(): RequestHandler{
        return async ( req: Request, res: Response, next: NextFunction ): Promise<Response> => {
            try {
                return res.json( await this._authService.register( req.body.name, req.body.email, req.body.password ) )
            } catch (error) {
                throw new Error(error)
            }
        }
    }

}

export default RegisterController