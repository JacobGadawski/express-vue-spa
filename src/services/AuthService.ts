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
            const user = await this.userRepository.findOne( { email } )
            const isPasswordValidate = await bcrypt.compare( password, user.password )
            if( user && isPasswordValidate ){
                const token = jwt.encode( { _id: user._id, exp: new Date().getTime() + 1000 }, authConfig.jwtSecret )
                return { user, token }
            }
            throw new Error( 'User not found exception' )
        } catch (error) {
            throw error
        }
    }
    async register( name: string, email: string, password: string ){
        try {
            const salt = await bcrypt.genSalt()

            const user = await this.userRepository.save( { name, email, password : await bcrypt.hash( password, salt ) } )
            if( user ){
                const token = jwt.encode( { _id: user._id, exp: new Date().getTime() + 1000 }, authConfig.jwtSecret )
                return { user, token }
            }
        } catch (error) {
            throw new Error('Error in user register action')
        }
    }
}

export default AuthService