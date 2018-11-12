import React, { Component } from 'react'

import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native'
import { Header } from 'react-native-elements'
import menu from '../Assets/img/menu.png'
const add_icon = require('../Assets/img/add.png');
import Icons from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'


const hitSlop = { left: 50, right: 50, top: 50, bottom: 50 }

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    leftComponent() {
        return (
            <TouchableOpacity hitSlop={hitSlop} onPress={this.props.navigateClick}>
                {
                    this.props.leftIcon ?
                        <Ionicons name={this.props.leftIcon} color='white' size={30} />
                        :
                        <Image source={menu} style={{ width: 25, height: 20 }} />
                }
            </TouchableOpacity>

        )
    }

    rightComponent() {
        return (
            <TouchableOpacity hitSlop={hitSlop} onPress={this.props.plus}>
                <Icons name={this.props.icon} color='white' size={25} />
            </TouchableOpacity>

        )
    }

    render() {
        return (
            <Header
                leftComponent={this.leftComponent()}
                placement="left"
                centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 20, fontWeight: 'bold', fontFamily: 'HiraginoSansCNS-W6' } }}
                backgroundColor='#ff3333'
                rightComponent={this.rightComponent()}
            />

        );
    }
}

export default HeaderComponent
