import { Dimensions, StyleSheet, Image } from 'react-native'
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    currentView: {
        backgroundColor: '#504E51',
        padding: 10
    },
    pastView: {
        backgroundColor: '#8D8B8E',
        padding: 10
    },
    currentRepairText: {
        color: 'white',
        fontSize: 16
    },
    modalViewContainer: {
         borderRadius: 10,
         paddingLeft:20,
         backgroundColor: "#fff",
         // height: 250,
         alignSelf: 'center',
         borderWidth: 1,
         borderColor: '#fff'
 
        },

    payTopTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    selectOption: {
        alignSelf: 'center',
        flexDirection: 'row',
        // marginLeft:20
        // paddingHorizontal:30
        // flexDirection: 'row',
        // justifyContent: 'center'
    },
    paymentOption: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    paymentMethod: { height: 28 },

    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 15
    },
    cancelContinue: {
        width: width / 3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 25,
    },
    nodataView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    nodata: { fontSize: 16, color: 'black' },

    repairDetailView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    paddingText: {
        padding: 5
    },
    upperSection: {
        flex: 0.6,
        flexDirection: 'column',
        padding: 10
    },
    bottomSection: {
        flex: 0.4,
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    repairCost: {
        color: 'red',
        fontSize: 26,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center'
    },
    dollorText: {
        color: 'grey',
        fontSize: 18
    },
    payButton: {
        backgroundColor: '#ff3333',
        width: width / 4 - 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 25
    },
    payText: {
        color: 'white'
    },
    ModalInsideView: {

        padding:20,
        backgroundColor: "#fff",
        // height: 250,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'

    },
    signature: {
        height: 150,
        borderColor: '#000033',
        borderWidth: 1,
    },
})