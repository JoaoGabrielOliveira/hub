import Environment from './config/Enviroment';
import ExpressServer from './Server';
import { logInfo } from './util/Events';


ExpressServer.listen(parseInt(Environment.PORT), Environment.HOST,
() => logInfo(`Server running on http://${Environment.HOST}:${Environment.PORT}`, {}))