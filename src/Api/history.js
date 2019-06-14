import { executeRequest } from './axiosInstance';


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
async function sendGetHistory(group=1){
    try{
        const response = await executeRequest('get', `history/group/${group}`);
        const data = response.data.resource.history;
        console.log(data);
        return data;
    } catch(ex) {
        throw ex;
    }
}

async function sendPostHistory(videoId){
    try{
        const response = await executeRequest('post', `history/${videoId}`);
        const data = response.data.resource.history;
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendDeleteHistory(deleteAll, historyId){
    try {
        const uriData = deleteAll? `history`:`history/${historyId}`;
        const response = await executeRequest('delete', uriData);
        return response;
    } catch(ex){
        throw ex;
    }
}

export {
    sendGetHistory,
    sendPostHistory,
    sendDeleteHistory
}
