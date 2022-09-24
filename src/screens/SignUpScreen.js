import React, {  useState,useContext } from 'react';
import { Text, View ,ImageBackground, Alert,StyleSheet} from 'react-native';
import { TextInput,Button ,Avatar} from 'react-native-paper';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import * as ImagePicker from "react-native-image-picker"

import { database } from '../../config';
import { auth } from '../../config';
import {ref, set } from "firebase/database";
import { UserContext } from '../../App';

const SignUpScreen =({navigation})=>
{
    const[img,setImage]=useState("")
    const [email,setEmail]=useState();
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const{ setSignIn}= useContext(UserContext);
    
    
    //write data 
    function writeUserData( name, email,pass) {
        const user=auth.currentUser;

        //store user information
       
        set(ref(database, 'users/' + user.uid), {
        
          username:name,
          email: email,
          password:pass,
          image:img,
          recipes:0,
          recipesList:""
         
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


    const register =async (username,email,password)=>
        {
           
            createUserWithEmailAndPassword(auth,email,password)
            .then(() => {
                setSignIn(true);
               writeUserData(username,email,password);
                console.log('User account created & signed in!');
                navigation.navigate('HomeTab')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
               Alert.alert('That email address is already in use!');
                }

               else if (error.code === 'auth/invalid-email') {
              Alert.alert('That email address is invalid!');
                }
                else
                {
                   console.log(error);
                }

                
            });
                    
        }
        return (
            <ImageBackground resizeMode='cover' style={{flex:1}} source={require('../../assets/bg.jpg')} >
            <View style={styles.container}>

                {img=="" ?   <Avatar.Image style={styles.img} size={100} source={require('../../assets/logo.png')} />: 
                 <Avatar.Image style={styles.img} size={100} source={{ uri: 'data:image/jpeg;base64,'+img}} />}
              
                <Text style={{fontSize:24,fontWeight:'bold',color:'rgba(33,33,33,255)',alignSelf:'center'}}>Welcome to Yummly!</Text>
                <Text style={{fontSize:18,fontWeight:'400',fontStyle:'italic',color:'rgba(33,33,33,255)',alignSelf:'center',marginBottom:10}}>Create Your Account! </Text>

<TextInput style={styles.TextInput}
            outlineColor='#008080'
            selectionColor='#008080'
            activeOutlineColor='#008080'
    
            label="Username"
            value={username}
            mode='outlined'
            onChangeText={setUsername}
        />

               


                <TextInput style={styles.TextInput}
            outlineColor='#008080'
            selectionColor='#008080'
            activeOutlineColor='#008080'
    
            label="Email"
            value={email}
            mode='outlined'
            onChangeText={setEmail}
        />
                
                 
           <TextInput style={styles.TextInput}
    
    outlineColor='#008080'
    selectionColor='#008080'
    activeOutlineColor='#008080'
    
            label="Password"
            value={password}
            mode='outlined'
            onChangeText={setPassword}
        />
         <Button
        style={{borderRadius:50,height:50,justifyContent:'center',width:'100%',marginBottom:10}}
        
        color='#008080' 
         mode="contained" 
         onPress={()=>uploadImage()}>
      Upload your photo
      </Button>


        <Button
        style={{borderRadius:50,height:50,justifyContent:'center',width:'100%'}}
        
        color='#008080' 
         mode="contained" 
         onPress={()=>register(username,email,password)}>
       Sign Up
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
            justifyContent: "center",
            alignItems:'center'
          },
        
         
          TextInput: {
width:'100%',
          
            marginBottom: 5,
           
           
           
            },
            img:
            {marginTop :10,marginBottom:20,alignSelf:'center'}

    }
);
export default module=SignUpScreen;