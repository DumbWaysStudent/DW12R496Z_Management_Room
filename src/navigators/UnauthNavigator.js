import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './../screens/Login'
import Register from './../screens/Register'


const UnauthNavigator = createStackNavigator({
  Login: { 
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header:null
    }),    
  },
  Register:{
    screen:Register,
    navigationOptions: ({ navigation }) => ({
      header:null
    }),
  }
});

export default createAppContainer(UnauthNavigator);