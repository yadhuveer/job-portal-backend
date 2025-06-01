import { error } from "console";
import { jobModel } from "../models/jobs.model.js";

export class portalHandler{

    JobRender(req,res,next){
       
         try {
        const varJob = jobModel.getJobs();
        console.log(varJob);
        res.status(200).json({
            success: true,
            jobs: varJob,
            userEmail: req.session.userEmail || null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch jobs',
            error: error.message
        });
    }
    }

     async DetailsRender(req,res,next){
        console.log(req.params.id);
        console.log("hi");
        const varJob =  await jobModel.getDetailsJob(req.params.id);
        if(varJob){
            res.json(varJob);
        }else {
            res.status(404).json({ error: 'Job not found' });
        }

        
    }

    ApplicationHandler(req,res,next){
        const appObj = req.body;
        const imagePath = "/pdf/"+req.file.filename;
        jobModel.AddApplicants(appObj,imagePath,req.params.id);
        
        console.log("Sending back response");
        res.status(200).json({message:"OK"});

    }


    ApplicantsRender(req,res,next){
        const applicantsArray = jobModel.getApplicants(req.params.id);
        console.log("hi");
        console.log(applicantsArray);

        
        res.status(200).json({data:applicantsArray});
        //next();
    }


    

    

    HandleNewJob(req,res,next){
        console.log(req.body);
        jobModel.postNewJob(req.body);
        
        res.status(200).json({msg:"job posted sucessfully"});
    }
    

    productUpdateForm(req,res,next){
        res.render('JobUpdate',{cssControler:'jobForm',id:req.params.id,userEmail:req.session.userEmail,error:null});
    }

    productUpdateHandler(req,res,next){
        jobModel.updateJob(req.body);
        console.log("Update completed");
        res.status(200).json({message:"OK"});
        

    }


    async DeleteJob(req,res,next){
        await jobModel.Delete(req.params.id);
       
       res.status(200).send("OK");

    }



}