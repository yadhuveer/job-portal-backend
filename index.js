import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import  session from 'express-session';
import {portalHandler} from './src/controllers/portal.controller.js';
import fs from 'fs';


import {UserController} from './src/controllers/user.controller.js';

import {uploadFile} from './src/Middleware/file-uploadMiddleware.js';
import cors from 'cors';


import {auth} from './src/Middleware/auth.middleware.js'

import {FormValidate} from './src/Middleware/validate.middleware.js';

import {setLastVisit} from './src/Middleware/lastVist.middleware.js';

import cookieParser from 'cookie-parser';

import { cookie } from 'express-validator';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const PORT = process.env.PORT || 3000;
server.use(cookieParser());
//server.use(setLastVisit);
server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.set('view engine','ejs');


server.set("views",path.join(path.resolve(),'src','views'));

server.use(ejsLayouts);
const uploadDir = path.join(process.cwd(), 'public', 'pdf');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created upload directory:', uploadDir);
}

server.use('/pdf', express.static(path.join(__dirname, 'public/pdf')));
/*server.use(
    session({
        secret:'SecretKey',
        resave:false,
        saveUninitialized:true,
        cookie:{secure:false},
    })
);*/
server.set('trust proxy', 1); 


server.use(
  session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, 
      httpOnly: true,
      sameSite: 'none' 
    }
  })
);



server.use(cors({
  origin: "https://job-portal-frontend-rho-lime.vercel.app",
  credentials: true
}));

const portalInstance = new portalHandler();

const userInstance = new UserController();


const middlewareInstance = new FormValidate();

server.use(express.static(path.join(path.resolve(), 'public')));


server.get("/jobs",[portalInstance.JobRender]);

//server.get("/viewDetails/:id",[portalInstance.DetailsRender]);
server.get("/viewDetails/:id", (req, res, next) => portalInstance.DetailsRender(req, res, next));


server.post("/apply/:id",[uploadFile.single('resume'),portalInstance.ApplicationHandler]);

server.get('/applicants/:id',[auth,portalInstance.ApplicantsRender]);





server.post('/postJob',[auth,middlewareInstance.JobPostFormValidate, portalInstance.HandleNewJob]);

server.get('/edit/:id',[auth,portalInstance.productUpdateForm]);
server.post('/edit',[middlewareInstance.JobUpdateFormValidate,portalInstance.productUpdateHandler]);
server.post('/delete/:id',[auth,portalInstance.DeleteJob]);

server.get('/logIn',[userInstance.getLogIn]);

server.post('/login',[userInstance.logInSubmited]);

server.get('/logout',[userInstance.logoutUser]);

server.get('/reg',[userInstance.getRegister]);

//server.post('/register',[userInstance.HandleUser]);
server.post('/register',[(req, res, next) => userInstance.HandleUser(req, res, next)]);

server.get('/get-session',[userInstance.sendSession]);
server.get('/lastvisit',[setLastVisit]);

server.listen(PORT);




