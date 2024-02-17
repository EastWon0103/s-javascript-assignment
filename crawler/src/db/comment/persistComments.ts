import { ObjectId, Types } from 'mongoose';
import { Comment, IComment } from './commentModel';
import cliProgress from 'cli-progress';
import chalk from 'chalk';

const mapToIComment = (comment: CommentComposition, campaignId: number, parent?: Types.ObjectId): IComment => {
    return {
        body: comment.body,
        campaign: campaignId,
        commentType: comment.commentType,
        userNickname: comment.nickName,
        whenCreated: new Date(comment.whenCreated),
        depth: comment.depth,
        parent: parent ? parent : null,
    };
};

const persistComments = async (commentMap: Map<number, CommentComposition[]>) => {
    try {
        let allCommentReplys: Array<IComment> = [];
        const bar = new cliProgress.SingleBar(
            { format: chalk.bgCyanBright.bold('○ Persist Comment ') + ' {bar} {value}/{total} {percentage}%' },
            cliProgress.Presets.shades_classic
        );

        bar.start(commentMap.size, 0);
        for (const [campaignId, comments] of commentMap) {
            bar.increment();
            for (const comment of comments) {
                if (comment.del) continue; // 삭제된 댓글이면 건너뛰기

                const rootComment = new Comment(mapToIComment(comment, campaignId));
                const { id } = await rootComment.save();

                const commentReplys = comment.commentReplys
                    .filter((c) => !c.del) // 삭제된 대댓글이면 건너뛰기
                    .map((c) => mapToIComment(c, campaignId, id));

                allCommentReplys = [...allCommentReplys, ...commentReplys];
            }
        }

        bar.stop();
        await Comment.insertMany(allCommentReplys);
    } catch (err) {
        console.error(err);
        throw new Error("Can't Persist Comment Data");
    }
};

export { persistComments };
