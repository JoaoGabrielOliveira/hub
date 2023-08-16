import Environment from './config/Enviroment';
import ExpressServer from './config/Server';
import { AppDataSource } from './database/DataSource';
import { logError, logInfo } from './util/Events';

AppDataSource.initialize().then(async () => logInfo("Initing connection with database!", {}))
    .catch(error => logError(error.message, error));

ExpressServer.listen(parseInt(Environment.PORT), Environment.HOST,
() => logInfo(`Server running on http://${Environment.HOST}:${Environment.PORT}`, {}))