const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const app = express();
const apiRoutes = require('./routes')
const cors = require('cors')
const {cronJob} = require('./utils');
const {cronSession} = cronJob
app.use(express.json());
//app.use(express.urlencoded())
//const {logger} = require('./config')

app.use(
    cors({
        origin: "http://localhost:5173", // Vite default
        credentials: true,
    })
);

app.use('/api',apiRoutes);

app.listen(process.env.PORT,()=>{
   console.log(`listning on port ${process.env.PORT}`);
   cronSession();
    //logger.info("server has started suceess",{})
})