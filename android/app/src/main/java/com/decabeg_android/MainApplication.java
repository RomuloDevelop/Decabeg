package com.decabeg_android;

import android.app.Application;
//import android.support.multidex.MultiDexApplication;
// Facebook SingIn
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
//
import com.facebook.react.ReactApplication;
import com.reactlibrary.RNAdcolonyPackage;
//#region Firebase storage
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
//#endregion
import com.bugsnag.BugsnagReactNative;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;

import com.imagepicker.ImagePickerPackage;

import com.oblador.vectoricons.VectorIconsPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
//#region Unimodules Packages
import com.decabeg_android.generated.BasePackageList;

import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;
 //#endregion
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  //Unimodules
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), Arrays.<SingletonModule>asList());
 
  //#region Facebook SingIn
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  //#endregion
  
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNAdcolonyPackage(),
            new RNFirebasePackage(),
            new RNFirebaseStoragePackage(),
            BugsnagReactNative.getPackage(),
            new RNDeviceInfo(),
            new ModuleRegistryAdapter(mModuleRegistryProvider),
            new ReactNativeOneSignalPackage(),
            new NetInfoPackage(),
            new RNGestureHandlerPackage(),
            new BackgroundTimerPackage(),
            new ReactVideoPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNGoogleSigninPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
