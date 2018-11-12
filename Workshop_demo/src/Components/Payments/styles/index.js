import { Dimensions, StyleSheet, Platform, Image } from 'react-native'
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'white'
    },
    ModalInsideView: {

        backgroundColor: "#fff",
        height: 250,
        width: width - 50,
        paddingHorizontal: 10,
        // alignItems: 'center',
        // alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'

    },
    myInvoices: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#8D8B8E'
    },
    myInvoiceText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    payText: {
        color: 'white'
    },
    payButton: {
        backgroundColor: '#ff3333',
        width: width / 4 - 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 25
    },
    vehicleFlatlistView: {
        backgroundColor:'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        // borderBottomColor: '#E9E9E9',
        // borderBottomWidth: 2
        borderColor: '#dcdcdc',
        borderWidth: 0.5,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        //shadowColor: '#dcdcdc',
        // shadowOffset: { width: 40, height: 50 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,

    },
    vehicleText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    mainView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderNumber: {
        fontSize: 16, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: '#8D8B8E',
        paddingVertical: 2,
    },
    repairTextAndDate: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    dollarText: {
        color: 'black',
        fontSize: 20
    },
    repairCost: {
        color: 'black',
        fontSize: 20
    },
    invoiceCreatedDate: {
        color: 'grey',
        fontStyle: 'italic',
        fontSize: 10
    },
    nodataView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30
    },
    nodataText: {
        fontSize: 16,
        color: 'black',
    }

})