import express, { NextFunction, Request, Response, Router } from 'express';
import { getAllCampaigns, getCampaignDetail } from '../service/campaignService';
import { GlobalResponse } from '../util/response/globalResponse';
import ApplicationError from '../util/error/applicationError';
import { postCommentReply, postRootComment } from '../service/commentService';
import validator from 'validator';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllCampaigns();
        res.status(200).json(
            new GlobalResponse({
                message: 'Get All Campaign',
                result: result,
            })
        );
    } catch (err) {
        if (err instanceof ApplicationError) return next(err);
        console.error(err);
        return next(new ApplicationError(500, "Can't Get All Data"));
    }
});

router.get('/:campaignId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { campaignId } = req.params;

        const result = await getCampaignDetail(campaignId);
        res.status(200).json(
            new GlobalResponse({
                message: `Get Campaign Detail at ${campaignId}`,
                result: result,
            })
        );
    } catch (err) {
        if (err instanceof ApplicationError) return next(err);
        console.error(err);
        return next(new ApplicationError(500, "Can't Parse Data"));
    }
});
router.post('/:campaignId/comments', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { campaignId } = req.params;
        const { body, userNickname } = req.body;

        if (!validator.isNumeric(campaignId)) {
            throw new ApplicationError(400, 'wrong campaign id');
        }

        const result = await postRootComment(Number(campaignId), body, userNickname);
        res.status(200).json(
            new GlobalResponse({
                message: `Post Root Comment`,
                result: result,
            })
        );
    } catch (err) {
        if (err instanceof ApplicationError) return next(err);
        console.error(err);
        return next(new ApplicationError(500, "Can't Parse Data"));
    }
});

router.post('/:campaignId/comments/:commentId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { campaignId, commentId } = req.params;
        const { body, userNickname, depth } = req.body;

        if (!validator.isNumeric(campaignId)) {
            throw new ApplicationError(400, 'wrong campaign id');
        }

        const result = await postCommentReply(Number(campaignId), commentId, body, userNickname, depth);
        res.status(200).json(
            new GlobalResponse({
                message: `Post Root Comment`,
                result: result,
            })
        );
    } catch (err) {
        if (err instanceof ApplicationError) return next(err);
        console.error(err);
        return next(new ApplicationError(500, "Can't Parse Data"));
    }
});

export default router;
