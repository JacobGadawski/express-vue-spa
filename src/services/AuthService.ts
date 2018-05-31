import UserRepository from '../repositories/UserRepository';
import * as jwt from 'jwt-simple'
import * as bcrypt from 'bcryptjs'
import { IUserInterface } from 'interfaces/IUserInterface';
import authConfig from '../config/auth'

class AuthService{
    private userRepository: UserRepository
    constructor(){
        this.userRepository = new UserRepository()
    }
    async login( email: string, password: string ){
        try {
            const user = await this.userRepository.findOne( { email, password } )
            if( user ){
                const token = jwt.encode( { _id: user._id, exp: new Date().getTime() + 1000 }, authConfig.jwtSecret )
                return { user, token }
            }
            throw new Error( 'User not found exception' )
        } catch (error) {
            throw error
        }
    }
}

export default AuthService