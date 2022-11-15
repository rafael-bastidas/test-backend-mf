if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('./connectionDB');

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/favorities', require('./routes/favoritesRoutes'));

//Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});