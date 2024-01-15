import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { engine } from 'express-handlebars';

export function setHbs(app: NestExpressApplication) {
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: resolve('public/views/layouts'),
      partialsDir: resolve('public/views/partials'),
    }),
  );
  app.set('view engine', 'hbs');
  app.set('views', resolve('public/views'));
}
