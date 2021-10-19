import { Coins } from './src/Coins';
import { Network } from './src/Network';
import { Transaction } from './src/Transaction';

export class Matsutake {
    private readonly transactionInstance = new Transaction(this.network);
    private readonly coinsInstance = new Coins(this.network);

    public constructor(private readonly network: Network) {}

    public get transaction(): Transaction {
        return this.transactionInstance;
    }

    public get coins(): Coins {
        return this.coinsInstance;
    }
}
