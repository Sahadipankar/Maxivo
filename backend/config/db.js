import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'Maxivo'
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.log("DB connection error:", error)
    }

}
export default connectDb