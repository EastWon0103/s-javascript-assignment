type CampaignResponse = {
    status: number;
    data: {
        count: number;
        list: Array<CampaignComposition>;
    };
};

type CampaignComposition = {
    campaignId: number;
    title: string;
    whenOpen: string;
    nickName: string;
    achievementRate: number;
    categoryName: string;
    totalBackedAmount: number;
    photoUrl: string;
    coreMessage: string;
};
