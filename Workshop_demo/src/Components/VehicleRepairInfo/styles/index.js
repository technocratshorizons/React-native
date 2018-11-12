import { Dimensions, StyleSheet, Image } from 'react-native'
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({


    container: {
        flex: 1,
        //backgroundColor: 'white'
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
    modalViewContainer: { borderRadius: 25 },

    payTopTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    selectOption: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        marginHorizontal: width / 4,
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
        backgroundColor:'white',
        marginHorizontal: 10, 
        marginVertical: 10, 
        //paddingHorizontal: 10, 
        //paddingVertical: 10,
        borderColor: '#dcdcdc',
        borderWidth: 0.5,
        margin: 15,
        borderRadius: 10,
        //shadowColor: '#dcdcdc',
        // shadowOffset: { width: 40, height: 50 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,

    },
    repairDetailView2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        

    },
    paddingText: {
        padding: 3
    },
    textPaddingForModalContent: {
        padding: 3
    },
    upperSection: {
        flex: 0.6,
        flexDirection: 'column',
        padding: 10,
        paddingVertical: 20
    },
    bottomSection: {
        flex: 0.3,
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    repairCost: {
        color: 'red',
        fontSize: 18,
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
        width: width / 3 - 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 25
    },
    payText: {
        color: 'white'
    },
    ModalInsideView: {

        backgroundColor: "#fff",
        height: height / 2,
        width: width - 50,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // alignItems: 'center',
        // alignSelf: 'center',
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