import * as nodemailer from 'nodemailer'
import { IMailSettings } from '../interfaces/IMailSettings';

class MailService{
    private _transporter: nodemailer.Transporter
    private _settings: IMailSettings
    constructor( settings: IMailSettings, test?: string){
        this._settings = settings
        this._transporter = nodemailer.createTransport(
            this._settings.SmtpServerConnectionString
        )
    }
    sendMail( to: string, subject: string, content: string ): Promise<void>{
        const options = {
            from: this._settings.SmtpFromAddress,
            to,
            subject,
            text: content
        }
        return new Promise<void>( ( resolve: ( msg: any ) => void, reject: ( err: Error ) => void ) => {
            this._transporter.sendMail( options, ( error, info ) => {
                if( error ){
                    reject( error )
                }
                resolve( info.response )
            })

        } )
    }
}

export default MailService