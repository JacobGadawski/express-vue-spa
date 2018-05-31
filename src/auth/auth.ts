// var passport = require("passport");  
// var passportJWT = require("passport-jwt");  
// var users = require("./users.js");  
// var cfg = require("./config.js");  
// var ExtractJwt = passportJWT.ExtractJwt;  
// var Strategy = passportJWT.Strategy;  
// var params = {  
//     secretOrKey: cfg.jwtSecret,
//     jwtFromRequest: ExtractJwt.fromAuthHeader()
// };


import * as passport from 'passport'
import * as passportJWT from 'passport-jwt'
import config from '../config/auth'
import { ExtractJwt, Strategy } from 'passport-jwt'
import UserRepository from '../repositories/UserRepository';
import { RequestHandler } from 'express';

const userRepostory = new UserRepository()

export function auth(){
    passport.use( new Strategy(
        { 
            secretOrKey: config.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
        } , ( payload, done ) => {
            console.log( 'auth payload', payload )
            userRepostory.findOne( { _id: payload._id } ).then( user => {
                if( user ){
                    return done( null, user )
                }
                return done( new Error( 'User not found' ), null )
            })
    }) )
}

export function initialize(): RequestHandler {
    return passport.initialize()
}

export function authenticate(): RequestHandler {
    return passport.authenticate('jwt', config.jwtSession )
}
