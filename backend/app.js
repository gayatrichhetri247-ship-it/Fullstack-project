import express from "express"
import userRoutes from "./src/routes/user.router.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import foodRoutes from "./src/routes/food.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use("/api/users", userRoutes)
app.use("/api/foods", foodRoutes)
app.use("/api/orders", orderRoutes)

export default app;
// import {MongoClient} from "mongodb";

// const url = "mongodb+srv://gayatrichhetri247_db_user:So3feOoiJLr4I0wK@cluster0.f8rrtzs.mongodb.net/?appName=Cluster0"
// const dbName = "Cluster0";

// async function connectDB (){
//     const client = new MongoClient(url);
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//         return client;
        
//     } catch (error) {
//         console.error("connection failed", err);
        
//     }
// }

// async function run(){
// const client = await connectDB();
// const dv = client.db(dbName);
// const collection = db.collection("fullstack");

// const fullstackData = await collection.find({}).toArray();
// console.log(fullstackData)
// }
// run()