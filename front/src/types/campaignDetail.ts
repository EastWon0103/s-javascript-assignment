type CampaignDetail = {
    campaignId: number;
    title: string;
    whenOpen: Date;
    nickname: string;
    achievementRate: number;
    categoryName: string;
    totalBackedAmount: number;
    photoUrl: string;
    coreMessage: string;
    comments: CampaignComment[];
};
