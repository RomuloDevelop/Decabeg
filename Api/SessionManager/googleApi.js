
import { GoogleSignin , statusCodes } from 'react-native-google-signin';


  function getUserModelGoogle(user){
    const userDataModel = {
      username:user.name,
      avatar: user.photo,
      lastnames: user.familyName
    };

    const userAccount = {
        password: user.id,
        email: user.email
    };
    console.log({userAccount, userDataModel})
    const data = {userAccount, userDataModel};
    return data;
  }

  async function signOut(){
    try {
      if(await GoogleSignin.isSignedIn()){
        console.log('google out');
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        return true;
      }
      return false;
    } catch (ex) {
      throw ex;
    }
  }
  
  async function signInGoogle(){
    try {
      await GoogleSignin.hasPlayServices();
      console.log('has play services!');
      const {user} = await GoogleSignin.signIn();
      console.log(user);
      return getUserModelGoogle(user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log(error);
      }
    }
  };
  async function getCurrentUserInfo(){
    try {
      const {user} = await GoogleSignin.signInSilently();
      return getUserModelGoogle(user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('Google: user has not signed in yet');
      } else {
        console.log(error);
      }
      throw "Error getting google info";
    }
  };

async function googleSilently(){
  const user = await getCurrentUserInfo();
  return user;  
}

export {
  signOut,
  signInGoogle,
  getCurrentUserInfo,
  googleSilently
}