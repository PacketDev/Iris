import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  try {
    await app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}
bootstrap();
