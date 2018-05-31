import { Post, IPostModel } from '../models/Post';
import { Model, DocumentQuery } from 'mongoose';

class PostRepository{
    private post: Model<IPostModel>
    constructor(){
        this.post = Post
    }
    public async getAll(): Promise<IPostModel[]>{
        try {
            return await this.post.find()
        } catch (error) {
            throw error
        }
    }
    public async save( post: IPostModel ): Promise<IPostModel>{
        try {
            return await this.post.create( post )
        } catch (error) {
            throw error
        }
    }
}

export default PostRepository