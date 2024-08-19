const express= require('express')
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());


const tarineeRoutes=require('./routes/tarineeRoutes')
app.use("/api/v1/trainees",tarineeRoutes)

app.use("/*",(req,res)=>{
    res.send("No routes found")
})

app.listen(4000,()=>{console.log("server is running  maaahn")})