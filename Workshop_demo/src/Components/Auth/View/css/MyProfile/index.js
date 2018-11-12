//MYProfile css
import { Dimensions, StyleSheet, Platform, Image } from 'react-native'
const { height, width } = Dimensions.get('window');


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    spinner: {
        position: 'absolute',
        top: height / 7,
        left: width / 2 - 40,
        zIndex: 1000
    },

    //start update info 
    updateinfo: {
        paddingLeft: 30, paddingRight: 30
    },
    updateinfolabel: {
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'HiraginoSansCNS-W3',
        color: '#8D8B8E'
    },
    updateinfoText: {
        height: 50,
        textAlign: 'center'
    },
    updateButton: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 20,
        paddingBottom: 10
    },
    //end update info 

    //start section 

    section: {
        backgroundColor: '#504d50',
        height: 45
    },

    sectionText: {
        fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: '#fff',
        marginLeft: 15,
        paddingTop: 15
    },

    insideSectiontouch: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 15,
        paddingTop: 15

    },
    insideSectiontouchText1: {
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'HiraginoSansCNS-W3',
        color: '#8D8B8E'

    },
    insideSectiontouchText2: {
        height: 40,
        textAlign: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#D3D3D3'
    },

    //end section 

    //Start Modal email
    modalStyle: {
        width: '95%',
        alignSelf: 'center',
    },
    modalOuter: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    headerText: {
        color: '#000000', fontWeight: 'bold', fontSize: 18, textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3',
    },
    ModalInsideViewouter: {
        paddingLeft: 30,
        paddingRight: 30
    },


    //End Modal email

    ModalInsideView: {
        backgroundColor: "#fff",

        width: width - 50,
        //paddingHorizontal: 5,
        paddingVertical: 15,
        // alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    // ModalInsideView1: {


    //     backgroundColor: "#fff",
    //     height: 330,
    //     alignSelf: 'center',
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: '#fff'

    // },


})
