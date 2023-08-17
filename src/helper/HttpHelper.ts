import http2 from 'http2';

export default class HttpHelper {
    static get NOT_FOUND () { return HttpHelper.CODE.HTTP_STATUS_NOT_FOUND }
    static get BAD_REQUEST () { return HttpHelper.CODE.HTTP_STATUS_BAD_REQUEST }

    static get CODE () {
        return http2.constants
    }
}