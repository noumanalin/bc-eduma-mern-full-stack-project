import os from 'os';
import cluster from 'cluster';
import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import cors from 'cors'

import { connectDB } from './utils/connectDB.js';
import blogRoutes from './routes/blogs.routes.js'

const totalCpus = os.cpus().length;
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://localhost:5174"

const app = express();

   
if(cluster.isPrimary){
    for(let i=0; i<totalCpus-3; i++){
        cluster.fork();
    }
} else {

app.use(express.urlencoded({ extended: true}))
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:5173", FRONTEND_URL, "https://localhost:5175"],
    methods: ["GET", "POST"],
    credentials: true
}));



app.get('/', (req, res)=>{
        return res.json({success:true, message:`hello cluster nodejs server & worker processor id is ${process.pid}`})
    })

app.use('/api', blogRoutes)



app.listen(PORT, ()=>{
    console.log(`✔ Server is running on port ${PORT} with process id: ${process.pid})`)
    connectDB();
})


}
