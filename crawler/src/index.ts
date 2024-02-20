import figlet from 'figlet';
import { dbSetUp } from './db/dbSetUp';
import chalk from 'chalk';
import { getCampaignData, getCommentData } from './api/apiUtil';
import { persistCampaigns } from './db/campaign/persistCampaigns';
import { persistComments } from './db/comment/persistComments';
import { Types } from 'mongoose';
import { Campaign } from './db/campaign/campaignModel';

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
};

const run = async () => {
    try {
        console.log(figlet.textSync('Wadiz Crawler'));

        console.log(chalk.bgWhite.bold('Processing') + ': Crawling Start');

        await dbSetUp();
        console.log(chalk.bgGreen.bold('✔︎ Success') + ': Mongo DB Connected & Clear Data\n');

        const campaigns: CampaignComposition[] = await getCampaignData();
        const comments: Map<number, CommentComposition[]> = await getCommentData(
            campaigns.map((campaign) => campaign.campaignId)
        );
        console.log(chalk.bgGreen.bold('✔︎ Success') + ': Get All Data\n');

        await persistCampaigns(campaigns);
        await persistComments(comments);
        console.log(chalk.bgGreen.bold('✔︎ Success') + ': Persist All Data\n');

        console.log(chalk.green('Crawling is Complete! Check Your DB'));
    } catch (err) {
        console.error(chalk.bgRedBright.bold('x Crawling Failed') + `: ${getErrorMessage(err)}`);
    } finally {
        process.exit();
    }
};

run();
