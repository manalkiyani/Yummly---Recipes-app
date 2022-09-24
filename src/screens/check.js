import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View ,Image,TouchableOpacity, ImageBackground, ScrollView,StyleSheet,Alert} from 'react-native';
import { database } from '../../config';
import { ref, onValue} from "firebase/database";
//import { launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker"

import { auth } from '../../config';

import { Avatar,Button ,Searchbar,Card,Drawer} from 'react-native-paper';

//fetch and display all the data in flatlist
export const Check = ({navigation}) =>{
  // const [userData,setData]=useState([]);
  // const users=[]
  const [img,setImage]=useState('');
  

  

//   useEffect(()=>
//   {const response = ref(database, '/users');
//   onValue(response, (snapshot) => {
   
// snapshot.forEach(doc=>{
//   users.push({
//     ...doc.val(),key:doc.id })
//   })
// })
// setData(users)
//   },[])


const [recipes,setRecipes]=useState([]);
const recp=[]



useEffect(()=>

  {    const user = auth.currentUser;
    var recipeCount = 0;
    
    // fetching recipe count
    let   response = ref(database, 'users/' + user.uid);
       onValue(response, (snapshot) => {
           const data = snapshot.val();
           recipeCount = data.recipes 
       })
       console.log("recipeCount"+recipeCount)
  let i=0;
while(i < recipeCount)
{
  
  response = ref(database, "recipes/"+user.uid +"R"+i)
  onValue(response, (snapshot) => {
  recp.push(snapshot.val()) })
  i++
}
   
  
    setRecipes(recp)
},[])








const options={
  

    maxHeight:200,
    maxWidth:200,
    selectionLimit:1,
    mediaType:'photo',
    includeBase64:true
  
}

  ///////////////////////////////////////////////
  const uploadImage=async ()=>{
    const image = await ImagePicker.launchImageLibrary(options);
  //  console.log(image.assets[0].base64);

  }

     
   



    return(
        <View>
     

     <Text>hello</Text>
      
      
      <FlatList 
           horizontal
             data={recipes}
            renderItem={({item})=>{return(

            <TouchableOpacity onPress={()=>{Alert.alert((item.Time).toString())}}>
              
                <Text>{item.Calories}</Text>
                <Image style={{width:200,height:200}} source={{ uri: "data:image/jpeg;base64,"+"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Ld7i8srsB0jPrfbT/oBnx/5pvDsgf/2KTUr4TzVxn2vYlrz7ARuo/PBM+E6Ev10nOpGdKHfXiU5YDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRcgw5kXIMOZFyDDmRau3a/T/ziGhM1RWcKwAAAABJRU5ErkJggg=="}}></Image>
              </TouchableOpacity>)}}
              ></FlatList>

              
     
             

              <Button title="upload "onPress={uploadImage}></Button>
             
{/* 
               <FlatList data={finalRecipes}
            renderItem={({item})=>
            <TouchableOpacity onPress={()=>{Alert.alert(item.time)}}>
                <Text>{item.category}</Text>
           
              </TouchableOpacity>}
              ></FlatList>  */}
           

           {/* <FlatList  
            horizontal
            data={recipes}
           renderItem={({item})=>{return(
    
    <View style={{padding:5}}>
        <ImageBackground  style={{
          width:190,height:240
          }} 
          imageStyle={{ borderRadius: 15}}
          source={{ uri: 'data:image/jpeg;base64,'+item.image}} >
            <View style={{flexDirection:'column-reverse',flex:1}}>
           <View style={{
              flexDirection:'row',
              padding:10,
              justifyContent:'space-between',
             
             

           }}>

                <Button  color='rgba(220,88,5,255)' uppercase={false} mode="contained" 
               onHo
                 style={styles.btns}
  
                  labelStyle={{fontSize:7,color:'white'}}>
                 {item.time}
                </Button>
                <Button  color='rgba(220,88,5,255)' uppercase={false} mode="contained" 
               
                 style={styles.btns}
  
                  labelStyle={{fontSize:7,color:'white'}}>
                   {item.time}
                </Button>
        </View>
      
        </View>
        </ImageBackground>
        
        <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.desc}>Recipes by: {}</Text>

        </View>
           )}}
           
   > </FlatList> */}
        </View>

    );
}
const styles=StyleSheet.create(
  {
    heading:{
      fontSize:18,
      fontWeight:'bold',
      color:'#000000'

    },
    Searchbar:
    {
      borderRadius:15,
      height:40,
      marginTop:20,
      marginBottom:15,


    
     },
     btns:
     {
      width:80,
      height:30,
      borderRadius:50,
    

    },
     
     title:{fontSize:14,
      fontWeight:'bold',
      marginTop:10,
      color:'#000000'
    },
     desc:
     {
      fontSize:8,
      fontSize:11,
      marginTop:3,
      color:'#000000'
    }

  });
  //getting user id