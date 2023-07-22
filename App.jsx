
import 'react-native-gesture-handler';
import React from 'react';
import {
  LogBox,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home';
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

const Stack = createNativeStackNavigator();
export default function App(){
  
  return(
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}




