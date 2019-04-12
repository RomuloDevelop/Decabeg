import React, {Component} from 'react';
import { 
    View, 
    Text, StyleSheet, Image } from 'react-native';

import globalStyles from '../../styles';

class CardMonedero extends Component {

    render() {
        return (
            <View style = {{flex:1}}>
                <View style = {styles.moneyCard}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardHeaderText}>{this.props.textHeader}</Text>
                    </View>
                    <View style = {styles.cardBody}>
                        <View 
                            style={[styles.cardColumn,{
                                    borderRightColor: '#dddddd',
                                    borderRightWidth: 1
                                }
                            ]}>
                            <Text style={styles.cardTitle}>{this.props.text1}</Text>
                            <Text style={styles.cardDetail}>{this.props.item1}</Text>
                        </View>
                        <View 
                            style={[styles.cardColumn,{
                                    borderRightColor: '#dddddd',
                                    borderRightWidth: 1
                                }
                            ]}>
                            <Text style={styles.cardTitle}>{this.props.text2}</Text>
                            <Text style={styles.cardDetail}>{this.props.item2}</Text>
                        </View>
                        <View style={styles.cardColumn}>
                            <Text style={styles.cardTitle}>{this.props.text3}</Text>
                            <Text style={styles.cardDetail}>{this.props.item3}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}
 
// Later on in your styles..
var styles = StyleSheet.create({
    moneyCard:{
        height: 120,
        margin: 10,
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    cardHeader:{
        flex:1,
        textAlign: "left",
        padding: 5,
        paddingLeft: 10,    
        borderBottomColor: '#dddddd',
        borderBottomWidth: 2,
    },
    cardHeaderText:{
        color:'#000', 
        fontWeight:'300', 
        fontSize: 18
    },
    cardBody: {
        flex: 3,
        margin: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
    },
    cardColumn:{
        flex: 1,
        flexDirection:"column",
        padding: 2,
    },
    cardTitle:{
        justifyContent:"flex-start",
        alignSelf: "center",
        fontSize: 20,
        fontWeight:'300',
    },
    cardDetail:{
        justifyContent:"flex-end",
        alignSelf: "center",
        fontSize: 15,
    }
});

export default CardMonedero;