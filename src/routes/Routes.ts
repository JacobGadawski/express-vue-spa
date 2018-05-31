import { Router, Request, Response, NextFunction } from 'express'
import PostController from '../controllers/PostController';
import AuthController from '../controllers/AuthController';
import IndexController from '../controllers/IndexController';
import { authenticate } from '../auth/auth';
import MailController from '../controllers/MailController';

class ApiRoutes {
    public router: Router
    private postController: PostController
    private authController: AuthController
    private indexController: IndexController
    private mailController: MailController
    constructor(){
        this.router = Router()
        this.postController = new PostController()
        this.authController = new AuthController()
        this.indexController = new IndexController()
        this.mailController = new MailController()
        this.setRoutes()
    }
    private setRoutes(): void{
        //auth routes
        this.router.post('/api/login', this.authController.login())
        // this.router.post('/api/register', this.authController.register())
        
        //user routes
        this.router.get('/api/user', authenticate() , (req: Request, res: Response ,next: NextFunction ) => {
            res.json( req.user )
        })

        //posts routes
        this.router.get('/api/posts', this.postController.getAll() )
        this.router.post('/api/post', this.postController.save() )

        //test
        this.router.post('/api/mail', this.mailController.send() )
        //view
        this.router.get('*', this.indexController.show())
    }
}

export default new ApiRoutes().router