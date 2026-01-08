import { Worker } from "bullmq";
import IORedis from 'ioredis'
import { sendEmail } from "../utils/nodeMailer.js";
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from "url"; 

const redis_url = process.env.REDIS_URL || "redis://localhost:6379"
// const redisConnection = new IORedis(redis_url);
const redisConnection = new IORedis(redis_url, {maxRetriesPerRequest: null,enableReadyCheck: false});


const __dirname = path.dirname(fileURLToPath(import.meta.url))

const send_otp_worker = new Worker('send-otp-email-queue', async (job)=>{
    const {name, email, otp} = job.data;

    const htmlBody = await ejs.renderFile(path.join(__dirname, '../views/otpEmail.ejs'), { name, otp, appName: "edu Beta Communes" });
    await sendEmail(email, "Verify Your Email", htmlBody);
}, { connection:redisConnection});


send_otp_worker.on('completed', (job)=>console.log(`✔ OTP Email send by worker with job id: ${job.id}`))
send_otp_worker.on('failed', (job, error)=>console.error(`❌ send_otp_worker failed: ${error.message}`))