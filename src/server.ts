import * as dotenv from 'dotenv'
dotenv.config()
import app from './App'

app.listen( process.env.HTTP_PORT, () => {
    console.log( `Server listen on port ${process.env.HTTP_PORT}` )
} )