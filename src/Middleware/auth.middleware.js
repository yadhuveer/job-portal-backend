export const auth = (req,res,next)=>{
    console.log("inside auth session is "+req.session.userEmail);

    if(req.session.userEmail){
        next();
    }else{
        //res.redirect('/login');

        console.log("inside wrong");
        res.status(401).json({error:'Unauthorized'});
    }

};