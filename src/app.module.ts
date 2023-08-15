import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator/calculator.service';
import { CalculatorController } from './calculator/calculator.controller';

@Module({
  imports: [],
  providers: [CalculatorService],
  controllers: [CalculatorController],
})

export class AppModule {}
