import { ChatRightDots, ChevronUp } from 'react-bootstrap-icons';

type CommentReplyButtonProps = {
    replyCount: number;
};

// TODO: 버튼 하기
const CommentReplyButton: React.FC<CommentReplyButtonProps> = ({ replyCount }: CommentReplyButtonProps) => {
    return (
        <>
            <ChatRightDots />
            <p className="px-1" style={{ display: 'inline', fontSize: '0.8rem' }}>
                {replyCount}
            </p>
            <ChevronUp />
        </>
    );
};

export default CommentReplyButton;
