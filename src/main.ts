import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { getDbConnectionOptions, runDbMigrations } from '@shared/utils';

async function bootstrap() {
  console.log(process.env.NODE_ENV);
  const app = await NestFactory.create(
    AppModule.forRoot(await getDbConnectionOptions(process.env.NODE_ENV))
  );

  /**
   * Run DB migrations
   */
  await runDbMigrations();

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  await app.listen(port);

  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
