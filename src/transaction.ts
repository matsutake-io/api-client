import axios from 'axios';
import { config } from './config';

const API_VERSION = 'v1';
const ENDPOINT = '/transaction';

interface Coin {
    amount: number;
    parent_coin_info: string;
    puzzle_hash: string;
}

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

const push = async (transaction: CreateTransaction): Promise<PushTransactionResponse> => {
    try {
        const { status, data } = await axios.post<PushTransactionResponse>(`${config.protocol}://${config.host}/${API_VERSION}${ENDPOINT}`, transaction);

        if (status === 200 && data.status === 'success') {
            return data;
        }
    } catch (err) {}

    throw new Error('Request was rejected by full node');
};

export const transaction = { push };
