
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';
import { setUserData, setUserPicture } from '../../dataStore/sessionData';


function getUserModelFacebook(user){
  const userDataModel = {
      username: user.name,
      avatar: user.picture
  }

  const userAccount = {
      password: user.id,
      email: user.email
  }
  const data = {userAccount, userDataModel};
  return data;
}

async function signOut(){
  try {
    const token = await AccessToken.getCurrentAccessToken()
    if(token){
      console.log('facebook out');
      LoginManager.logOut();
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
}

async function singInFacebook(){
  try{
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email','user_photos'])
  
    console.log(`result: ${JSON.stringify(result)}`);
    if (result.isCancelled) {
      console.log('Login was cancelled');
    } else {
      console.log('Login was successful with permissions: '
        + result.grantedPermissions.toString());
      return await infoUserFacebookManager()
    }
  } catch(ex){
    throw 'Login failed with error: ' + ex;
  }
}

function infoUserFacebookManager(){
  return new Promise(async (resolve, reject)=>{
    const accessToken = await AccessToken.getCurrentAccessToken();
    const request = new GraphRequestManager();
    const infoRequest = new GraphRequest(
        '/me',{
            parameters: {
              fields: {
                string: 'email,name'
              },
              accessToken:  {
                string: accessToken.toString() // put your accessToken here
              },
            }
          }, 
        async (error, result)=>{
          try{
            if (error) {
              console.log('Error fetching data: ' + error.toString());
              reject(error.toString());
            } else {
              console.log('Success fetching data: ' + JSON.stringify(result).toString());
              result.picture = null; //await getFacebookPicture();
              const user = getUserModelFacebook(result);
              resolve(user);
            }
          }catch(ex){
            reject(ex);
          }
        }
      );
            
       request.addRequest(infoRequest).start();
      })
}

async function facebookSilently(){
  try{
    const token = await AccessToken.getCurrentAccessToken()
    if(token.accessToken){
      return await singInFacebook();
    } else console.log("No facebook token found")
  }catch(ex) {
    throw ex
  };
}

async function getFacebookPicture(){
    return new Promise(async (resolve, reject)=>{
      const request = new GraphRequestManager();
      const accessToken = await AccessToken.getCurrentAccessToken();
      const infoRequest = new GraphRequest(
          '/me/picture',{
            parameters: {
              type: {
                string: 'large'
              },
              accessToken:  {
                string: accessToken.toString() // put your accessToken here
              },
            }
          },async (error, result)=>{
            try{
              if (error) {
                console.log('Error fetching data: ' + JSON.stringify(error));
                reject(error);
              } else {
                console.log('Success fetching data: ' + JSON.stringify(result));
                await setUserPicture(result);
                resolve(result);
              }
            }catch(ex){
              reject(ex);
            }
          }
        );
              
         request.addRequest(infoRequest).start();
        });
}

export {
  signOut,
  facebookSilently,
  singInFacebook,
  infoUserFacebookManager,
  getFacebookPicture
}
