export class jobModel{

    constructor(id,status,company,role,location,salary,skills,brief,lastDate,no_openings,applicants,postedDate,applicantsArray){
        this.id=id;
        this.status=status;
        this.company = company;
        this.role=role;
        this.location=location;
        this.salary=salary;
        this.skills = skills;
        this.brief = brief;
        this.lastDate = lastDate;
        this.no_openings = no_openings;
        this.applicants = applicants;
        this.postedDate = postedDate;
        this.applicantsArray=applicantsArray;
        
    }

    static getJobs(){
        return jobs
    }

    static getDetailsJob(id){
        const detailJobObj = jobs.find((job)=>{
            if(job.id==id){
                return job;
            }
        })
        return detailJobObj;

    }

    static AddApplicants(appobj,filename,id){
        const appObj = appobj;
        appObj['fileName']=filename;

        jobs.forEach((job)=>{
            if(job.id==id){

                job.applicantsArray.push(appObj);
                job.applicants+=1;
                
            }
            
        })

    }

    static getApplicants(id){
        
        const findJob =  jobs.find((job)=>{
            
            if(Number(job.id)==Number(id)){
               
                return job;
                
            }
        })
        if(findJob){
            return findJob.applicantsArray;
        }
        return [];
        
    }


    static postNewJob(newJobObj){
        var reqSkill;
        if (!Array.isArray(newJobObj.options)) {
             reqSkill  = [newJobObj.options];
        }else{
             reqSkill= newJobObj.options;

        }

        const jobInstance= new jobModel(jobs.length+1,"Actively Hiring",newJobObj.company,newJobObj.designation,newJobObj.location,newJobObj.salary,reqSkill,`${newJobObj.designation} at ${newJobObj.company}`,newJobObj.lastDate,newJobObj.positions,0,new Date(),[]);
        jobs.push(jobInstance);

    }

    static updateJob(newJobObj){
        var reqSkill;
        if (!Array.isArray(newJobObj.options)) {

             reqSkill  = [newJobObj.options];
        }else{
             reqSkill= newJobObj.options;
        }
        const updateJobInstance = new jobModel(newJobObj.id,"Actively Hiring",newJobObj.company,newJobObj.designation,newJobObj.location,newJobObj.salary,reqSkill,`${newJobObj.designation} at ${newJobObj.company}`,newJobObj.lastDate,newJobObj.positions,0,new Date(),[]);
        
      const jobIndx = jobs.findIndex((job)=>{
            if(job.id==newJobObj.id){
                console.log("Hi");
                return job;
            }
        })
        console.log(jobIndx);
        console.log(updateJobInstance.skills);

        if(jobIndx> -1){
            jobs[jobIndx]=updateJobInstance;
        }
    }


    static  Delete(deleteId){
        console.log("Delete");
        const deleteIndex =  jobs.findIndex((job)=>{
            if(job.id==deleteId){
                return job;            
            }
        })

        jobs.splice(deleteIndex,1);
        console.log('Deletion completed');
    }

}


var jobs=[new jobModel(1,"Actively Hiring","Coding Ninjas","Tech SDE","Gurgaon HR IND Remote","14-20lpa",["React","NodeJs","Js","SQL","MongoDb","Express","AWS"],"SDE oppertunity in GURGAON HR IND REMOTE at Coding Ninjas","30 Aug 2023",3,0,'12/28/2024',[]),

new jobModel(2,"Actively Hiring","Go Digit","Tech Angular Developer","Pune IND On-Site","6-10lpa",["Angular","Js","SQL","MongoDb","Express","AWS"],"Angular Developer oppertunity in PUNE IND ON-SITE at Go Digit","30 Aug 2023",3,0,'12/28/2024',[]),
new jobModel(3,"Actively Hiring","Juspay","Tech SDE","Banglore IND","20-26lpa",["REACT","NodeJs","JS","SQL","MongoDb","Express","AWS"],"SDE oppertunity in BANGALORE IND at Juspay","Apply By 30 Aug 2023",3,0,'12/28/2024',[]),
new jobModel(4,"Actively Hiring","Juspay","Tech SDE","Banglore IND","20-26lpa",["REACT","NodeJs","JS","SQL","MongoDb","Express","AWS"],"SDE oppertunity in GURGAON HR IND REMOTE at Coding Ninjas","30 Aug 2023",3,0,'12/28/2024',[]),
new jobModel(5,"Actively Hiring","Juspay","Tech SDE","Banglore IND","20-26lpa",["REACT","NodeJs","JS","SQL","MongoDb","Express","AWS"],"SDE oppertunity in GURGAON HR IND REMOTE at Coding Ninjas","30 Aug 2023",3,0,'12/28/2024',[])
];