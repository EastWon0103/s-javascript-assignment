import { Comment } from '../db/comment/commentModel';
import ApplicationError from '../util/error/applicationError';

const postRootComment = async (campaignId: number, body: string, userNickname: string) => {
    if (!body || body.length < 2) throw new ApplicationError(400, 'Not Valid Comment Body');
    if (!userNickname || userNickname.length < 2) throw new ApplicationError(400, 'Not Valid userNickname');

    const comment = new Comment({
        body: body,
        commentType: 'SUPPORT', // 일단 지정
        userNickname: userNickname,
        campaign: campaignId,
        depth: 0,
    });

    const result = await comment.save();
    return result;
};

const postCommentReply = async (
    campaignId: number,
    parentId: string,
    body: string,
    userNickname: string,
    depth: number
) => {
    if (!body || body.length < 2) throw new ApplicationError(400, 'Not Valid Comment Body');
    if (!userNickname || userNickname.length < 2) throw new ApplicationError(400, 'Not Valid userNickname');
    if (!depth || depth < 1) throw new ApplicationError(400, 'Not Valid Depth');

    try {
        const parentComment = await Comment.findOne({ _id: parentId });
        if (!parentComment) throw new ApplicationError(400, "Can't find parent comment");
        const comment = new Comment({
            body: body,
            parent: parentComment._id,
            commentType: null, // 일단 지정
            userNickname: userNickname,
            campaign: campaignId,
            depth: depth,
        });

        const result = await comment.save();
        return result;
    } catch (err) {
        throw new ApplicationError(400, 'Wrong Comment Request');
    }
};

export { postRootComment, postCommentReply };
