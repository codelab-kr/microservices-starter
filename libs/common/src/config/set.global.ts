import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setGlobal(app: INestApplication) {
  const conf = app.get(ConfigService);

  const env = conf.get('NODE_ENV') ?? 'development';
  const sessionAuth = conf.get('SESSION_AUTH') === 'true';
  const port = conf.get('PORT');
  const baseUrl =
    env !== 'production' ? `http://localhost:${port}` : conf.get('BASE_URL');

  app.enableCors();

  global[Symbol.for('env')] = env;
  global[Symbol.for('port')] = port;
  global[Symbol.for('baseUrl')] = baseUrl;
  global[Symbol.for('sessionAuth')] = sessionAuth; // boolean type
}
