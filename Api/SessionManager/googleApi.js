
import { GoogleSignin , statusCodes } from 'react-native-google-signin';


signInGoogle = async (signInAppOAuth) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      signInAppOAuth({email: userInfo.email, password: userInfo.password, username: userInfo.name});
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
  getCurrentUserInfo = async (signInAppOAuth) => {
    try {
      const {user} = await GoogleSignin.signInSilently();
      console.log(user);
      signInAppOAuth({email:user.email, password:user.id, username:user.name})
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('Google: user has not signed in yet');
      } else {
        console.log(error);
      }
      throw "Error getting google info";
    }
  };

async function googleSilently(signInAppOAuth){
  GoogleSignin.configure();
  await getCurrentUserInfo(signInAppOAuth);
}