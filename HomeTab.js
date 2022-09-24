import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {DashboardScreen} from './src/screens/DashboardScreen';

import {AddRecipeScreen} from './src/screens/AddRecipeScreen';
import {UserProfile} from './src/screens/UserProfile';

export const HomeTab=()=>
{
   
    const Tab = createBottomTabNavigator();
    return(
      
      <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:'tomato',
        tabBarInActiveTintColor:'grey'
      }}
    >


          
           <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          
          }}
          />
           <Tab.Screen
          name="AddRecipes"
          component={AddRecipeScreen}
          options={{
            tabBarLabel: 'Recipes',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          
          }}
          />
           <Tab.Screen
          name="Profile"
          component={UserProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          
          }}
          />
        
          
          
            
         
       
        </Tab.Navigator>
        
    );
  
}