const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const app = express();
const apiRoutes = require('./routes')
//const {logger} = require('./config')


app.use('/api',apiRoutes);

app.listen(process.env.PORT,()=>{
   console.log(`listning on port ${process.env.PORT}`)
    //logger.info("server has started suceess",{})
})