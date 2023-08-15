import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CalculatorService } from './calculator/calculator.service';
import { data } from './data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.get(CalculatorService).setCurrencyAndWalletData(data.data, data["currencies-pairs"])

  await app.listen(3000);
}
bootstrap();
