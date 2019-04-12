import {StyleSheet} from 'react-native';

export default globalStyles = {
    lightBlue: 'rgba(65, 197, 240,1.0)',
    mediumLightBlue: 'rgba(58, 174, 229,1.0)',
    mediumBlue: 'rgba(52, 152, 219,1.0)',
    darkBlue:'rgba(41, 128, 185,1.0)',
    fontGrey:'rgb(235,235,235)',
    navbarColor:'rgba(22, 122, 199, 1.0)' 
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