import React, {  useState,useContext, useEffect } from 'react';
import { Text, View ,ImageBackground, Alert,StyleSheet, TouchableOpacity} from 'react-native';
import { TextInput,Button ,Avatar} from 'react-native-paper';

import * as ImagePicker from "react-native-image-picker"

import { database } from '../../config';
import { auth } from '../../config';
import {ref, update,onValue } from "firebase/database";


export const UserProfile =({navigation})=>
{
    const[img,setImage]=useState("")
    const [email,setEmail]=useState();
    const [username,setUsername]=useState();
 
    
    
    //fetch data 
    function fetchUserData( ) {
        const user=auth.currentUser;

        //get user information
       
        const   response = ref(database, 'users/' + user.uid);
        onValue(response, (snapshot) => {
            const data = snapshot.val();
           
            setImage(data.image)
            setEmail(data.email)
            setUsername(data.username)
          
        })
    }
     //write data 
     function updateUserData( ) {
        const user=auth.currentUser;

        //store user information
       
        update(ref(database, 'users/' + user.uid), {
        
          username:username,
          email: email,
         
          image:img,
        
         
        });
    }
    

       // uploading image
       const options = {
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true

    }
    const uploadImage = async () => {
        const image = await ImagePicker.launchImageLibrary(options);
        setImage(image.assets[0].base64);

    }


    useEffect(()=>fetchUserData(),[])
     return (
            <ImageBackground resizeMode='cover' style={{flex:1}} source={require('../../assets/bg.jpg')} >
            <View style={styles.container}>

                { 
              <TouchableOpacity  onPress={()=>uploadImage()}>
 <Avatar.Image style={styles.img} size={100} source={{ uri: 'data:image/jpeg;base64,'+img}} />
              </TouchableOpacity>
}
              
                <Text style={{fontSize:24,fontWeight:'bold',color:'rgba(33,33,33,255)',alignSelf:'center'}}>Your Profile</Text>

           
                <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:'rgba(33,33,33,255)',marginBottom:10,marginTop:10}}>Email Address </Text>
                <TextInput 
                  outlineColor='#008080'
                  selectionColor='#008080'
                  activeOutlineColor='#008080'
                  mode='outlined'      
                value={email} 
                onChangeText={setEmail}>

                </TextInput>


              
               
                <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:'rgba(33,33,33,255)',marginBottom:10,marginTop:10}}>Username</Text>
                <TextInput 
                 outlineColor='#008080'
                 selectionColor='#008080'
                 activeOutlineColor='#008080'
                 mode='outlined'  
            value={username} 
            onChangeText={setUsername}>

            </TextInput>

          
                <Button
        style={{borderRadius:50,height:50,justifyContent:'center',width:'100%',marginTop:10}}
        
        color='#008080' 
         mode="contained" 
         onPress={()=>updateUserData()}>
     Update information
      </Button>
               
                

      
    
            </View>
          </  ImageBackground>
         
        );
    

}
const styles=StyleSheet.create(
    {
        container: {
            flex: 1,
           
            padding:20,
        
          },
        
         
          TextInput: {
            width:'100%',
            marginBottom: 5,
           
           
           
            },
            img:
            {marginTop :10,marginBottom:20,alignSelf:'center'}

    }
);
