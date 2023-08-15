import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { isArray } from "class-validator";
@Controller('currency')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) {}

    @Get('items-price')
    calculateItemPrice(
        @Query('itemIds') itemIds: number[],
        @Query('targetCurrency', ValidationPipe) targetCurrency: string,
    ): number {
        if(!isArray(itemIds)){
            itemIds = JSON.parse(itemIds);
        }

        return this.calculatorService.calculateTotalPrice(itemIds, targetCurrency);
    }

    @Get('total-price')
    calculateTotalPrice(
        @Query('targetCurrency', ValidationPipe) targetCurrency: string,
    ): number {

        return this.calculatorService.calculateTotalPrice('all', targetCurrency);
    }
}
