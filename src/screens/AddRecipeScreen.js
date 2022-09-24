import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    ImageBackground,
    Alert,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {TextInput, Button, Avatar} from 'react-native-paper';
import {DropDown} from "react-native-paper-dropdown";
import * as ImagePicker from "react-native-image-picker"

import {database} from '../../config';
import {auth} from '../../config';
import {ref, set,onValue,update} from "firebase/database";




export const AddRecipeScreen = () => {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('');
    const [diffLevel, setDiffLevel] = useState('');
    const [steps, setSteps] = useState('');
    const [calories, setCalories] = useState('');
  
    const [ingredients, setIngredients] = useState('');
    const [image, setImage] = useState("");
    // popularityScore , list of images

   
    const [category, setCategory] = useState('');
  


    // write data
    function writeData() {
        
        const user = auth.currentUser;
        var recipeCount = 0;
        var allRecipesList=""
        // fetching recipe count
     const   response = ref(database, 'users/' + user.uid);
        onValue(response, (snapshot) => {
            const data = snapshot.val();
            console.log("data.recipes"+data.recipes)
            recipeCount = data.recipes
            allRecipesList=data.recipesList
            recipeCount++;
        })
       
const random=Math.floor(Math.random() * 100).toString()
        // store recipes information
        set(ref(database, 'recipes/' + user.uid + random), {
            Title: title,
            Time: time,
            DiffLevel: diffLevel,
            Steps: steps,
            Calories: calories,
            Category: category,
            Ingredients: ingredients,
            Image: image,
            key:user.uid + random

        });

        let itemToBeAdded=""
        if (allRecipesList == "")
        {
         itemToBeAdded=user.uid+random
        }
        else
        {
            itemToBeAdded=","+user.uid+random
        }

        //update users data :Recipe count and recipes List
        update( ref(database, 'users/' + user.uid), {
           recipes:recipeCount,
          
            recipesList:allRecipesList +itemToBeAdded
           
          

        });
        setTitle("")
        setTime("")
        setDiffLevel("")
        setCalories("")
        setCategory("")
        setIngredients("")
        setSteps("")
        setImage("")
        

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


    return (
        <ScrollView>
        <ImageBackground resizeMode='cover'

            style={
                {flex: 1
                }
            }
            source={
                require('../../assets/bg.jpg')
        }>
            
               <View style={{height:'8%',backgroundColor:'#E0601F',width:'100%',padding:10  , justifyContent:'center',
                        alignItems:'center',}}>
               <Text style={
                    {
                        fontSize: 26,
                        fontWeight: 'bold',
                        color: 'rgba(33,33,33,255)',
                     
                        color:'white'
                    }
                }>Add Your Own Recipe</Text>
               </View>
                
               <View style={
                styles.container
            }>
                <Text style={{ fontSize:18,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'}}>Name Your Recipe *</Text>
            

                <TextInput style={
                        styles.TextInput
                    }
                    outlineColor='#008080'
                    selectionColor='#008080'
                    activeOutlineColor='#008080'

                    label="e.g Grandma's apple pie"
                    value={title}
                    mode='outlined'
                    onChangeText={setTitle}/>
                    
                    <Text style={{ fontSize:18,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'}}>Upload a Picture *</Text>

                    <TouchableOpacity  onPress={
                        () => uploadImage()
                }>
                    {image == "" ? <Image style={{   
                            marginTop: 10,
                            marginBottom: 20,
                            alignSelf: 'center',
                           width:90,
                          height:90
}} source={require('../../assets/upload.png')}/>
                    : <Image style={styles.img} source={{ uri: 'data:image/jpeg;base64,'+image}}
           /> }
                   
                </TouchableOpacity>
                <Text style={{ fontSize:18,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'}}>Cooking Time *</Text>
                <TextInput style={
                        styles.TextInput
                    }
                    keyboardType='number-pad'
                   
                    outlineColor='#008080'
                    selectionColor='#008080'
                    activeOutlineColor='#008080'

                    label="In mins"
                    value={time}
                    mode='outlined'
                    onChangeText={setTime}/>
<Text style={{ fontSize:18,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'}}>Difficulty Level *</Text>

                <TextInput style={
                        styles.TextInput
                    }

                    outlineColor='#008080'
                    selectionColor='#008080'
                    activeOutlineColor='#008080'

                    label="Easy | Medium | Difficult "
                    value={diffLevel}
                    mode='outlined'
                    onChangeText={setDiffLevel}/>
                    
                    <Text style={{ fontSize:18,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'}}>Total Calories *</Text>

             
                    <TextInput style={
                        styles.TextInput
                    }
                    keyboardType='number-pad'
                    outlineColor='#008080'
                    selectionColor='#008080'
                    activeOutlineColor='#008080'

                    label="In cal"
                    value={calories}
                    mode='outlined'
                    onChangeText={setCalories}/>

<Text style={{ fontSize:18,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'}}>Category *</Text>

                <TextInput style={
                        styles.TextInput
                    }

                    outlineColor='#008080'
                    selectionColor='#008080'
                    activeOutlineColor='#008080'

                    label="BreakFast | Dinner | Snacks"
                    value={category}
                    mode='outlined'
                    onChangeText={setCategory}/>
                      <Text style={{ fontSize:18,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'}}>Ingredients *</Text>

                    <TextInput style={
                        styles.TextInput
                    }
                    multiline={true}
                    outlineColor='#008080'
                    selectionColor='#008080'
                    activeOutlineColor='#008080'

                    label="e.g. 2kg Chicken,3 eggs"
                    value={ingredients}
                    mode='outlined'
                    onChangeText={setIngredients}/>

<Text style={{ fontSize:18,
        fontWeight:'bold',
        marginBottom:15,
        color:'#000000'}}>Instructions *</Text>

                       <TextInput style={
                        styles.TextInput
                    }
                    multiline={true}
                    outlineColor='#008080'
                    selectionColor='#008080'
                    activeOutlineColor='#008080'

                    label="Steps"
                    value={steps}
                    mode='outlined'
                    onChangeText={setSteps}/>
               
                <Button style={
                        {
                            borderRadius: 50,
                            height: 50,
                            justifyContent: 'center',
                            width: '100%',
                            marginTop:10,
                            marginBottom:30
                        }
                    }

                    color='#008080'
                    mode="contained"
                    onPress={
                       ()=>writeData()
                }>
                    Add
                </Button>


            </View>
        </ImageBackground>
        </ScrollView>

    );


}
const styles = StyleSheet.create({
    img:{
        marginTop: 10,
                            marginBottom: 20,
                            alignSelf: 'center',
                            width:'100%',
                            height:250

    },
    container: {
        flex: 1,
        padding: 20,
      
    },


    TextInput: {
        width: '100%',
         marginBottom: 5}

});

