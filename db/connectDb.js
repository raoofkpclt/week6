const mongoose=require('mongoose');


const connectDb= async ()=>{
    try{
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/week6',{
            useNewUrlParser:true,
        });
        console.log(`MongoDB Connected ${connect.connection.host}`);
        
    }catch(err){
        console.log(err);
        process.exit(1);

   }
}

module.exports=connectDb;
