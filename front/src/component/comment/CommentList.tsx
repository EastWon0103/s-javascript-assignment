import { Stack } from 'react-bootstrap';
import CommentItem from './CommentItem';

type CommentListProps = {
    comments: CampaignComment[];
};

const CommentList: React.FC<CommentListProps> = ({ comments }: CommentListProps) => {
    return (
        <Stack gap={5}>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    id={comment.id}
                    body={comment.body}
                    commentType={comment.commentType}
                    campaign={comment.campaign}
                    userNickname={comment.userNickname}
                    whenCreated={comment.whenCreated}
                    depth={comment.depth}
                    commentReplys={comment.commentReplys}
                />
            ))}
        </Stack>
    );
};

export default CommentList;
