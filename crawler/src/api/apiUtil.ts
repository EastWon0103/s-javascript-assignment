import axios from 'axios';
import './res/campaignResponse';
import './res/commentResponse';
import cliProgress from 'cli-progress';
import chalk from 'chalk';

const chunkSize = 10;

const getCampaignData = async (maxSize: number = 50) => {
    try {
        const bar = new cliProgress.SingleBar(
            { format: chalk.bgCyanBright.bold('○ Get Campaign') + ' {bar} {value}/{total} {percentage}%' },
            cliProgress.Presets.shades_classic
        );

        let i = 0;
        let campaigns: Array<CampaignComposition> = [];
        bar.start(maxSize, i);
        while (i < maxSize) {
            const { data } = await axios.post<CampaignResponse>(
                'https://service.wadiz.kr/api/search/funding',
                {
                    limit: i + chunkSize > maxSize ? maxSize - i : chunkSize,
                    startNum: i,
                    order: 'support',
                },
                {}
            );

            let dataSize = data.data.list.length;

            campaigns = [...campaigns, ...data.data.list];
            bar.update(campaigns.length);
            if (campaigns.length >= maxSize) break;

            i += dataSize;
        }

        bar.stop();

        return campaigns;
    } catch (_) {
        throw new Error("Can't get campaign data");
    }
};

const getCommentData = async (campaignIds: number[], maxSize: number = 40) => {
    try {
        const bar = new cliProgress.SingleBar(
            { format: chalk.bgCyanBright.bold('○ Get Comment ') + ' {bar} {value}/{total} {percentage}%' },
            cliProgress.Presets.shades_classic
        );

        let commentMap: Map<number, CommentComposition[]> = new Map();
        bar.start(campaignIds.length, 0);
        for (let campingId of campaignIds) {
            const { data } = await axios.get<CommentResponse>(
                `https://www.wadiz.kr/web/reward/api/comments/campaigns/${campingId}?page=0&size=40&commentGroupType=CAMPAIGN`
            );

            commentMap.set(campingId, data.data.content);
            bar.increment();
        }

        bar.stop();

        return commentMap;
    } catch (_) {
        throw new Error("Can't get comment data");
    }
};

export { getCampaignData, getCommentData };
