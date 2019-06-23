import {StyleSheet} from 'react-native';

export default globalStyles = {
    lightBlue: '#FFB400',
    mediumLightBlue: '#FFBB1A',
    mediumBlue: '#FFA01D',
    darkBlue:'#E86D0E',
    fontBrown:'#FFA01D',//'#404040',
    fontGrey:'rgb(235,235,235)',
    navbarColor:'#85551C',
    textGrey:'#BBB'
};

export const buttonForm = StyleSheet.create({
    buttonContainer: {
        marginHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 15,
        backgroundColor: globalStyles.darkBlue,
        borderRadius: 10,
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    textButton: {
        color: '#FFF',
        textAlign: 'center'
    }
});