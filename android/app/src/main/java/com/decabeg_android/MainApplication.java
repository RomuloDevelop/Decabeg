package com.decabeg_android;

import android.app.Application;
// Facebook SingIn
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
//
import com.facebook.react.ReactApplication;
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
import org.unimodules.core.interfaces.Package;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.ads.admob.AdMobPackage;
import org.unimodules.adapters.react.ReactAdapterPackage;
 //#endregion
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  //Unimodules
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(Arrays.<Package>asList(
    new ReactAdapterPackage(),
    new AdMobPackage()), Arrays.<SingletonModule>asList());
 
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
