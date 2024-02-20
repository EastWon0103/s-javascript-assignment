type IGlobalResponse = {
    success: boolean;
    message: string;
    status: number;
    result?: any;
};

type GlobalResponseProps = {
    success?: boolean;
    message?: string;
    status?: number;
    result?: any;
};

// default is success
class GlobalResponse implements IGlobalResponse {
    success: boolean;
    status: number;
    message: string = 'success';
    result?: any;

    constructor({ success, status, message, result }: GlobalResponseProps) {
        if (success === undefined || success === null) success = true;

        this.success = success ? success : false;
        this.status = status ? status : 200;
        this.message = message ? message : 'API Call Success';
        this.result = result;
    }
}

export { IGlobalResponse, GlobalResponse };
