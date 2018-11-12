import { Dimensions, StyleSheet, Platform, Image } from 'react-native'
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white'
    },
    ModalInsideView: {

        backgroundColor: "#fff",

        width: width - 50,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // alignItems: 'center',
        // alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'

    },
    repairDetailView: {
        //paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
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

})