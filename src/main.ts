import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS configuration - allow multiple origins
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:4200'];
  
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('Backend running on port', process.env.PORT ?? 3000);
  console.log('Allowed origins:', allowedOrigins);
}
bootstrap();
