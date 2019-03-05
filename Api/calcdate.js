function calcRemainingTime(unixtime){
    const date = new Date(unixtime*1000);
    const actualDate = new Date();
    console.log(`${date} - ${actualDate}`);
    let sNegative=false;
    let mNegative=false;
    let seconds;
    let minutes;
    let hours;
    let remainingSeconds = date.getSeconds() - actualDate.getSeconds();
    if(remainingSeconds < 0){
    	sNegative = true
    	seconds = 60 + remainingSeconds;
    } else seconds = remainingSeconds
    
    let remainingMinutes = date.getMinutes() - actualDate.getMinutes();
    if(sNegative) remainingMinutes -= 1;
    if(remainingMinutes < 0){
    	mNegative = true;
    	minutes = 60 + remainingMinutes;
    } else minutes = remainingMinutes;
    
    let remainingHour = date.getHours() - actualDate.getHours();
    if(mNegative)remainingHour -=1; 
	hours = remainingHour;
    return minutes;
}

module.exports = {
    calcRemainingTime
}