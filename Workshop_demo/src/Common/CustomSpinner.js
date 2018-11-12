import React from 'react';

import { View, Image, Dimensions, ActivityIndicator } from 'react-native'


var { height, width } = Dimensions.get('window')

const CustomSpinner = () => {
    return (
        <View style={{
            position: 'absolute', left: 0,
            right: 0, top: 0, bottom: 0, flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            //   backgroundColor:'blue',
            opacity: 0.9
        }}>
            <ActivityIndicator size={'large'} color='#ff3333' />
        </View>
    )
}

export { CustomSpinner };
