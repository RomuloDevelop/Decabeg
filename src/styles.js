import {StyleSheet} from 'react-native';

export default globalStyles = {
    lightBlue: '#FFB400',
    mediumLightBlue: '#FFBB1A',
    mediumBlue: '#FFA01D',
    darkBlue:'#E86D0E',
    fontBrown:'#FFA01D',//'#404040',
    fontGrey:'rgb(235,235,235)',
    navbarColor:'#85551C',
    textGrey:'#BBB',
    infoText:{
        color:"#FFFFFFaa", 
        textAlign:'left' , 
        marginBottom:10
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 500,
        alignSelf: 'center'
    }
};

export const buttonForm = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 15,
        backgroundColor: globalStyles.darkBlue,
        borderRadius: 10,
        overflow:'hidden',
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    textButton: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});