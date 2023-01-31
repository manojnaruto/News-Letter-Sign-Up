const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));


app.listen(process.env.PORT || 3000,function()
{
  console.log("Server is Up and Running on port 3000");

});

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");

});


app.post("/", function(req,res)
     {
       const firstName = req.body.fname;
       const lastName = req.body.lname;
       const Email = req.body.email;

       const url = "https://us11.api.mailchimp.com/3.0/lists/c0d2a4fd1b";

       const data = {
         members :[{
                    email_address :Email,
                    status        : "subscribed",
                    merge_fields :
                                  {
                                    FNAME : firstName,
                                    LNAME : lastName,
                                  }
                  }]


       };
       const jsonDATA = JSON.stringify(data);

       const options = {
         method : "POST",
         auth :"Manoj:c71758f3ef377aedf00737f19ceeabe7-us11",
       }

    const request =   https.request(url, options , function(response)
     {
       if(response.statusCode===200)
       {
         res.sendFile(__dirname+"/sucess.html");
       }
       else{
         res.sendFile(__dirname+"/failure.html");
       }
       response.on("data",function(data)
     {
       console.log(JSON.parse(data));
     })

     })

      request.write(jsonDATA);
      request.end();


      app.post("/failure",function(req,res)
    {
      res.redirect("/");
    })



     });


// url : "https://${dc}.api.mailchimp.com/3.0/ping" \
       // API-KEY
     // c71758f3ef377aedf00737f19ceeabe7-us11

     // list ID : c0d2a4fd1b
