const express=require('express');
const router=express.Router();

router.get('/login',(req,res)=>{
    res.send('helo admin');
})

module.exports=router;