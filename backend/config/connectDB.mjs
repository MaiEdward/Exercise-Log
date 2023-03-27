import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(
            process.env.MONGO_URI,
            { useNewUrlParser: true }
            );
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;

