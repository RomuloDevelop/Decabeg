import { calcRemainingTime } from './calcdate';

xtest('verifing date response to be defined', ()=>{
    expect(calcRemainingTime(1551466538)).toBeDefined();
});

xtest('verifing date minutes',()=>{
    expect(calcRemainingTime(1551466538)).toBe(52);
});

const bool = ()=>{
    const tokenDate = new Date(1551477597*1000);
    const actualDate = new Date();
    console.log(`${JSON.stringify(actualDate)} - ${JSON.stringify(tokenDate)}`);
    const unixToday = (actualDate.getTime()/1000);
    console.log(unixToday);
    return unixToday > 1551477597;
}

test('verifing date comparation', ()=>{
    expect(bool()).toBe(false);
})