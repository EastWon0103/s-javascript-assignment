import { useCallback } from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import detailDate from '../../util/date/detailDate';
import CommentReplyButton from './CommentReplyButton';

type CommentItemProps = CampaignComment;

const CommentItem: React.FC<CommentItemProps> = ({
    userNickname,
    body,
    commentType,
    whenCreated,
    commentReplys,
}: CommentItemProps) => {
    const parseCommentType = useCallback((commentType: string) => {
        switch (commentType) {
            case 'SUPPORT':
                return '지지서명';
            case 'PHOTO_REVIEW':
                return '체험리뷰';
            case 'SUGGESTION':
                return '의견';
            default:
                return null;
        }
    }, []);

    return (
        <Container className="border rounded p-4">
            {commentType ? (
                <Row>
                    <Col>
                        <Badge bg="info">{parseCommentType(commentType)}</Badge>
                    </Col>
                </Row>
            ) : null}

            <Row>
                <Col>{body}</Col>
            </Row>
            <Row className="align-items-end">
                <Col className="fw-bold">{userNickname}</Col>
                <Col className="text-muted text-end">
                    <p className="pe-3" style={{ display: 'inline', fontSize: '0.8rem' }}>
                        {detailDate(whenCreated)}
                    </p>
                    <CommentReplyButton replyCount={commentReplys.length} />
                </Col>
            </Row>
        </Container>
    );
};

export default CommentItem;
