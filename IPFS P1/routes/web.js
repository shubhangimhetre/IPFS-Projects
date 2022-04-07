const express=require('express');
const router=express.Router();
const serve=require('../controllers/firstcontroller');

router.post('/',serve.uploadImage);

module.exports=router