import * as nock from 'nock';
import { Matsutake } from '..';

const exampleTransaction = {
    spend_bundle: {
        aggregated_signature: '0xc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        coin_spends: [{
            coin: {
                amount: 1,
                parent_coin_info: '0xccd5bb71183532bff220ba46c268991a00000000000000000000000000004082',
                puzzle_hash: '0x4843c869bba5f65aa1e806cd372dae5668ca3b69640d067e86837ca96b324e71'
            },
            puzzle_reveal: 'ff02ffff01ff02ffff03ffff09ffff0bff0580ffff01a02cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b982480ffff01ff04ffff04ff02ffff04ff0bffff04ff17ff80808080ff8080ffff01ff088080ff0180ffff04ffff0133ff018080',
            solution: 'ff8568656c6c6fffa05f5767744f91c1c326d927a63d9b34fa7035c10e3eb838c44e3afe127c1b7675ff0280'
        }]
    }
};

describe('transaction', () => {
    describe('push', () => {
        it('sends transaction to matsutake.io REST API', async () => {
            nock(`https://testnet-api.matsutake.io/v1`)
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/transaction', exampleTransaction)
                .reply(200, { status: 'success' });
            
            const transaction = new Matsutake('testnet').transaction;
            const result = await transaction.push(exampleTransaction);

            expect(result).toEqual({ status: 'success' });
        });

        it('fails due to client side error', async () => {
            nock(`https://testnet-api.matsutake.io/v1`)
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/transaction', exampleTransaction)
                .reply(400, { status: 'failed' });

            const transaction = new Matsutake('testnet').transaction;

            expect(() => transaction.push(exampleTransaction)).rejects.toThrow(new Error('Request was rejected by full node'));
        });

        it('fails due to full node rejection of payload', async () => {
            nock(`https://testnet-api.matsutake.io/v1`)
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/transaction', exampleTransaction)
                .reply(200, { status: 'failed' });

            const transaction = new Matsutake('testnet').transaction;

            expect(() => transaction.push(exampleTransaction)).rejects.toThrow(new Error('Request was rejected by full node'));
        });

        it('fails due to server side error', async () => {
            nock(`https://testnet-api.matsutake.io/v1`)
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .post('/transaction', exampleTransaction)
                .reply(500, 'Internal server error');

            const transaction = new Matsutake('testnet').transaction;

            expect(() => transaction.push(exampleTransaction)).rejects.toThrow(new Error('Request was rejected by full node'));
        });
    });
});
