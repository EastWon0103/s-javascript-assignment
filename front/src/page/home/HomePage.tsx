import { Col, Container, Row } from 'react-bootstrap';
import CustomNavbar from '../../component/nav/CustomNav';
import CampaignGrid from '../../component/campaign/CampaignGrid';

const HomePage: React.FC = () => {
    return (
        <>
            <CustomNavbar />
            <Container>
                <Row className="my-3">
                    <Col>
                        <h2 className="fw-bold">역대 캠페인들</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CampaignGrid />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
