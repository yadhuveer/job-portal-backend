import { UserModel } from "../models/user.model.js";

//import {productModel} from '../models/product.mode.js';

import {jobModel} from "../models/jobs.model.js";

export  class UserController{

    getRegister(req,res,next){
        res.render('register',{cssControler:'null'});
    }


    getLogIn(req,res,next){
        res.render('login',{errorMessage:null,cssControler:'null'});
    
    }

    HandleUser(req,res,next){
        console.log("Hi");
        UserModel.add(req.body);

        console.log(UserModel.get());
        res.status(200).send("OK");
        //res.render('login',{errorMessage:null,cssControler:'null'});
    
    
    }

    async logInSubmited(req,res,next){
        console.log("Hi "+req.body);

        const userVar = await UserModel.ValidateUser(req.body);
        console.log(userVar);

       /* if(!userVar){
            return res.render('login',{errorMessage:"Enter Valid user",cssControler:'null'});
        }*/
        if (!userVar) {
        return res.status(401).json({ error: "Enter Valid user" });
    }


        req.session.userEmail=req.body.email;

        const varJob = jobModel.getJobs();
          return res.status(200).json({
        userEmail: req.session.userEmail,
       
    });

        //res.render('jobs',{varJob:varJob,userEmail:req.session.userEmail,cssControler:'home'});

        

    }


     sendSession(req,res,next){
        console.log("userEmail is "+req.session.userEmail);
        res.status(200).json({userEmail:req.session.userEmail});
    }


    logoutUser(req,res,next){
        req.session.destroy((err)=>{
            if(err){

                console.log(err);
            }else{
                 res.clearCookie('lastVist');
                 res.status(200).json({message:"logout sucessful"});
    
                //res.render("login",{errorMessage:null,cssControler:'null'});
            }

        })
        //res.clearCookie('lastVisit');
        //console.log("logout sucessful");
       
    }
    



}