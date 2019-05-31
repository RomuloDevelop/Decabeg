import React from 'react';
import {View} from 'react-native';
import {Container,Content} from 'native-base';
import { getUserData, appAlert } from '../../../helpers';
import {sendGetUserData, sendUpdateUserData} from '../../../Api';
import SubmitButton from '../../sharedComponents/SubmitButton';
import CardMonedero from '../../sharedComponents/CardMonedero';
import LoaderScreen from '../../sharedComponents/LoadScreen';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'expo-ads-admob';
//import RNAdColony from 'react-native-ad-colony';
const moneyName = 'Dicag';
export default class VideoAds extends React.Component{
     constructor(props){
       super(props);
    //   this.count = 0;
    //   RNAdColony.configure('app080089e21b6e4c1097','vz197109a30f1948d399');
    //   RNAdColony.setUser("Romulo");
    //   RNAdColony.loadAds("vz197109a30f1948d399");
      //AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
      AdMobRewarded.setAdUnitID('ca-app-pub-6095454139379493/6183407113');
      //AdMobRewarded.setTestDeviceID('EMULATOR'); //[AdMobRewarded.simulatorId]
      this.state = {
        byte: 0,
        kbyte: 0,
        mbyte: 0,
        loader: false
      };
    }

    componentDidMount() {
      const {navigation} = this.props;
      navigation.addListener('didFocus',()=>{
          sendGetUserData().then((data)=>{
              const {balance=0} = data;
              const byte = parseFloat(balance).toFixed(4);
              this.setState({
                  byte,
                  kbyte: (byte/1000).toFixed(4),
                  mbyte: (byte/1000000).toFixed(4)
              });
          });
      });
      AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',(reward) => this.getSaldoConvertion(reward));
      AdMobRewarded.addEventListener('rewardedVideoDidOpen',() => this.setState({loader:false}));
      AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad',(errCode) =>{
        switch (errCode) {
          case 'ERROR_CODE_NO_FILL':
            appAlert('Sin anuncios', 'No se encontraron anuncios disponibles, intentelo en unos momentos');
            break;
          default:
            break;
        }
        this.setState({loader:false});
      })
    }

    componentWillUnmount() {
      AdMobRewarded.removeAllListeners();
    }

    showRewarded = async ()=>{
      // RNAdColony.isReady('vz197109a30f1948d399',(isReady)=>{
      //   if(isReady){
      //     RNAdColony.showAdReward("vz197109a30f1948d399",(RewardName, RewardAmount)=>{
      //       this.count += RewardAmount;
      //       console.log(`${RewardName} ${this.count}`);
      //     });
      //   } else {
      //     alert('Cargando publicidades');
      //   }
      // })
      this.setState(()=>({loader:true}),async()=>{
        try{
          await AdMobRewarded.requestAdAsync();
          await AdMobRewarded.showAdAsync();
        } catch(ex){
          if(ex.message==='ERROR_CODE_NO_FILL')
            appAlert('Sin anuncios', 'No se encontraron anuncios disponibles, intentelo en unos momentos');
          console.log(ex);
        }
      });

    }

    getSaldoConvertion = async(reward) => {
      try{
        const byte = parseFloat(parseFloat(this.state.byte) + reward.amount).toFixed(4);
        await sendUpdateUserData({balance:byte});
        this.setState({
            byte,
            kbyte: byte/1000,
            mbyte: byte/1000000,
        })
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