import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { ScrollView } from 'react-native';
import Home from './component/home/home';
import DetailPage from './component/home/detail';
import Login from './component/login/Login';
import Register from './component/register/Register';
import SideMenu from './component/sidemenu/SideMenu';
import ContactList from './component/contacts/contacts';
import Contact from './component/profile/profile';
import editUser from './component/register/editUser';
import Google from './component/google/google';
import UserList from './component/userlist/userlist';
import Chat from './component/chat/chat';






 const sidemenu = DrawerNavigator({    
     Home: { screen: Home },    
     Login: { screen: Login },
     Register: { screen: Register },
     ContactList:{ screen:ContactList },
     Contact:{screen:Contact},
     DetailPage:{screen:DetailPage},
     editUser:{screen:editUser},
     Google:{screen:Google},
     UserList:{screen:UserList},
     Chat:{screen:Chat}



 },{contentComponent:props =><SideMenu {...props}/>})

 const FeedBack = StackNavigator({
     Login: { screen: Login },
     Register: { screen: Register },
     DetailPage: { screen: DetailPage },
     Home: { screen: sidemenu },
     Google:{screen:Google},
     UserList:{screen:UserList},
     Chat:{screen:Chat}
     
 },{
    headerMode: 'none',
    navigationOptions: {
    headerVisible: false,
  }
 })

 
 
 export default FeedBack;

