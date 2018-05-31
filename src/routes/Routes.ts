import { Router, Request, Response, NextFunction } from 'express'
import PostController from '../controllers/PostController';
import AuthController from '../controllers/AuthController';
import IndexController from '../controllers/IndexController';
import { authenticate } from '../auth/auth';
import MailController from '../controllers/MailController';
import LoginController from '../controllers/auth/LoginController';

class ApiRoutes {
    public router: Router
    private _postController: PostController
    private _authController: AuthController
    private _loginController: LoginController
    private _indexController: IndexController
    private _mailController: MailController
    constructor(){
        this.router = Router()
        this._postController = new PostController()
        this._authController = new AuthController()
        this._loginController = new LoginController()
        this._indexController = new IndexController()
        this._mailController = new MailController()
        this.setRoutes()
    }
    private setRoutes(): void{
        //auth routes
        this.router.post('/api/login', this._loginController.login())
        // this.router.post('/api/register', this.authController.register())
        
        //user routes
        this.router.get('/api/user', authenticate() , (req: Request, res: Response ,next: NextFunction ) => {
            res.json( req.user )
        })

        //posts routes
        this.router.get('/api/posts', this._postController.getAll() )
        this.router.post('/api/post', this._postController.save() )

        //test
        this.router.post('/api/mail', this._mailController.send() )
        //view
        this.router.get('*', this._indexController.show())
    }
}

export default new ApiRoutes().router