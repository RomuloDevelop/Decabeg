
import { GoogleSignin , statusCodes } from 'react-native-google-signin';
import { getUserModelGoogle } from '../helpers';

  async function signOut(){
    try {
      if(await GoogleSignin.isSignedIn()){
        console.log('google out');
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  }
  
  async function signInGoogle(){
    try {
      //GoogleSignin.configure();
      console.log('entre aqui');
      await GoogleSignin.hasPlayServices();
      console.log('entre aqui');
      const user = await GoogleSignin.signIn();
      alert(JSON.stringify(user))
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