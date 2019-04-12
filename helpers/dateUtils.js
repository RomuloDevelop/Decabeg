import moment from 'moment';

function timeForExpiration(unixtime){
    //const date = moment.unix(unixtime).utc();
    //const vnzDate = moment.parseZone(date.format().replace('Z','-04:30')).format();
    const date = moment.unix(unixtime);
    const difference = date.diff(moment(), 'seconds');
    return difference;
}

export{ timeForExpiration }