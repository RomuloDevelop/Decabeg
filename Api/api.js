let myHeaders = new Headers();

async function getVideos(){
    const miInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };
    const data = await fetch('./data')
    alert(data.json())
    return data.json()
}
export default getVideos