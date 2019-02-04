
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';


function infoUserFacebookManager(){
  return new Promise(async (resolve, reject)=>{
    let userInfo;
    const accessToken = (await AccessToken.getCurrentAccessToken()).accessToken;
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
        (error, result)=>{
            if (error) {
              console.log('Error fetching data: ' + error.toString());
              reject(error.toString());
            } else {
              console.log('Success fetching data: ' + JSON.stringify(result).toString());
              userInfo = result;
              console.log(`User: ${userInfo}`);
              //signInAppOAuth(userInfo);
              resolve(result);
            }
        }
      );
            
       request.addRequest(infoRequest).start();
      })
}
async function singInFacebook(){
  try{
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
  
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

export {
  facebookSilently,
  singInFacebook,
  infoUserFacebookManager
}
