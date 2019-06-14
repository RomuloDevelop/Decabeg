import {executeRequest} from './axiosInstance';
import {
    getFunctionName
} from '../helpers';

const videos = [
            {
                video_id: "21EF6574-A063-4E22-88AF-6F169153BAF4",
                name: "Cascada-Japon",
                link: "https://tekeye.uk/html/images/Joren_Falls_Izu_Japan.mp4",
                provider_logo: "path",
                question: "cual es el genero",
                correct: 6,
                responses: [
                    "ciencia",
                    "deporte",
                    "animacion",
                    "cultura",
                    "política",
                    "tecnología",
                    "naturaleza",
                    "acción",
                    "gastronomía",
                    "curso",
                    "tutorial"
                ],
                total_views: 0,
                create_date: "2019-02-18 14:00:00",
                update_date: null
            },
            {
                video_id: "06026CFD-4166-4DCF-8C85-30D8496E77FB",
                name: "iPhone-XR",
                link: "https://app.coverr.co/s3/mp4/Scrolling-iPhone-XR.mp4",
                provider_logo: "path",
                question: "cual es el genero",
                correct: 5,
                responses: [
                    "ciencia",
                    "deporte",
                    "animacion",
                    "cultura",
                    "política",
                    "tecnología",
                    "naturaleza",
                    "acción",
                    "gastronomía",
                    "curso",
                    "tutorial"
                ],
                total_views: 0,
                create_date: "2019-02-18 15:00:00",
                update_date: null
            },
            {
                video_id: "86619003-ECB3-4E50-A3D9-881EF2A19317",
                name: "El Conejo",
                link: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
                provider_logo: "path",
                question: "cual es el genero",
                correct: 2,
                responses: [
                    "ciencia",
                    "deporte",
                    "animacion",
                    "cultura",
                    "política",
                    "tecnología",
                    "naturaleza",
                    "acción",
                    "gastronomía",
                    "curso",
                    "tutorial"
                ],
                total_views: 1,
                create_date: "2019-02-18 13:00:00",
                update_date: null
            }
        ]

export async function sendGetVideos(){
    try{
        const response = await executeRequest('get', `videos/group/1`);
        const data = response.data.resource.videos;
        return data;
    } catch(ex){
        return ex;
    }
}