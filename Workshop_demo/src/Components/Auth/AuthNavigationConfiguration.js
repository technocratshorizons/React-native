
import { StackNavigator } from 'react-navigation'
// Sreens
import Login from './View/Login'
import Signup from './View/Signup'

const AuthConfiguration = {
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        },
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            header: null
        },
    },

}
export default StackNavigator(AuthConfiguration)


