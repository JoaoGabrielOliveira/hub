export default async function SendEvent(message : string, data : any, level : string = 'info') : Promise<void>{
    switch(level){
        case 'info':
            console.log(`\x1b[34m[${level}]\x1b[0m ${message}`, data);
        break;

        case 'warn':
            console.warn(`\x1b[33m[warning]\x1b[0m ${message}`, data);
        break;

        case 'error':
            console.error(`\x1b[31m[${level}]\x1b[0m ${message}`, data);
        break;

        default:
            throw new Error("Send type level is not accept!");
    }
}

export async function logInfo(message : string, data : any) {
    return SendEvent(message, data, "info");
}
export async function logWarn(message : string, data : any) {
    return SendEvent(message, data, "warn");
}
export async function logError(message : string, data : any) {
    return SendEvent(message, data, "error");
}