import * as nock from 'nock';
import { coins } from '../src/coins';

describe('coins', () => {
    describe('get', () => {
        it('gets coins from matsutake.io REST API', async () => {
            nock(`https://api.matsutake.io/v1`)
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .get('/coins/0xff')
                .reply(200, {
                    status: 'success',
                    coins: []
                });

            const result = await coins.get({
                puzzle_hash: '0xff'
            });

            expect(result).toEqual({
                status: 'success',
                coins: []
            });
        });

        it('gets coins from matsutake.io REST API with start height, end height, and spent coins', async () => {
            nock(`https://api.matsutake.io/v1`)
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .get('/coins/0xff?start_height=1&end_height=5&include_spent_coins=true')
                .reply(200, {
                    status: 'success',
                    coins: []
                });

            const result = await coins.get({
                puzzle_hash: '0xff',
                start_height: 1,
                end_height: 5,
                include_spent_coins: true
            });

            expect(result).toEqual({
                status: 'success',
                coins: []
            });
        });
    });
});
