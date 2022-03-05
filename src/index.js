import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import router from './routes/app-index';


//DATE BASE
import pool from './settings/db'

const app = express();




//SETTINGS HEADER OF CORS
const corsOptions = {

    origin: 'http://example.com',
    optionsSuccessStatus: 200

}

//WITH THIS CODE WE DEFINE THE PORT
app.set('port', process.env.PORT || 3000);

//MIDDLEWARE 
app.use(morgan('dev'));
app.use(cors());
//para enviar información desde el body
app.use(express.json({ extended: true}));
app.use(express.urlencoded({ extended: true}));

//ROUTES
app.use('/api',cors(corsOptions), router);


// PUBLIC
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), ()=> {

    console.log('server on port: ', app.get('port'));
});
