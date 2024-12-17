import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/Login';
import SignUp from './components/SignUp';
import DashboardScreen from './components/Dashboard';
import FetchList from './components/FetchList';
import MapScreen from './components/MapScreen';
import Image from './components/Image';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="FetchList" component={FetchList} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Image" component={Image} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
