import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbSetUp = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB_NAME}`,
            {
                retryWrites: true,
                w: 'majority',
            }
        );

        console.log('Mongo DB Connected!');
    } catch (_) {
        throw new Error("Can't Connect to DB, Check your env file");
    }
};

export { dbSetUp };
