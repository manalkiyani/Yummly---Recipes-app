import React, {useState, useContext} from 'react';
import {
    Text,
    View,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {TextInput, Button, Avatar} from 'react-native-paper';

import {} from 'react-native-paper';
import {auth} from '../../config';
import {UserContext} from '../../App';
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {setSignIn} = useContext(UserContext);


    const Login = async (email, password) => {
        // auth/missing-email
        // auth/internal-error
        // auth/wrong-password
        // auth/user-not-found

        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigation.navigate('HomeTab')
            // const id = userCredential.getToken;
            setSignIn(true);
            // console.log(id);
            console.log(' signed in!');
        }).catch(error => {
            if (error.code === 'auth/invalid-email') {
                Alert.alert('Please Enter an email aadress!');
            } else if (error.code === 'auth/internal-error') {
                Alert.alert('Please Enter your password');
            } else if (error.code === 'auth/wrong-password') {
                Alert.alert('The Password is incorrect');
            } else if (error.code === 'auth/user-not-found') {
                Alert.alert('No such user exsists');
            } else {
                console.log(error);
            }
        });

    }
    return (<ImageBackground resizeMode='cover'
        style={
            {flex: 1}
        }
        source={
            require('../../assets/bg.jpg')
    }>
        <View style={
            styles.container
        }>
            <Avatar.Image style={
                    {
                        marginTop: 10,
                        marginBottom: 20,
                        alignSelf: 'center'
                    }
                }
                size={100}
                source={
                    require('../../assets/logo.png')
                }/>
            <Text style={
                {
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'rgba(33,33,33,255)',
                    alignSelf: 'center'
                }
            }>Welcome Back!</Text>
            <Text style={
                {
                    fontSize: 18,
                    fontWeight: '400',
                    fontStyle: 'italic',
                    color: 'rgba(33,33,33,255)',
                    alignSelf: 'center',
                    marginBottom: 10
                }
            }>You were missed!
            </Text>

            <TextInput style={
                    styles.TextInput
                }
                outlineColor='#008080'
                selectionColor='#008080'
                activeOutlineColor='#008080'

                label="Email"
                value={email}
                mode='outlined'
                onChangeText={setEmail}/>


            <TextInput style={
                    styles.TextInput
                }

                outlineColor='#008080'
                selectionColor='#008080'
                activeOutlineColor='#008080'

                label="Password"
                value={password}
                mode='outlined'
                onChangeText={setPassword}/>
            <Button style={
                    {
                        borderRadius: 50,
                        height: 50,
                        justifyContent: 'center'
                    }
                }

                color='#008080'
                mode="contained"
                onPress={
                    () => Login(email, password)
            }>
                Sign In
            </Button>


        </View>
    </ImageBackground>);

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center"
    },


    TextInput: {
        marginBottom: 5
    }

});
export default module = LoginScreen;
