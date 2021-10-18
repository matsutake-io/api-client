import { URLSearchParams } from 'url';
import axios from 'axios';
import { Coin } from './Coin';
import { config } from './config';

interface GetCoinsOptions {
    puzzle_hash: string;
    start_height?: number;
    end_height?: number;
    include_spent_coins?: boolean;
}

interface CoinRecord {
    coin: Coin;
    coinbase: boolean;
    confirmed_block_index: number;
    spent: boolean;
    spent_block_index: number;
    timestamp: string;
}

interface GetCoinsResponse {
    status: string;
    coins: CoinRecord[];
}

const API_VERSION = 'v1';
const ENDPOINT = '/coins';

const get = async(options: GetCoinsOptions): Promise<GetCoinsResponse> => {
    if (!options.puzzle_hash) {
        throw new Error('Puzzle hash is required');
    }

    try {
        const query = new URLSearchParams({
            ...(options.start_height ? { start_height: options.start_height.toString() } : {}),
            ...(options.end_height ? { end_height: options.end_height.toString() } : {}),
            ...(options.include_spent_coins ? { include_spent_coins: options.include_spent_coins.toString() } : {})
        });
        const { status, data } = await axios.get<GetCoinsResponse>(`${config.protocol}://${config.host}/${API_VERSION}${ENDPOINT}/${options.puzzle_hash}${query.toString() ? `?${query.toString()}` : ''}`);

        if (status === 200 && data.status === 'success') {
            return data;
        }
    } catch (err) {}

    throw new Error('Request was rejected by full node');
};

export const coins = {
    get
};
