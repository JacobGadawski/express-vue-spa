import { User, IUserModel } from '../models/User';
import { Model, DocumentQuery } from 'mongoose';
import { IUserInterface } from 'interfaces/IUserInterface';

class UserRepository{
    private user: Model<IUserModel>
    constructor(){
        this.user = User
    }
    public async findOne( userData ): Promise<IUserModel>{
        try {
            return await this.user.findOne( userData )
        } catch (error) {
            throw error
        }
    }
    public async save( user: IUserModel ): Promise<IUserModel>{
        try {
            return await this.user.create( user )
        } catch (error) {
            throw error
        }
    }
}

export default UserRepository