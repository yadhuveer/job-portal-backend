export const setLastVisit = (req,res,next)=>{
     console.log("Inside last visit");

    if(req.cookies.lastVist){
        console.log("lastvisit inside is "+req.cookies.lastVist);

        res.locals.lastVist = new Date(req.cookies.lastVist).toLocaleDateString();
        const preVisit = new Date(req.cookies.lastVist).toLocaleDateString();
        res.cookie('lastVist',new Date().toISOString(),{
        maxAge:2*24*60*60*1000,
         httpOnly: false,
        secure: true,
        sameSite: 'None',
    });
        console.log("preisit before setting is "+preVisit);
        return res.status(200).json({lastVist: preVisit});


    }
    res.cookie('lastVist',new Date().toISOString(),{
        maxAge:2*24*60*60*1000,
        httpOnly: false,
        secure: true,
        sameSite: 'None',
    });
    console.log("lastvisit outside is "+req.cookies.lastVist);

    return res.status(200).json({lastVist:""});


    next();

};