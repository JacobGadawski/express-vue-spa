import PostRepository from '../repositories/PostRepository';
import { Request, Response, NextFunction, RequestHandler } from 'express'


class PostController{
    private postRepository: PostRepository
    constructor(){
        this.postRepository = new PostRepository()
    }
    public getAll(): RequestHandler{
        return async ( req: Request, res: Response, next: NextFunction): Promise<Response> => {
            try {
                return res.json( await this.postRepository.getAll() )
            } catch (error) {
                throw error
            }
        }
    }
    public save(): RequestHandler{
        return async ( req: Request, res: Response, next: NextFunction): Promise<Response> => {
            try {
                return res.json( await this.postRepository.save( req.body ) )
            } catch (error) {
                throw error
            }
        }
    }
}

export default PostController