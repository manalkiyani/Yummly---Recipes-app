import React, { useState,createContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
export const AuthStack=()=>
{

    const Stack=createNativeStackNavigator();
    return(
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
           <Stack.Screen
          name="Home"
          component={HomeScreen}
          />
            <Stack.Screen
          name="Login"
          component={LoginScreen}
          />
          <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          />
          <Stack.Screen
          name="Details"
          component={DetailsScreen}
          />

         
        </Stack.Navigator>
    );
  
}