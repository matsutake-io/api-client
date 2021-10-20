import { stringify } from 'querystring';
import axios from 'axios';
import { Coin } from './Coin';
import { config } from './config';
import { Network } from './Network';

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

export class Coins {
    private readonly API_VERSION = 'v1';
    private readonly ENDPOINT = '/coins';

    public constructor(private readonly network: Network) {}

    public async get(options: GetCoinsOptions): Promise<GetCoinsResponse> {
        if (!options.puzzle_hash) {
            throw new Error('Puzzle hash is required');
        }
    
        try {
            const query = stringify({
                ...(options.start_height ? { start_height: options.start_height.toString() } : {}),
                ...(options.end_height ? { end_height: options.end_height.toString() } : {}),
                ...(options.include_spent_coins ? { include_spent_coins: options.include_spent_coins.toString() } : {})
            });
            const { status, data } = await axios.get<GetCoinsResponse>(`${config.protocol}://${this.network}-api.matsutake.io/${this.API_VERSION}${this.ENDPOINT}/${options.puzzle_hash}${query ? `?${query}` : ''}`);
    
            if (status === 200 && data.status === 'success') {
                return data;
            }
        } catch (err) {}
    
        throw new Error('Request was rejected by full node');
    }
}
