import { Model, Schema, Types, model } from 'mongoose';

interface IComment {
    body: string;
    commentType: string;
    campaign: number;
    userNickname: string;
    whenCreated: Date;
    depth: number;
    parent: Types.ObjectId | null;
}

interface CommentModel extends Model<IComment> {}

const commentSchema = new Schema<IComment, CommentModel>({
    body: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, required: false, default: null },
    commentType: { type: String }, // comment Type이 null인 것이 존재
    campaign: { type: Number, required: true, ref: 'campaign' },
    userNickname: { type: String, required: true },
    whenCreated: { type: Date, default: Date.now() },
    depth: { type: Number, required: true, default: 0 },
});

commentSchema.set('toObject', { virtuals: true });
commentSchema.set('toJSON', { virtuals: true });

// 가상 필드
commentSchema.virtual('commentReplys', {
    localField: '_id',
    ref: 'comment',
    foreignField: 'parent',
});

const Comment = model<IComment, CommentModel>('comment', commentSchema);

export { IComment, Comment };
