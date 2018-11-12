import { Dimensions, StyleSheet, Image } from 'react-native'
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contactContainer: {
        paddingLeft: 30,
        paddingRight: 30
    },
    textView: {
        alignSelf: 'center',
        marginTop: 10
    },
    text: {
        fontSize: 16,
        fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold',
        color: '#8D8B8E'
    },
    textInputStyle: {
        height: 42,
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    textInputMessage: {
        height: 200,
        fontSize: 16,
        textAlign: 'center'
    },
    buttonView: {
        paddingLeft: 50,
        paddingRight: 50,
        marginTop: 20
    },
    buttonStyle: {
        backgroundColor: "#ff3333",
        borderRadius: 50
    },
    textStyle: { color: '#fff', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 18 },

    modalStyle: {
        width: '95%',
        alignSelf: 'center',
    },
    modalOuter: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    ModalInsideView1: {
        backgroundColor: "#fff",
        // height: 330,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'

    },


})