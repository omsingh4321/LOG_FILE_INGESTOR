import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import logRouter from "./modules/log/log.router.js";
import db from "./db/connection.js";
import cors from "cors";
const app=express();

db();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/v1',logRouter)


app.listen(process.env.PORT,()=>{
     console.log(`server is listening on ${process.env.PORT}`)
})