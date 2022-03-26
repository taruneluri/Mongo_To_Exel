const express=require('express');
const mongoose=require('mongoose');
const User=require('./model');
const XLSX=require('xlsx');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const uri = "mongodb+srv://taruneluri:taruneluri@cluster0.gkezw.mongodb.net/capstone?retryWrites=true&w=majority";
mongoose.connect(uri).then(()=>{console.log("DataBase Connected !!")});
const connection=mongoose.connection;
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.post('/fetchdata',(req,res)=>{
    var wb=XLSX.utils.book_new();
    User.find((err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/public/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    })
})
app.listen(3000,()=>{console.log("server started !")});