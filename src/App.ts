import * as express from 'express'
import routes from './routes/Routes'
import * as mongoose from 'mongoose'
import * as exphbs from 'express-handlebars'
import * as path from 'path';
import { auth, initialize } from './auth/auth' 


class App {
    public app: express.Application
    constructor(){
        this.app = express()
        this.config()
    }
    private config(): void {
        mongoose.connect(process.env.MONGO_URL)
        auth()
        this.app.engine('.hbs', exphbs({ extname: 'hbs'}));
        this.app.set('view engine', '.hbs')
        this.app.set('views', path.join(__dirname, '../views'))
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: false }) )
        this.app.use( express.static( 'public' ) )
        this.app.use( initialize() )
        this.app.use('/',routes )
    }
}

export default new App().app