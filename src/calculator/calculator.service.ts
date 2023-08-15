import { Injectable, BadRequestException } from '@nestjs/common';
import { IWallet, Currency } from '../interfaces';

@Injectable()
export class CalculatorService {
    wallet: Map<number, IWallet>;
    currencyPairs: Currency;

    setCurrencyAndWalletData(newWallet?: IWallet[], newCurrencyPair?: Currency): void {
        this.currencyPairs = newCurrencyPair || this.currencyPairs;

        this.wallet = newWallet ? this.updateWallet(newWallet) : this.wallet
    }

    updateWallet(newWallet: IWallet[]): Map<number, IWallet> {
        const wallet = new Map<number, IWallet>();

        newWallet.forEach(item => {
            wallet.set(item.id, item);
        });

        return wallet;
    }

    calculateItemPrice(item: IWallet, targetCurrency: string) {
        if (item.currency === targetCurrency) {
            return item.price;
        }

        const pairKey = `${item.currency}-${targetCurrency}`;

        if (!this.currencyPairs[pairKey]) {
            throw new BadRequestException(`Currency pair ${pairKey} not found.`)
        }

        return item.price * this.currencyPairs[pairKey];
    }

    calculateTotalPrice(itemIds: number[] | 'all', targetCurrency: string) {
        if (itemIds === 'all') {
            itemIds = [...this.wallet.keys()];
        }

        return  itemIds.reduce((acc, itemId) => {
            const item = this.wallet.get(Number(itemId));

            if (!item) {
                throw new BadRequestException(`ItemId - ${itemId} not found.`)
            }

            acc += this.calculateItemPrice(item, targetCurrency);

            return acc;
        }, 0);
    }
}
