import { Badge, Col, Container, Row } from 'react-bootstrap';

type CampaignInfoProps = {
    title: string;
    nickname: string;
    achievementRate: number;
    categoryName: string;
    totalBackedAmount: number;
    coreMessage: string;
};

const CampaignInfo: React.FC<CampaignInfoProps> = ({
    title,
    nickname,
    achievementRate,
    categoryName,
    totalBackedAmount,
    coreMessage,
}: CampaignInfoProps) => {
    return (
        <Container className="px-0">
            <Row>
                <Col className="text-muted">{categoryName}</Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3 className="fw-bold">{title}</h3>
                </Col>
            </Row>
            <Row style={{ padding: '30px 0' }}>
                <Col>{coreMessage}</Col>
            </Row>

            <Row>
                <Col style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <h2 className="fw-bold">{`${totalBackedAmount.toLocaleString('ko-KR')}원 달성`}</h2>
                    <Badge bg="secondary">{`${achievementRate}% 달성`}</Badge>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col className="text-muted">{nickname}</Col>
            </Row>
        </Container>
    );
};

export default CampaignInfo;
