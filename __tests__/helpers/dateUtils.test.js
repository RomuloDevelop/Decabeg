import { timeForExpiration } from '../../helpers/dateUtils';

it('testing time for expiration',()=>{
    expect(timeForExpiration(1554587228)).toBeDefined();
})