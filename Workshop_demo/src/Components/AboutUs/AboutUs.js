import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ActivityIndicator, AsyncStorage, FlatList, ScrollView, Dimensions,
    TextInput
} from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../Common/Header'
import { Button, Icon } from 'react-native-elements'
import * as firebase from "firebase";

const { width, height } = Dimensions.get("window")
import * as ABOUTUS from '../../Constant'

import { styles } from './styles'

class AboutUs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1,}}>
            <View style={styles.container}>
                <Header title={ABOUTUS.ABOUT} navigateClick={() => this.props.navigation.navigate('DrawerOpen')} />
                <ScrollView>
                    <View>
                        <View style={styles.viewSection}>

                            <Text style={styles.text}>{ABOUTUS.ABOUT}</Text>
                            <Text style={styles.detailText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Praesent iaculis turpis sed ante ornare, eget iaculis nunc interdum.
                                Nunc vitae turpis at metus volutpat vehicula vitae non augue.
                                In eleifend dignissim elit tincidunt scelerisque. Pellentesque id mauris feugiat,
                                viverra elit vitae, tempus urna. Donec semper dui quis urna aliquam, non maximus mi
                                tincidunt. Pellentesque tristique cursus erat, a sagittis nisi tempor eu.
                          </Text>

                        </View>
                        <View style={styles.viewSection}>
                            <Text style={styles.text}>DUMMY TEXT</Text>
                            <Text style={styles.detailText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                 Praesent iaculis turpis sed ante ornare, eget iaculis nunc interdum.
                                  Nunc vitae turpis at metus volutpat vehicula vitae non augue.
                                  In eleifend dignissim elit tincidunt scelerisque. Pellentesque id mauris feugiat,
                                   viverra elit vitae, tempus urna. Donec semper dui quis urna aliquam, non maximus mi
                                   tincidunt. Pellentesque tristique cursus erat, a sagittis nisi tempor eu.
                                   In eleifend dignissim elit tincidunt scelerisque. Pellentesque id mauris feugiat,
                                   viverra elit vitae, tempus urna. Donec semper dui quis urna aliquam, non maximus mi
                                   tincidunt. Pellentesque tristique cursus erat, a sagittis nisi tempor eu.
                          </Text>
                        </View>
                        <View style={styles.viewSection}>
                            <Text style={styles.text}>DUMMY TEXT</Text>
                            <Text style={styles.detailText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                 Praesent iaculis turpis sed ante ornare, eget iaculis nunc interdum.
                                  Nunc vitae turpis at metus volutpat vehicula vitae non augue.
                                  In eleifend dignissim elit tincidunt scelerisque. Pellentesque id mauris feugiat,
                                viverra elit vitae, tempus urna. Donec semper dui quis urna aliquam, non maximus mi
                                tincidunt. Pellentesque tristique cursus erat, a sagittis nisi tempor eu.
                          </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            </SafeAreaView>
        );
    }
}

export default AboutUs



