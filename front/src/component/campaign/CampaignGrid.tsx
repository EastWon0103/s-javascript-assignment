import { Container, Row } from 'react-bootstrap';
import CampaignItem from './CampaignItem';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { customAxios } from '../../util/axios/customAxios';

type CampaignsResponse = {
    success: boolean;
    message: string;
    result: CampaignSummary[];
};

const CampaignGrid: React.FC = () => {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);

    const fetchCampaigns = async () => {
        try {
            const { data } = await customAxios.get<CampaignsResponse>('/api/campaigns');
            setCampaigns(data.result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return (
        <Container className="px-0">
            <Row>
                {campaigns.map((campaign) => (
                    <CampaignItem
                        key={campaign.campaignId}
                        photoUrl={campaign.photoUrl}
                        achievementRate={campaign.achievmentRate}
                        title={campaign.title}
                        nickname={campaign.nickname}
                        onClick={() => {
                            navigate(`/campaigns/${campaign.campaignId}`);
                        }}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default CampaignGrid;
