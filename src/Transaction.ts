import axios from 'axios';
import { Coin } from './Coin';
import { config } from './config';
import { Network } from './Network';

interface CoinSpend {
    coin: Coin;
    puzzle_reveal: string;
    solution: string;
}

interface SpendBundle {
    aggregated_signature: string;
    coin_spends: CoinSpend[];
}

interface CreateTransaction {
    spend_bundle: SpendBundle;
}

interface PushTransactionResponse {
    status: string;
}

export class Transaction {
    private readonly API_VERSION = 'v1';
    private readonly ENDPOINT = '/transaction';

    public constructor(private readonly network: Network) {}

    public async push(transaction: CreateTransaction): Promise<PushTransactionResponse> {
        try {
            const { status, data } = await axios.post<PushTransactionResponse>(`${config.protocol}://${this.network}-api.matsutake.io/${this.API_VERSION}${this.ENDPOINT}`, transaction);
    
            if (status === 200 && data.status === 'success') {
                return data;
            }
        } catch (err) {}
    
        throw new Error('Request was rejected by full node');
    }
}
