import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View ,Image,TouchableOpacity, ImageBackground, ScrollView,StyleSheet,LogBox} from 'react-native';
import { database } from '../../config';
import { ref, onValue, remove,update} from "firebase/database";


import { auth } from '../../config';

// import { createDrawerNavigator } from '@react-navigation/drawer';
import { Avatar,Button ,Searchbar,Card,Drawer} from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { async } from '@firebase/util';

export const DashboardScreen = ({navigation}) =>{
 const [check,setCheck]=useState(0)
  const [search,setSearch]=useState();
  const [displayTitle,setDisplayTitle]=useState('Recommended')
  const [recipes,setRecipes]=useState([])
  const recp=[]
  const [myRecipes,setMyRecipes]=useState([]);
  const [secRecipes,setSecRecipes]=useState([]);
  const myRecp=[]

  const Logout =async ()=>
  {
     
     
      signOut(auth)
      .then(() => {
        console.log("log out")
        navigation.navigate('Login')
       
      })
      .catch(error => {
        
             console.log(error);
          }
  );
              
  }







  const searchWord=()=>
  {
    //fetching filtered data of all recipes from firebase for top scroll
//recipes contains all data
console.log(search)
if (search == "")

{console.log("in if")
  setRecipes(secRecipes)}
else{
  setRecipes(recipes.filter(item=>item.Title.toLowerCase().includes(search.toLowerCase())))  
  
}
 }
 const delItem=(key)=>
 {
  remove(ref(database,'recipes/'+key))
  .then(()=>{alert('data was successfully deleted')})
  .catch((error)=>{alert("there was an error,details",+error)})

  const user = auth.currentUser;
  let recipeList="";

  let   response = ref(database, 'users/' + user.uid);
  onValue(response, (snapshot) => {
      const data = snapshot.val();
     
      recipeList=data.recipesList
     

  })
  let List=recipeList.split(",")
  let newlist=List.filter(item=>item!=key)


    //update users data :Recipe count and recipes List
    update( ref(database, 'users/' + user.uid), {
     
      recipesList:newlist.toString()

   });
   setCheck(1)
   fetchSpecificUserData()
   

 }
  const fetchAllData=async ()=>
  {
      //fetching data of all recipes from firebase for top scroll
  const response = await ref(database, "recipes/")
  onValue(response, (snapshot) => {
   
snapshot.forEach(doc=>{
  recp.push({
    ...doc.val() })
  })
})
setRecipes(recp)
setSecRecipes(recp)
  }

  const fetchSpecificUserData=()=>
        {
          setMyRecipes([])
      //fetching data of my recipes from firebase for bottom scroll
      const user = auth.currentUser;
      var recipeList = "";
      var recipeCount = "";

      // fetching recipe count
      let   btmresponse = ref(database, 'users/' + user.uid);
        onValue(btmresponse, (snapshot) => {
            const data = snapshot.val();
            recipeCount = data.recipes 
            recipeList=data.recipesList

        })
        console.log("recipeCount"+recipeCount)

        if (recipeList !== ""){  
          let List=recipeList.split(",")

          //for dispalying data
       List.forEach(item=>{
  
        const   response = ref(database, "recipes/"+item)
        onValue(response, (snapshot) => {
        myRecp.push(snapshot.val()) })
       })
        setMyRecipes(myRecp)
           }

           fetchAllData()
       
  }
  useEffect(()=>fetchSpecificUserData(),[])



    return(
  
      <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
       
    <View style={{backgroundColor:'#f0f4fc' ,padding :20,flex:1}}>
  
 {/* heading */}
      <View style={{flexDirection:'row'}}>
      <Avatar.Image  style={{marginRight:8,alignSelf:'center'}}
      size={60} source={require('../../assets/logo.png')}
      />
      <View style={{flexDirection:'column'}}>
      <Text style={styles.heading}>Let's</Text>
      <Text style={styles.heading}>Eat Quality Food</Text>
      </View>
      <TouchableOpacity onPress={()=>Logout()}>
      <Image style={{marginLeft:60,marginTop:10,width:30,height:30}}source={require('../../assets/logout.png')}/>
      </TouchableOpacity>
      
      </View>
  {/* search bar */}
      <Searchbar
       onSubmitEditing={()=>searchWord()}
       placeholder="Search Food Recipes"
       icon={require('../../assets/search.png')}
       clearIcon={require('../../assets/cross.png')}
       value={search}
       onChangeText={setSearch}
       style={styles.Searchbar}
       inputStyle={{
        fontSize:12
      
       }}
      />
    {/* Recommneded */}
      <Text style={{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'
      }}>{displayTitle}</Text>
  
  {/*data display*/ }
      <View style={{marginBottom:40}}>
        <ScrollView
         showsHorizontalScrollIndicator={false}
         horizontal>
       { recipes.map(item=>{
          return(
          
          <View style={{padding:5}}>
            <TouchableOpacity
           onPress={
            ()=>navigation.navigate('Details',
            {Title:item.Title,
              Time:item.Time,
              Calories:item.Calories,
              Category:item.Category,
              Level:item.DiffLevel,
              Ingredients:item.Ingredients,
              Instructions:item.Steps,
              Key:item.key})}>
              <ImageBackground  style={{
                width:190,height:240
                }} 
                imageStyle={{ borderRadius: 15}}
                source={{ uri: 'data:image/jpeg;base64,'+item.Image}} >
                  <View style={{flexDirection:'column-reverse',flex:1}}>
                <View style={{
                    flexDirection:'row',
                    padding:10,
                    justifyContent:'space-between',
                  
                  
  
                }}>
  
                      <Button  
                      color='rgba(220,88,5,255)' uppercase={false} mode="contained" 
                    
                      style={styles.btns}
                    
                        labelStyle={{fontSize:7,color:'white'}}>
                      {item.Time} mins
                      </Button>
                      <Button  color='rgba(220,88,5,255)' uppercase={false} mode="contained" 
                 
                      style={styles.btns}
        
                        labelStyle={{fontSize:7,color:'white'}}>
                        {item.Calories} cal
                      </Button>
              </View>
            
              </View>
              </ImageBackground> 
              </TouchableOpacity>
              
              <Text style={styles.title}>{item.Title}</Text>
            
              
          
          <Text style={styles.desc}>Category:{item.Category}</Text>
  
              </View>
              )
        })}
        </ScrollView>
      
        
        
            
      </View>
       {/*bottom data*/ }
       <Text style={{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'
      }}>Your Recipes</Text>    
     <ScrollView >
     {myRecipes.map(item=>{
    
    return(
      <View
     
      style={{marginBottom:10 }} >
      <View style={{flexDirection:'row',flex:1,backgroundColor:'#e3eafa' ,padding:10,borderRadius:20}}>
        <TouchableOpacity  onPress={
      ()=>navigation.navigate('Details',
      {Title:item.Title,
        Time:item.Time,
        Calories:item.Calories,
        Category:item.Category,
        Level:item.DiffLevel,
        Ingredients:item.Ingredients,
        Instructions:item.Steps,
        Key:item.key})}>
        <Avatar.Image size={80}  source={{ uri: 'data:image/jpeg;base64,'+item.Image}}
              style={{
                marginRight:8
              }}>

        </Avatar.Image>
        </TouchableOpacity>
       
        
      
        <View style={{flexDirection:'column'}}>
        <Text style={styles.title}>{item.Title}
        </Text>
        <Text style={styles.desc}>Category: {item.Category}
        </Text>
      
        </View>
        <TouchableOpacity onPress={()=>delItem(item.key)}> 
        <Image style={{marginTop:10,width:30,height:30}}
        source={require('../../assets/remove.png')}></Image>
        </TouchableOpacity>
      
      </View>
    </View>
    )})}
    </ScrollView>
     
    
    </View>
    </ScrollView>
  
      )
  
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
