import React, { createContext,useState } from 'react';
import getAuth from '@react-native-firebase/auth';
import { async } from '@firebase/util';
//initliazing the useContext Hook
//useContext Hook helps in managing the states globally
export const AuthContext=createContext();  //using context api to create context object to pass prop to other components,
//not just parent to child component, Every Context object has a Provider that allows other components to consume its context.
// In this case, our AuthProvider will provide the state of user to other components.
//The user state is initialized as null with the useState hook and is updated using the useEffect hook and Firebase's auth().onAuthStateChanged(setUser).
export const AuthProvider =({children})=>
{
const[user,setUser]=useState("null");
return(
    <AuthContext.Provider
    value={{
        user,
        setUser,
        login: async (email,password)=>
        {
            try{
                await auth().signInWithEmailAndPassword(email,password);

            }
            catch(e)
            {
                console.log(e);
            }
        },
        register: async (email,password)=>
        {
            try{
                await auth().createUserWithEmailAndPassword(email,password);
            }
            catch(e)
            {
                console.log(e);
            }
        },
        logout: async () =>
        {
            try{
                await auth().signOut();
            }
            catch(e)
            {
                console.log(e);
            }

        },
        
}}>
    {children}
</AuthContext.Provider>
);
};
