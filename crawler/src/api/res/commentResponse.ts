type CommentResponse = {
    status: number;
    message: string;
    data: {
        content: Array<CommentComposition>;
    };
};

interface CommentComposition {
    commentType: string;
    body: string;
    nickName: string;
    whenCreated: string;
    del: boolean;
    depth: number;
    commentReplys: Array<CommentComposition>;
}
