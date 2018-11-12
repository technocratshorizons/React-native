import React, { Component } from 'react';
import { WebView, ActivityIndicator, Platform, TouchableOpacity, StyleSheet, TextInput, View } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import * as SCHEDULE from '../../Constant'

export default class Web extends Component {

    static navigationOptions = {
        header: null
    }
    constructor(props) {

        super(props);

        this.state = {
            data: 'hgdajgdagddgadgjag'
        }

    }


    ActivityIndicatorLoadingView() {

        return (

            <ActivityIndicator
                color='#ff3333'
                size='large'
                style={styles.ActivityIndicatorStyle}
            />
        );
    }




    leftComponent() {
        return (
            <TouchableOpacity hitSlop={{ top: 30, bottom: 30, right: 30, left: 30 }} onPress={() => this.props.navigation.goBack()} >
                <Icon name="chevron-left" size={40} color='white' />
            </TouchableOpacity>
        )
    }




    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={this.leftComponent()}
                    centerComponent={{ text: `${SCHEDULE.SCHEDULE_APPOINTMENT}`, style: { color: '#fff', fontSize: 20, fontWeight: 'bold', fontFamily: 'HiraginoSansCNS-W6' } }}
                    backgroundColor="#ff3333"
                />


                {/* <Header
                    placement="left"

                    rightComponent={{ icon: 'close', color: '#000000' }}
                    backgroundColor={'#F8F8F8'}
                    outerContainerStyles={{ height: 50 }}
                /> */}
                <WebView
                    source={{ uri: this.props.navigation.state.params.data }}
                    style={styles.WebViewStyle}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    renderLoading={this.ActivityIndicatorLoadingView}
                    startInLoadingState={true}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create(
    {

        WebViewStyle:
        {
            marginTop: (Platform.OS) === 'ios' ? 20 : 0
        },

        ActivityIndicatorStyle: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'

        }
    });