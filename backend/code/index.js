const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.urlencoded({ extended:true })) //for form submission
app.use(express.json()) //json response
app.use(
    cors(
        { origin : "http://localhost:3000" }  //Front-End
    )
)

//ADMIN USER
const userDB = [
    {
        id: 1,
        username: "admin",
        password: "admin123",
        status: 1,
        email: "myTest@yahoo.com"
    },
    {
        id: 2,
        username: "staff",
        password: "123",
        status: 0,
        email: "staff@google.com"
    }

]

//LOGIN VALIDATION
app.post('/login-validation', (req, res)=>{
    let username_login = req.body.username;
    let password_login = req.body.password;

   const user = userDB.find(
        (ob)=>{
          return ob.username === username_login && ob.password === password_login 
        }
    );
    
    if (user) {

        res.status(200).json(
           { code: "success", msg : "Username and Password matched a record", loginUser : user }   
        )

    } else {
       res.status(401).json({ code: "failed", msg:"Incorrect Username and Password testing"}) 
    }


})
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//FORM DATABASE

const formDB = [
    {
        id:1,
        formFullname : "Berto Tan",
        formPhone: "09994459433",
        formEmail : "Bonaaad@gmail.com",
        formDate : '2024-02-16',
        formDate2 : '2024-02-20',
        option: 'N',
        formMessage : "97987 sample"
    },

    {   
        id:2,
        formFullname : "Peter Bond",
        formPhone: "09994459444",
        formEmail : "Bond@gmail.com",
        formDate: '2024-03-22',
        formDate2: '2024-03-27',
        option: 'Y',
        formMessage : "97987 sample"
    },

];

app.get('/all-profiles', (req, res)=>{
    res.json(formDB)
})

app.get('/one-profile/:id', (req, res)=>{
   const profileId = req.params.id;
   const userFound = formDB.find( 
            (user)=>{
                return parseInt(profileId) === parseInt(user.id)   
            } 
    )
    if (userFound){
        res.json(userFound);
    } else {
        res.status(400).json("Invalid Id")
    }
})

//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//FORM

app.post('/form', (req, res)=>{
    let formFullname = req.body.formFullname;
    let formPhone = req.body.formPhone;
    let formEmail = req.body.formEmail;
    let formDate = req.body.formDate;
    let formDate2 = req.body.formDate2;
    let formOption = req.body.formOption;
    let formMessage = req.body.formMessage;

    idCountForm = formDB.length + 1;
    const newRecord = {
        id: idCountForm,
        formFullname: formFullname,
        formPhone: formPhone,
        formEmail: formEmail,
        formDate: formDate,
        formDate2: formDate2,
        formOption: formOption,
        formMessage: formMessage
    }
    
  const saveStatus = formDB.push(newRecord);  
   if (saveStatus) {
     res.status(200).json(
        { code: "success", msg:"add successful" }   
     )
   } else {
     res.status(401).json(
        { code: "failed", msg:"add error in saving" }   
     )
   }

})


//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
// FORM DELETE
app.get('/delete-user/:userId', (req, res)=>{
    const user_id = req.params.userId;
    const indexValue =  formDB.findIndex( (obj) => obj.id == user_id );
    formDB.splice(indexValue, 1);

    if (formDB) {
        res.json(
            {
                code : "success",
                msg : "Delete Done"
            }
        )
   } else {
      res.status(400).json(
        {
            code : "failed",
            msg : "Error encountered while deleting the data"
        }
      )
   }
    
})


app.listen(5000)
console.log('Back-End Server is now running in port 5000')