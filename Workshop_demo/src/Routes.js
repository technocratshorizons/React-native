import React from 'react'
import { Dimensions } from 'react-native'
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator,
  addNavigationHelpers
} from 'react-navigation';

import Auth from './Components/Auth/AuthNavigationConfiguration'

import Chat from './Components/Chat/View/Chat'
import ChatDetail from './Components/Chat/View/ChatDetail'
import Home from './Components/Dashboard/View/Home'
import SideBar from './Components/Sidebar'
import Splash from './Components/Splash'
import Signup from './Components/Auth/View/Signup'
import Login from './Components/Auth/View/Login'
import Forgotpassword from './Components/Forgotpassword/Forgotpassword';
import LoginExample from './Components/Auth/View/LoginExample';
import SignupExample from './Components/Auth/View/SignUpExample';
import MyProfile from './Components/Auth/View/MyProfile';
import Schedule from './Components/Schedule/Schedule';
import Repairwork from './Components/Repairwork/Repairwork'
import Kilometers from './Components/Kilometers/Kilometers'
import Payments from './Components/Payments/index'
import ContactUs from './Components/ContactUs/ContactUs'
import AboutUs from './Components/AboutUs/AboutUs'
import RepairWorkDetail from './Components/RepairWorkDetail/index'
import MyVehicles from './Components/MyVehicles/MyVehicles'
import MyInvoices from './Components/MyInvoices/MyInvoices'
import Web from './Components/WebView/WebView'
import VehicleRepairInfo from "./Components/VehicleRepairInfo";
// import Logout from './Components/Auth/View/LoginExample';


const RepairOrder = StackNavigator({
  Repairwork: {
    screen: Repairwork,
    navigationOptions: {
      header: null
    },

  },
  RepairWorkDetail: {
    screen: RepairWorkDetail,
    navigationOptions: {
      header: null
    }
  }
}, {

    initialRouteName: "Repairwork",

  })

//Drawer
const Drawer = DrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Repairwork: {
      screen: Repairwork,
      navigationOptions: {
        header: null
      }
    },

    Schedule: {
      screen: Schedule,
      navigationOptions: {
        header: null
      }
    },
    

    // MyVehicles: {
    //   screen: MyVehicles,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    // Chat: {
    //   screen: Chat,
    //   navigationOptions: {
    //     header: null
    //   },
    // },
    Payments: {
      screen: Payments,
      navigationOptions: {
        header: null
      }
    },
    ContactUs: {
      screen: ContactUs,
      navigationOptions: {
        header: null
      }
    },
    AboutUs: {
      screen: AboutUs,
      navigationOptions: {
        header: null
      }
    },
    LoginExample: {
      screen: LoginExample,
      navigationOptions: {
        header: null
      }
    },
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        header: null
      }
    }
  },
  {

    initialRouteName: "Home",
    drawerWidth: (Dimensions.get("window").width / 2 + 50),
    contentOptions: {
      activeTintColor: "#fff"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

//Root navigator
export const createRootNavigator = (user) => {
  return StackNavigator({
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null
      },
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: {
        header: null
      },
    },

    Forgotpassword: {
      screen: Forgotpassword,
      navigationOptions: {
        header: null
      },
    },
    LoginExample: {
      screen: LoginExample,
      navigationOptions: {
        header: null
      },
    },
    SignupExample: {
      screen: SignupExample,
      navigationOptions: {
        header: null
      },
    },
    Kilometers: {
      screen: Kilometers,
      navigationOptions: {
        header: null
      }
    },

    ChatDetail: {
      screen: ChatDetail,
      navigationOptions: {
        header: null
      },
    },
    RepairWorkDetail: {
      screen: RepairWorkDetail,
      navigationOptions: {
        header: null
      }
    },
    VehicleRepairInfo: {
      screen: VehicleRepairInfo,
      navigationOptions: {
        header: null
      }
    },
    Web: {
      screen: Schedule,
      navigationOptions: {
        header: null
      }
    },
  }, {
      //initialRouteName: "Drawer"
      initialRouteName: (user) ? "Drawer" : "LoginExample",
    })
}
