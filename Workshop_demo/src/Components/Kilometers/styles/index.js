import { Dimensions, StyleSheet, Image } from 'react-native'
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    activityIndicator: {
        left: width / 2,
        right: width / 2,
        top: height / 2,
        bottom: height / 2,
        position: 'absolute'
    },
    historyView: {
        backgroundColor: '#8D8B8E',
        padding: 10
    },
    historyText: {
        color: 'white',
        fontSize: 16,

    },
    saveView: {
        backgroundColor: '#ff3333', width: width / 3,
        justifyContent: 'center', alignItems: 'center', padding: 7,
        borderRadius: 25,

    },

    saveText: { color: 'white' },

    save: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    textInputView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5
    },
    currentText: { color: 'white', fontSize: 18, color: 'black' },

    currentTextView: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    historyKiloMeterView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    totalKilometer: {
        color: 'red',
        fontSize: 22,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center'
    },
    kiloMetersView: {
        flex: 0.4,
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    vehicleView: {
        flex: 0.6,
        flexDirection: 'column',
        padding: 10
    },
    ModalInsideView: {

        backgroundColor: "#fff",
        height: 250,
        width: width - 50,
        //alignItems: 'center',
        //alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'

    },


})

