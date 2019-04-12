
import moment from 'moment';

 const fetchData= [
    {
        video_id: "86619003-ECB3-4E50-A3D9-881EF2A19317",
        name: "El Conejo",
        link: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
        provider_logo: "path",
        views: 1,
        date: "2019-03-16 14:25:43"
    },
    {
        video_id: "06026CFD-4166-4DCF-8C85-30D8496E77FB",
        name: "iPhone-XR",
        link: "https://app.coverr.co/s3/mp4/Scrolling-iPhone-XR.mp4",
        provider_logo: "path",
        views: 1,
        date: "2019-03-17 12:29:23"
    },
    {
        video_id: "06026CFD-4166-4DCF-8C85-30D8496E77FB",
        name: "iPhone-XR",
        link: "https://app.coverr.co/s3/mp4/Scrolling-iPhone-XR.mp4",
        provider_logo: "path",
        views: 1,
        date: "2019-03-17 12:29:23"
    },
    {
        video_id: "06026CFD-4166-4DCF-8C85-30D8496E77FB",
        name: "iPhone-XR",
        link: "https://app.coverr.co/s3/mp4/Scrolling-iPhone-XR.mp4",
        provider_logo: "path",
        views: 1,
        date: "2019-03-15 12:29:23"
    },
    {
        video_id: "06026CFD-4166-4DCF-8C85-30D8496E77FB",
        name: "iPhone-XR",
        link: "https://app.coverr.co/s3/mp4/Scrolling-iPhone-XR.mp4",
        provider_logo: "path",
        views: 1,
        date: "2019-03-15 12:29:23"
    }
];

function toArrayHistory(data) {
       let duplicatedKeys = data.map(item=>item.date);
    let key = duplicatedKeys.filter((item, index, array)=>array.indexOf(item) === index);
    let historyArray = key.map((itemKey)=>{
        const arrayItem = data.filter(item=>{
            if(item.date === itemKey){
                delete item.date;
                return true
            }
            return false;
        });
        return {name:itemKey,data:arrayItem}
    });

    let historyArrayFormated = historyArray.map((item)=>{
        const key = item.name;
        if(!moment(key).isSame(moment(),'year'))
            return item;
        if(!moment(key).isSame(moment(),'month'))
            return item;
        if(moment(key).diff(moment(),'day')===0){
            item.name = "Today";
            return item;
        }
        else if(moment(key).diff(moment(),'day')===-1){
            item.name = "Yesterday";
            return item;
        }
        else return item;
    });
    return historyArrayFormated;
}

const formatedData=[
    {
        name:"Yesterday",
        data:[
            {
                video_id: "86619003-ECB3-4E50-A3D9-881EF2A19317",
                name: "El Conejo",
                link: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
                provider_logo: "path",
                views: 1
            }
        ]
    },
    {
        name:"Today",
        data:[{
                video_id: "06026CFD-4166-4DCF-8C85-30D8496E77FB",
                name: "iPhone-XR",
                link: "https://app.coverr.co/s3/mp4/Scrolling-iPhone-XR.mp4",
                provider_logo: "path",
                views: 1
            },
            {
                video_id: "06026CFD-4166-4DCF-8C85-30D8496E77FB",
                name: "iPhone-XR2",
                link: "https://app.coverr.co/s3/mp4/Scrolling-iPhone-XR.mp4",
                provider_logo: "path",
                views: 1
            }
        ]  
    },
    {
        name:"2019-03-15 12:29:23",
        data:[{
                video_id: "06026CFD-4166-4DCF-8C85-30D8496E77FB",
                name: "iPhone-XR",
                link: "https://app.coverr.co/s3/mp4/Scrolling-iPhone-XR.mp4",
                provider_logo: "path",
                views: 1
            },
            {
                video_id: "06026CFD-4166-4DCF-8C85-30D8496E77FB",
                name: "iPhone-XR",
                link: "https://app.coverr.co/s3/mp4/Scrolling-iPhone-XR.mp4",
                provider_logo: "path",
                views: 1
            }
        ]
    }
]

xit('testing HistoryArray', () => {
    const data = toArrayHistory(fetchData);
    console.log(data)
    expect(data).toEqual(formatedData);
});

deleteHistoryItem = (parentIndex, childIndex, history) =>{
    const {data} = history[parentIndex];
    data.splice(childIndex, 1);
    history.data = data;
    return history;
}

it('testing deleteHistory', ()=> {
    const data = deleteHistoryItem(1,0,formatedData);
    expect(data.length).toBe(3);
    expect(Object.keys(data[1])).toEqual([
        'name',
        'data'
    ]);
    expect(data[1].data.length).toBe(1);
    expect(Object.keys(data[1].data[0])).toEqual([
                "video_id",
                "name",
                "link",
                "provider_logo",
                "views"
    ]);
    expect(data[1].data[0].name).toBe("iPhone-XR2");

    
  
})