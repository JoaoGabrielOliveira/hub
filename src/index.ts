import Environment from './config/Enviroment';
import ExpressServer from './Server';


ExpressServer.listen(parseInt(Environment.PORT), Environment.HOST,
() => console.log(`Server running on http://${Environment.HOST}:${Environment.PORT}`) )