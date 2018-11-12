import { Dimensions, StyleSheet, Image } from 'react-native'
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewSection: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 20
    },
    text: {
        color: 'black',
        fontSize: 18,
        paddingVertical: 10,
        color: '#8D8B8E',
        fontFamily: 'HiraginoSansCNS-W3',
        fontWeight: 'bold'
    },
    detailText: {
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'justify',
        fontFamily: 'HiraginoSansCNS-W3'
    }

})