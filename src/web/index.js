import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import moment from 'moment';
import 'moment/locale/id';
import router from './router';

moment.locale('id');

const server = express();
server.set('views', path.join(__dirname, '../../resources/views/pages'));
server.set('view engine', 'pug');
server.use('/assets', express.static(path.join(__dirname, '../../resources/assets')));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

server.use(router);

export {
  server,
};
