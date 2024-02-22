import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Campaign } from './campaign/campaignModel';
import { Comment } from './comment/commentModel';

dotenv.config();

const dbSetUp = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
            {
                retryWrites: true,
                w: 'majority',
            }
        );

        // 기존의 데이터 삭제ß
        await Campaign.deleteMany({});
        await Comment.deleteMany({});
    } catch (_) {
        throw new Error("Can't Connect to DB, Check your env file");
    }
};

export { dbSetUp };
