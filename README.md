# Matsutake REST Client

Module for interacting with the [matsutake.io](https://www.matsutake.io) REST API. Submits transactions to the Chia Blockchain.

```TypeScript
import { transaction } from '@matsutake/api-client';

await transaction.push({
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
});
```

Please enjoy!