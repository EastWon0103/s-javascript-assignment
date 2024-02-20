type CampaignComment = {
    id: string;
    body: string;
    commentType: string;
    campaign: number;
    userNickname: string;
    whenCreated: Date;
    depth: number;
    commentReplys: CampaignComment[];
};
