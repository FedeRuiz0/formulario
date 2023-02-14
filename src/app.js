import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import viewsRouter from './routes/views.routes.js';

import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

const app = express();
mongoose.set('strictQuery', true);
const user = 'kaoh0';
const dbname = 'ecommerce';
const password = 'UXwbS9IIquhkPX1m';
const uri =  `mongodb+srv://${user}:${password}@ecommerce.l6epe3o.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('DB conectado'))
    .catch(err => console.log(err))


// handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/ecommerce',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 60
    }),
    secret: 'eApp',
    resave: false,
    saveUninitialized: false
}))
app.use(express.static(`${__dirname}/public`))

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartsRoutes);
app.use('/session', sessionRoutes);
app.use('/', viewsRouter);
app.get('*', (req, res) => { res.status(404).send('404 not found')})

app.listen(3000, () => console.log('Server up in port 3000'))

