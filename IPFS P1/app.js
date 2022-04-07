const express=require('express');
const app= express();
const upload=require('express-fileupload');
const port=3000;
const {create}=require('ipfs-http-client');
const ipfs=create();
const web=require('./routes/web');
const mongoose=require('mongoose')
const DB="mongodb+srv://shubhangimhetre:Shubhangi_123@cluster0.ehg4f.mongodb.net/Mydb?retryWrites=true&w=majority"

app.use(upload())
app.use('/',web)

mongoose.connect(DB,{
    useNewUrlparser:true,
    useUnifiedTopology:true
}).then(()=>{console.log('connected to database..')})
.catch((err)=>{console.log(err)})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.listen(port,()=>{
    console.log(`server is listening at ${port}`);
})