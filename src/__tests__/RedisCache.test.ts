import * as pMemoize from "p-memoize";
import { RedisCache } from '..';

describe('Test RedisCache', () => {
  it('Doesn\'t log if debug not set', async () => {
    const cache = RedisCache.fromOptions();

    let n = 3;
    const counter = async (_: string) => ++n;
    const memoized = pMemoize(counter, { cache });

    const mem1 = await memoized('foo');
    const mem2 = await memoized('foo');

    console.log('TURNS OUT ', mem1, mem2)
  });
});
