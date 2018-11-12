import { Dimensions, StyleSheet, Platform, Image } from 'react-native'
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    vehicleFlatlistView: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomColor: '#E9E9E9',
        borderBottomWidth: 2
    },
    vehicleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderNumber: {
        color: 'grey',
        fontSize: 12,

    },
    repairTextAndDate: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    dollarText: {
        color: 'black',
        fontSize: 16
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