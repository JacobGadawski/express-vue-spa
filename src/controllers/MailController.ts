import MailService from "../services/MailService";
import { Request, Response, NextFunction, RequestHandler } from "express";

class MailController{
    private _mailService: MailService
    constructor(){
        this._mailService = new MailService({
            SmtpServerConnectionString: 'smtp://localhost:1025',
            SmtpFromAddress: 'smtp_from@test.com'
        })
    }
    public send(): RequestHandler{
        return async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
            try {
                return await this._mailService.sendMail('test@test.pl', 'temat', 'tresc wiadomosci z node')
            } catch (error) {
                throw error
            }
        }
    } 
}

export default MailController