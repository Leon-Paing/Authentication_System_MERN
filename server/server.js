import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/route.js";
import {User} from "./models/UserModel.js";

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

// const newUser = new User({ name: 'John Doe', email: 'john@example.com', password: "password", });
// newUser.save()


const PORT = process.env.PORT || 50

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`))
