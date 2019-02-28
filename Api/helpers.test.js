import { calcRemainingTime } from './helpers';

test('verifing date response to be defined', ()=>{
    expect(calcRemainingTime()).toBeDefined();
})