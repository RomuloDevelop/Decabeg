import React from 'react';
import {View} from 'react-native';
import {Container,Content} from 'native-base';
import { getUserData, appAlert } from '../../../helpers';
import {sendGetUserData, sendUpdateUserData} from '../../../Api';
import SubmitButton from '../../../sharedComponents/SubmitButton';
import CardMonedero from '../../../sharedComponents/CardMonedero';
import LoaderScreen from '../../../sharedComponents/LoadScreen';
import { AdMobRewarded } from 'expo-ads-admob';
import RNAdColony from 'react-native-ad-colony';
const moneyName = 'Dicag';
const mopubId = '233b35beadd84c998c625fec6200e24c';
const zoneIdAdColony = 'vzdb56a8b971bc4dd8a8';
const appIdAdColony = 'appc82f7b3e52fb4395a3'
export default class VideoAds extends React.Component{
     constructor(props){
       super(props);
       this.bugsnag = props.screenProps.bugsnag;
       this.countAdConolonyFails = 0;
       this.adColonyReady = false;
       RNAdColony.configure(appIdAdColony,zoneIdAdColony);
       RNAdColony.loadAds(zoneIdAdColony);
       //AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
       //AdMobRewarded.setTestDeviceID('EMULATOR'); //[AdMobRewarded.simulatorId]
       AdMobRewarded.setAdUnitID('ca-app-pub-6095454139379493/6183407113');
      this.state = {
        byte: 0,
        kbyte: 0,
        mbyte: 0,
        loader: false
      };
    }

    componentDidMount() {
      AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',(reward) => this.getSaldoConvertion(reward.amount));
      AdMobRewarded.addEventListener('rewardedVideoDidOpen',() => this.setState({loader:false}));
      const {navigation} = this.props;
      navigation.addListener('didFocus',()=>{
          getUserData().then((data)=>{
              const {balance=0} = data;
              const byte = parseFloat(balance).toFixed(4);
              this.setState({
                  byte,
                  kbyte: (byte/1000).toFixed(4),
                  mbyte: (byte/1000000).toFixed(4)
              });
          });
      });
    }

    componentWillUnmount() {
      AdMobRewarded.removeAllListeners();
    }

    adMobAds = async ()=>{
      try{
        await AdMobRewarded.requestAdAsync();
        await AdMobRewarded.showAdAsync();
      } catch(ex){
        throw ex;
      }
    }

    adColonyAds = ()=>{
      RNAdColony.isReady(zoneIdAdColony,(isReady)=>{
        if(isReady){
          console.log('adcolony ready');
          this.adColonyReady = true;
          RNAdColony.showAdReward(zoneIdAdColony,(RewardName, RewardAmount)=>{
            console.log(RewardAmount);
            this.getSaldoConvertion(RewardAmount);
          });
        } else {
          console.log('adcolony no ready');
          this.countAdConolonyFails += 1
          if(this.countAdConolonyFails === 2) {
            RNAdColony.loadAds(zoneIdAdColony);
            this.countAdConolonyFails = 0;
          }
        }
      });
    }

    manageErrorAds = (message)=>{
      if(this.adColonyReady){
        this.adColonyReady = false;
        return;
      }
      switch(message){
        case 'ERROR_CODE_NO_FILL':
          appAlert('Sin anuncios', 'No se encontraron anuncios disponibles, intentelo en unos momentos');
          break;
        case 'ERROR_CODE_NETWORK_ERROR':
          appAlert('Conexión de red', 'Revise su conexión de red e intentelo de nuevo');
          break;
        case 'ERROR_CODE_INTERNAL_ERROR':
          appAlert('Servidor de anuncios', 'El servidor de anuncios presenta problemas intentelo mas tarde');
          break;
        case 'ERROR_CODE_INVALID_REQUEST':
          this.bugsnag.notify(ex);
          break;
        default:
          console.log(message);
          this.bugsnag.notify(ex);
      }
    }

    showRewarded = ()=>{
      this.setState(()=>({loader:true}),async()=>{
        try{
          await this.adMobAds();
          this.setState({loader:false});
        } catch(ex) {
          this.adColonyAds();
          setTimeout(()=>this.manageErrorAds(ex.message), 1000);
          this.setState({loader:false});
        }
      });

    }

    getSaldoConvertion = async(reward) => {
      try{
        await sendUpdateUserData({balance:reward});
        const {balance} = await getUserData();
        const newBalance = parseFloat(balance).toFixed(4);
        this.setState({
            byte: newBalance,
            kbyte: newBalance/1000,
            mbyte: newBalance/1000000,
        });
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
              <CardMonedero
                  textHeader = "Dicags"
                  text1 = {moneyName} item1 = {this.state.byte}
                  text2 = {"K"+moneyName} item2 = {this.state.kbyte}
                  text3 = {"M"+moneyName} item3 = {this.state.mbyte}
                  style = {{margin: 40}}/>
              <SubmitButton onPress={this.showRewarded} text="Videos bonificados"/>
            </Content>
          </Container>
      );
    }
}