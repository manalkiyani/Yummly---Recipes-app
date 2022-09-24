import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View ,Image,TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { Avatar,Button } from 'react-native-paper'
import DashboardScreen from './DashboardScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';


const HomeScreen = ({navigation}) =>{

 
  return(
  <View style={{flex:1}}>
 
<ImageBackground resizeMode='cover' style={{flex:1}} source={require('../../assets/backg.jpg')} >
<View style={{ margin :30,justifyContent:'flex-start',alignItems:'center'}}>
<Avatar.Image style={{marginTop :10,marginBottom:25}} size={100} source={require('../../assets/logo.png')} />
<Text style={{fontSize:24,fontWeight:'bold',color:'rgba(33,33,33,255)'}}>Welcome to Yummly!</Text>
<TouchableOpacity onPress={()=>navigation.navigate('SignUp')}  
style={{marginTop:25,marginBottom:10,borderColor:'#008080',borderRadius:20,borderWidth:1.5,paddingVertical:6,paddingHorizontal:50}}>

  <Text style={{color:'#008080',fontSize:14}}>
  I'm a New User
  </Text>
</TouchableOpacity>
<TouchableOpacity 
style={{marginBottom:15,borderColor:'#008080',borderRadius:20,borderWidth:1.5,paddingVertical:6,paddingHorizontal:40}}
onPress={()=>navigation.navigate('Login')}>

  <Text style={{color:'#008080',fontSize:14}}>
  I'm Already a User
  </Text>
</TouchableOpacity>

</View>
</ImageBackground>

  </View>
    
    
  );
}

export default module=HomeScreen;



