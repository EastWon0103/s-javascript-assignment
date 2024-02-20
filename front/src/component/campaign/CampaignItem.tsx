import { Card, Col } from 'react-bootstrap';

type CampaignItemProps = {
    photoUrl: string;
    achievementRate: number;
    title: string;
    nickname: string;
    onClick?: () => void;
};

const CampaignItem: React.FC<CampaignItemProps> = ({
    photoUrl,
    achievementRate,
    title,
    nickname,
    onClick,
}: CampaignItemProps) => {
    const defaultClick = () => {};
    return (
        <Col xs="12" sm="6" lg="4" style={{ marginBottom: '24px' }} onClick={onClick ? onClick : defaultClick}>
            <Card onClick={() => console.log('hi')}>
                <Card.Img variant="top" src={photoUrl}></Card.Img>
                <Card.Body>
                    <Card.Title className="fw-bold text-primary">{`${achievementRate.toLocaleString(
                        'ko-KR'
                    )}% 달성`}</Card.Title>
                    <Card.Text>{title}</Card.Text>
                    <Card.Text
                        style={{
                            color: '#808080',
                            fontSize: '0.8rem',
                        }}
                    >
                        {nickname}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CampaignItem;
