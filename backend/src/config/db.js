import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async() => {
	try{
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("mongoDB connected!");
	}catch (err){
		console.error("mongoDB Connection Error: ", err);
		process.exit(1); //exit with failure
	}
};
