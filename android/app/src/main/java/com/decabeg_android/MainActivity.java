package com.decabeg_android;
import android.content.Intent;
import android.view.View;
import android.content.res.Configuration;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     * 
     */
    @Override
    protected String getMainComponentName() {
        return "DECABEG_ANDROID";
    }
    //#region orientation 
    // @Override
    // public void onConfigurationChanged(Configuration newConfig) {
    //   super.onConfigurationChanged(newConfig);
    //   Intent intent = new Intent("onConfigurationChanged");
    //   intent.putExtra("newConfig", newConfig);
    //   this.sendBroadcast(intent);
    // }
    //#endregion
    //#region facebook SingIn 
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    //#endregion

    //#region Gesture Handler 
     @Override
     protected ReactActivityDelegate createReactActivityDelegate() {
       return new ReactActivityDelegate(this, getMainComponentName()) {
         @Override
         protected ReactRootView createRootView() {
          return new RNGestureHandlerEnabledRootView(MainActivity.this);
         }
       };
     }
    //#endregion    
    //#region Hide navigation bar
    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideNavigationBar();
        }
    }

    private void hideNavigationBar() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            | View.SYSTEM_UI_FLAG_FULLSCREEN);

    }
}
