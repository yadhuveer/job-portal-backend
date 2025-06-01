export  class UserModel{

    constructor(id,name,email,password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    
    }

    
    
    static add(userObj){
        const newUser = new UserModel(users.length+1,userObj.name,userObj.email,userObj.password);


        users.push(newUser);

    }

    
    static get(){

        return users;
    }


    static ValidateUser(bodyObj){

        const userExsist = users.find((usr)=>{
            console.log(bodyObj.name);
            console.log(bodyObj.password);
            console.log(usr.name);
            console.log(usr.password);
            if(usr.email==bodyObj.email && usr.password==bodyObj.password){
                
                return usr;

            }
        })

        return userExsist;

    }

}

let users = [];
