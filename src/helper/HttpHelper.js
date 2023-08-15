import http2 from 'http2';

export default class HttpHelper {
    static get NOT_FOULD () { return HttpHelper.CODE.HTTP_STATUS_NOT_FOUND }

    static get CODE () {
        return http2.constants
    }
    
}