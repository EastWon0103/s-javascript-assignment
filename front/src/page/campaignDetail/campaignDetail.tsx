import { useParams } from 'react-router-dom';
import CustomNavbar from '../../component/nav/CustomNav';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { customAxios } from '../../util/axios/customAxios';
import CampaignInfo from '../../component/campaign/CampaignInfo';
import CommentList from '../../component/comment/CommentList';

type CampaignDetailResponse = {
    success: boolean;
    message: string;
    result: CampaignDetail;
};

const CampaignDetailPage: React.FC = () => {
    const { id } = useParams<string>();
    const [campaign, setCampaign] = useState<CampaignDetail | null>(null);

    const fetchCampaignDetail = async (id: string) => {
        try {
            const { data } = await customAxios.get<CampaignDetailResponse>(`/api/campaigns/${id}`);
            setCampaign(data.result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCampaignDetail(id);
        }
    }, []);

    return (
        <>
            <CustomNavbar />
            <Container className="mt-5">
                {!campaign ? (
                    <Spinner animation="border" />
                ) : (
                    <>
                        <Row className="gy-3">
                            <Col xs="12" lg="7">
                                <Image fluid src={campaign.photoUrl} rounded />
                            </Col>
                            <Col xs="12" lg="5">
                                <CampaignInfo
                                    title={campaign.title}
                                    nickname={campaign.nickname}
                                    achievementRate={campaign.achievementRate}
                                    categoryName={campaign.categoryName}
                                    totalBackedAmount={campaign.totalBackedAmount}
                                    coreMessage={campaign.coreMessage}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-5 mb-2">
                            <Col>
                                <h4>{`댓글(${campaign.comments.length})`}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CommentList comments={campaign.comments} />
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
};

export default CampaignDetailPage;
