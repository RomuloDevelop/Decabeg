import React from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {Container, Content, Text} from 'native-base';
import { getUserData, appAlert } from '../../../helpers';
import {sendUpdateUserData} from '../../../Api';
import SubmitButton from '../../../sharedComponents/SubmitButton';
import CardMonedero from '../../../sharedComponents/CardMonedero';
import LoaderScreen from '../../../sharedComponents/LoadScreen';
import DynamicForm from '../../../sharedComponents/DynamicForm';
import FadeIn from '../../../Animations/FadeIn';
import { AdMobRewarded } from 'expo-ads-admob';
import globalStyles from '../../../styles';
//import RNAdcolony from 'react-native-adcolony';
// const mopubId = '233b35beadd84c998c625fec6200e24c';
//const zoneIdAdColony = 'vzdb56a8b971bc4dd8a8';
//const appIdAdColony = 'appc82f7b3e52fb4395a3';
//const zoneIdTestAdColony = 'vz48ef1a8b92a747cd9c';

const adsNumber = 200;

class VideoAds extends React.Component{
     constructor(props){
       super(props);
       this.bugsnag = props.screenProps.bugsnag;
       this.showAds = false;
       this.countAds = 0;
       //RNAdcolony.configure(appIdAdColony,zoneIdAdColony);
       //RNAdcolony.loadAds(zoneIdAdColony);
       //AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
       //AdMobRewarded.setTestDeviceID('EMULATOR'); //[AdMobRewarded.simulatorId]
       AdMobRewarded.setAdUnitID('ca-app-pub-6095454139379493/6183407113');
      this.state = {
        byte: 0,
        loader: false,
        showButton: false,
        count:0
      };
    }
    // initializeIronSourceAds=async()=>{
    //   try{
    //     const {username} = await getUserData();
    //     console.log('videoAds'+username);
    //     initializeIronSource(username);
    //     this.ironSourceManager = new IronSourceRewardedManager();
    //     this.ironSourceManager.addUnavailableListener(()=>this.errorAdMob(this.adMobErrorMessage));
    //     this.ironSourceManager.addErrorListener(()=>this.errorAdMob(adMobErrorMessage));
    //     this.ironSourceManager.addEventListener((reward)=>this.getSaldoConvertion(reward.rewardAmount/200));
    //   } catch(ex) {
    //     this.bugsnag.notify(ex);
    //   }
    // }
    componentDidMount() {
      
      //this.initializeIronSourceAds();
      AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',(reward) => this.getSaldoConvertion());
      AdMobRewarded.addEventListener('rewardedVideoDidOpen',() => {
        this.setState({loader:false})
        this.showAds = false;
      });
      AdMobRewarded.addEventListener('rewardedVideoDidClose',()=>{
        console.log('close');
        this.showAds = true;
        this.setState({count:this.countAds});
      })
      const {navigation} = this.props;
      navigation.addListener('didFocus',()=>{
          getUserData().then((data)=>{
              const {balance=0} = data;
              const byte = parseFloat(balance).toFixed(6);
              this.setState({byte});
          });
      });
    }

    componentWillUnmount() {
      AdMobRewarded.removeAllListeners();
      this.clearIntervalAds();
      //this.ironSourceManager.removeEventListener();
    }
    clearIntervalAds=()=>{
      clearInterval(this.adsInterval);
      this.showAds = false;
      this.countAds = 0;
      appAlert('Vídeos automáticos','Vídeos automáticos finalizados');
      console.log('detenido');
      this.setState({showButton:false, count:0});
    }
    adMobAds = async ()=>{
      try{
        await AdMobRewarded.requestAdAsync();
        await AdMobRewarded.showAdAsync();
      } catch(ex){
        throw ex;
      }
    }

    showAlertError = (message)=>{
      if(message !== ''){
        switch(message){
          case 'ERROR_CODE_NO_FILL':
            return {title:'Sin anuncios', error:'No se encontraron anuncios disponibles, intentelo en unos momentos'};
          case 'ERROR_CODE_NETWORK_ERROR':
            return {title:'Conexión de red', error:'Revise su conexión de red e intentelo de nuevo'};
          case 'ERROR_CODE_INTERNAL_ERROR':
            return {title:'Servidor de anuncios', error:'El servidor de anuncios presenta problemas intentelo mas tarde'};
          case 'ERROR_CODE_INVALID_REQUEST':
            this.bugsnag.notify(new Error(message));
            return {title:'Petición de anuncios', error:'Error al cargar vídeos bonificados'};
          default:
            this.bugsnag.notify(new Error(message));
            return {title:'Error inesperado', error:'Error al cargar vídeos bonificados'};    
        }
      }
    }
    showRewarded = async ()=>{
      try{
        await this.adMobAds();
      } catch(ex) {
        const message = this.showAlertError(ex.message);
        appAlert(message.title, message.error);
      } finally {
        this.setState({loader:false});
      }

    }
    showAutomaticRewarded = async ()=>{
      try{
        if(this.countAds<=adsNumber-1 && this.showAds){
          this.countAds += 1;
          await this.adMobAds();
        } else{
          this.clearIntervalAds();
          await this.adMobAds();
        }
      }catch(ex){
        const message = this.showAlertError(ex.message);
        if(this.countAds === 0){
          appAlert(message.title, message.error);
        } else
          ToastAndroid.showWithGravity(message.error,ToastAndroid.SHORT,ToastAndroid.BOTTOM);
        this.setState({count:this.countAds});
      }finally{
        console.log(this.countAds);
        this.setState({loader:false});
      }
    }

    getSaldoConvertion = async() => {
      try{
        await sendUpdateUserData({balance:0.0001});
        const {balance} = await getUserData();
        const newBalance = parseFloat(balance).toFixed(6);
        this.setState({byte: newBalance});
      } catch(ex) {
          console.log(ex);
      }
    }
    render(){
        return(
          <Container>
            <Content style={{
              flex: 1,
              backgroundColor: globalStyles.fontGrey
            }}>
            <LoaderScreen loading={this.state.loader}/>
              <CardMonedero textHeader = "Dicags" value = {this.state.byte} style = {{margin: 40}}/>
              <DynamicForm>
                <SubmitButton disabled={this.state.showButton} onPress={()=>this.setState(()=>({loader:true}),this.showRewarded)} text="Videos bonificados"/>
                <SubmitButton style={{backgroundColor:globalStyles.lightBlue}}
                  onPress={()=>{
                    if(this.state.showButton)
                      this.clearIntervalAds();
                    else{
                      this.setState(()=>({loader:true}),()=>{
                        appAlert('Modo automático', 
                        'La app buscara anuncios de forma automática, si quieres desactivar este modo presiona \'Detener\'');
                        this.setState(()=>({showButton:true}), ()=>{
                          this.showAds = true;
                          this.adsInterval = setInterval(this.showAutomaticRewarded,20000);
                        });
                      });
                    }
                  }} text={this.state.showButton?"Detener Minado":"Minar"}/>
                {this.state.showButton && 
                <FadeIn>
                  <Text style={styles.textCount}>{`Intentos restantes: ${adsNumber - this.state.count}`}</Text>
                </FadeIn>}
              </DynamicForm>
            </Content>
          </Container>
      );
    }
  }

  const styles = StyleSheet.create({
    textCount:{
      color: globalStyles.lightBlue,
      fontSize: 18,
      textAlign: 'center',
      marginTop:15
    }
  })

  export default VideoAds;