


import React, { useState,createContext } from 'react';
//import { ActivityIndicator, FlatList, Text, View ,Image,TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from './config';
// import { createDrawerNavigator } from '@react-navigation/drawer';
//import { Avatar,Button ,Searchbar,Card,Drawer} from 'react-native-paper';
//import { UserContext } from './src/screens/LoginScreen';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { DetailsScreen } from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeTab } from './HomeTab';


//The onAuthStateChanged is basically an observer that listens for a change in authentication.
// That way, whenever a user signs in or out, our user state will be automatically updated in our AuthProvider.


export const UserContext = createContext();


const App = () => {
  const[signIn,setSignIn]=useState(false);
  

//  const userContext = useContext(AuthContext);
//console.log(userContext);
  //const {user,setUser}=useContext(AuthContext);
  
//  const[init,setinit]=useState(true);

  
  // const Drawer = createDrawerNavigator();
  // const onAuthStateChanged=(user)=>
  // {
  //   setUser(user);
  //  if (init) setinit(false);
  // }
// useEffect(()=>
// {
//   const subscriber = auth().onAuthStateChanged();
//   return subscriber;

// },[]);
//while app is establishing connection with firebase , set to null do not display anything
// if (init) 
//  return null;
//else return the desired screens
const Stack=createNativeStackNavigator();
 return(

  <UserContext.Provider value={{signIn,setSignIn}}>
  <NavigationContainer>
    
    {/* {signIn ? <AppStack></AppStack>:<AuthStack></AuthStack>}  */}
   
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
            <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          />
          



         
        </Stack.Navigator>
   
  
  

</NavigationContainer>
</UserContext.Provider> 

/* <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen  name="Fav"
    component={DashboardScreen} />
      
      </Drawer.Navigator>
    </NavigationContainer> */
 );
  
};
export default App;

