// import * as React from 'react';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
// function App(): React.JSX.Element {
//   return (
//     // <SignUp/>
//     <Login/>
//     // <Dashboard/>
//   );
// }

// export default App;


import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/Login';
import SignUp from './components/SignUp';
import DashboardScreen from './components/Dashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
