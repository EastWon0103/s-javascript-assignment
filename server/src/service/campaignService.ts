import { Campaign, ICampaign } from '../db/campaign/campaignModel';

const getAllCampaigns = async () => {
    const campaigns: Array<ICampaign> = await Campaign.find({});
    return campaigns.map((campaign) => {
        return {
            campaignId: campaign.campaignId,
            title: campaign.title,
            nickname: campaign.nickname,
            photoUrl: campaign.photoUrl,
            achievmentRate: campaign.achievementRate,
        };
    });
};

const getCampaignDetail = async (campaignId: string) => {
    return await Campaign.findOne({ campaignId: campaignId }).populate({
        path: 'comments',
        match: { parent: null },
        populate: {
            path: 'commentReplys',
            model: 'comment',
        },
    });
};

export { getAllCampaigns, getCampaignDetail };
