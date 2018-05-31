import { Document, Schema, Model, model} from "mongoose"
import { IPostInterface } from '../interfaces/IPostInterface'

export interface IPostModel extends IPostInterface, Document{}

export const PostSchema: Schema = new Schema({
    title: String,
    createdAt: Date
})
PostSchema.pre('save', (next) => {
    const now = new Date()
    if (!this.createdAt) {
        this.createdAt = now
    }
    next()
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', PostSchema)