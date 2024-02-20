import { Campaign, ICampaign } from './campaignModel';
import cliProgress from 'cli-progress';
import chalk from 'chalk';
import mongoose, { Types } from 'mongoose';

const persistCampaigns = async (campaignResponse: CampaignComposition[]) => {
    try {
        const bar = new cliProgress.SingleBar(
            { format: chalk.bgCyanBright.bold('○ Persist Campaign') + ' {bar} {value}/{total} {percentage}%' },
            cliProgress.Presets.shades_classic
        );

        bar.start(campaignResponse.length, 0);
        const campaigns: Array<ICampaign> = campaignResponse.map((c: CampaignComposition): ICampaign => {
            bar.increment();

            return {
                campaignId: c.campaignId,
                title: c.title,
                whenOpen: new Date(c.whenOpen),
                nickname: c.nickName,
                achievementRate: c.achievementRate,
                categoryName: c.categoryName,
                totalBackedAmount: c.totalBackedAmount,
                photoUrl: c.photoUrl,
                coreMessage: c.coreMessage,
            };
        });

        await Campaign.insertMany(campaigns);
        bar.stop();
    } catch (err) {
        console.error(err);
        throw new Error("Can't Persist Campaign Data");
    }
};

export { persistCampaigns };
