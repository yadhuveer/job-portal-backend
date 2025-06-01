


    import {
        body,
        validationResult,
      } from 'express-validator';



export  class FormValidate{
    
  JobUpdateFormValidate = async (req,res,next)=>{
   
  console.log("inside jobFormValidate");
        const rules=[
            body('JobType')
              .notEmpty()
              .withMessage('Select wether Tech or Non tech Job'),
            body('positions')
              .isFloat({gt:0})
              .withMessage('Positions should be positive value'),
           
            body('location')
              .notEmpty()
              .withMessage('Location is Mandatory'),

              body('company')
              .notEmpty()
              .withMessage('Company is Mandatory'),

              body('salary')
              .notEmpty()
              .withMessage('Salary is mandatory'),


              body('designation')
              .notEmpty()
              .withMessage('Designation is mandatory'),

              body('options')
             .custom((value) => {
             if (!value || (Array.isArray(value) && value.length === 0)) {
              throw new Error('At least one skill must be selected.');
             }
             return true;
            })
            .withMessage('At least one skill must be selected.'),

              body('lastDate')
              .notEmpty()
              .withMessage('Select last Date'),
              
            
        ];

        await Promise.all(rules.map((rule)=>{
            return rule.run(req);
        })
    );

    
        
        var errors1 =  validationResult(req);
       
       

        if(!errors1.isEmpty()){
          console.log(req.params.id);
          console.log(errors1.array());
          //sreturn res.render('JobUpdate',{error:errors1.array(),cssControler:'jobForm',userEmail:req.session.userEmail,id:req.body.id});
         return res.status(401).json({errors:errors1.array()})
        }
        next();
}


JobPostFormValidate = async (req,res,next)=>{
   

    const rules=[
        body('JobType')
          .notEmpty()
          .withMessage('Select wether Tech or Non tech Job'),
        body('positions')
          .isFloat({gt:0})
          .withMessage('Positions should be positive value'),
       
        body('location')
          .notEmpty()
          .withMessage('Location is Mandatory'),

          body('company')
          .notEmpty()
          .withMessage('Company is Mandatory'),

          body('salary')
          .notEmpty()
          .withMessage('Salary is mandatory'),


          body('designation')
          .notEmpty()
          .withMessage('Designation is mandatory'),

          body('options')
             .custom((value) => {
             if (!value || (Array.isArray(value) && value.length === 0)) {
              throw new Error('At least one skill must be selected.');
             }
             return true;
            })
            .withMessage('At least one skill must be selected.'),

              
          body('lastDate')
          .notEmpty()
          .withMessage('Select lastDate'),
          
        
    ];

    await Promise.all(rules.map((rule)=>{
        return rule.run(req);
    })
);


    
    var errors1 =  validationResult(req);
   
   

    if(!errors1.isEmpty()){
      //return res.render('newJob',{error:errors1.array(),cssControler:'jobForm',userEmail:req.session.userEmail})
    
      return res.status(401).json({errors:errors1.array()})
        
    }
    next();

}


      }