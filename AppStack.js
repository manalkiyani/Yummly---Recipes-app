import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {DetailsScreen} from './src/screens/DetailsScreen';
import {Home} from './HomeTab';

export const AppStack = () => {
    const Stack = createNativeStackNavigator();

    return (<Stack.Navigator screenOptions={
        {headerShown:false}
    }>
        <Stack.Screen name="HomeC"
            component={Home}/>


        <Stack.Screen name="Details"
            component={DetailsScreen}/>


    </Stack.Navigator>);

}
