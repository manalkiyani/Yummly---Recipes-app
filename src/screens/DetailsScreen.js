import React, { useEffect, useState } from 'react';
import {  FlatList, Text, View ,TouchableOpacity, ImageBackground,StyleSheet,Image, ScrollView,LogBox} from 'react-native';
import { ref, onValue} from "firebase/database";
import { Button ,Avatar} from 'react-native-paper';
import { database } from '../../config';


export const DetailsScreen = ({navigation,route}) =>{
   const{Title,Level,Calories,Ingredients,Instructions,Time,Key}=route.params 
  const [img,setImg]=useState('iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==')

   let ing=Ingredients.toString().split(',');
   let ins=Instructions.toString().split('.');
  

const fetchImage=()=>
{
    console.log('in use effect')
    let   btmresponse = ref(database, 'recipes/' +Key);
    onValue(btmresponse, (snapshot) => {
        const data = snapshot.val();
   console.log(data.Title)
       setImg(data.Image) 
})}

useEffect(()=>{
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    ///fetching image
    console.log('in use effect')
    fetchImage()

},[])






return(
    
    <View style={{ display:'flex',flex:1}}> 
        {console.log("in return")}
    <View style={{backgroundColor:'rgba(220,88,5,255)' ,width:'100%',  display:'flex',flex:2}}></View>
  
  
<View style={styles.container}>
   

 <Image  style={{marginLeft:80,alignSelf:'center',marginTop:-120,width:200,height:200,borderRadius:100}}
        source={{ uri: 'data:image/jpeg;base64,'+img}}
      /> 
    
        <Text style={styles.heading}>{Title}</Text>
        <ScrollView    showsVerticalScrollIndicator={false}>
      <View style={styles.display}>
      <Image style={styles.img} source={require('../../assets/chef.png')  } />
      <Text style={styles.text}>{Level}</Text>
     </View>
    
<View style={styles.display}>
<Image  style={styles.img}  source={require('../../assets/clock.png')  } />
    <Text style={styles.text}>{Time} mins</Text>
</View>
   <View style={styles.display}>
   <Image style={styles.img} source={require('../../assets/cal.png')  } />
    <Text style={styles.text}>{Calories} Calories</Text>
   </View>
   <Text style={styles.subheadings}>Ingredients</Text>
   <FlatList 
   scrollEnabled={false}
 
   data={ing}
   renderItem={(item)=>{return(

    <View style={{flexDirection:'row',marginBottom:10}}>
    <Image style={{width:20,height:20,marginRight:10}} source={require('../../assets/orange.png')  } />
     <Text style={styles.text}>{item.item} </Text>
    </View>
   )}}
   ></FlatList>
   
   <Text style={styles.subheadings}>Instructions</Text>
   <FlatList 
 scrollEnabled={false}
 data={ins}
 renderItem={(item)=>{return(

  <View style={{flexDirection:'row',marginBottom:10}}>
  <Image style={{width:20,height:20,marginRight:10}} source={require('../../assets/orange.png')  } />
   <Text style={styles.text}>{item.item} </Text>
  </View>
 )}}
 ></FlatList>
   

   </ScrollView>
    
</View>
</View>

);
}
const styles=StyleSheet.create(
    {
        container:
        {
            backgroundColor:'#f0f4fc',
            padding :30,
          
            borderTopRightRadius:45,
            borderTopLeftRadius:45,
            marginTop:-80,
            display:'flex',
            flex:4

        },
        heading:{
            fontSize:24,
            fontWeight:'bold',
            color:'#000000',
            marginBottom:20,
            marginTop:20
      
          },

          subheadings:{
          
            fontSize:20,
            fontWeight:'bold',
            color:'#000000',
            marginBottom:10,
            marginTop:10

          },
        display:
        {
            flexDirection:'row',
            marginBottom:15
        },
        img:
        {
            width:30,
            height:30,
            marginRight:10
        },
        text:
        {
            fontSize:16

        }

    }
)