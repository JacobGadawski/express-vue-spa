import { Document, Schema, Model, model} from "mongoose"
import { IUserInterface } from '../interfaces/IUserInterface'

export interface IUserModel extends IUserInterface, Document{}

export const UserSchema: Schema = new Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    createdAt: Date
})
UserSchema.pre('save', (next) => {
    const now = new Date()
    if (!this.createdAt) {
        this.createdAt = now
    }
    this.updatedAt = now
    next()
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)