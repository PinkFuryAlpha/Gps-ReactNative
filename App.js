import React, {useState, useEffect} from 'react';
import axios from 'axios';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import base64 from 'react-native-base64';
import { AuthStackNavigator } from './src/Navigator/AuthStackNavigator';
import { MainStackNavigator } from './src/Navigator/HomeStack';
import {AuthContext} from './src/Context/AuthContext';
import { SPRING } from './src';
import { Alert } from 'react-native';


const RootStack = createStackNavigator();



export default function() {

  
  const [logged,setLogged]= useState('false');

  const auth = React.useMemo(() =>({

    login: async (object) =>{
      if(!object.email || !object.password){
        return(
            Alert.alert("Can't be an empty field!")
        )
      }
      try{
        const result=await axios.post(`${SPRING}/users/login`,object)
        await AsyncStorage.setItem('userId',JSON.stringify(result.data.id))
        await AsyncStorage.setItem('logged','true')
        await AsyncStorage.setItem('key',base64.encode(`${object.email}:${object.password}`))
        /*TO DO: store a the url key necessary for header request.*/
        setLogged('true');
      }catch (e){
        console.log(e);
      }

    },

    logout: async () => {
      await AsyncStorage.clear();
      setLogged(false);
    },

    // Display error from server message!
    register: async (object,validation) =>{
    if(!object.firstName || !object.lastName || !object.lastName || !object.password){
      return Alert.alert('No field should be left empty!')
    }
    if(!validation.firstNameValid || !validation.lastNameValid || !validation.lastNameValid || !validation.passwordValid){
      return Alert.alert('One or more fields aren\'t valid')
    }
    try{
        await axios.post(`${SPRING}/users/register`,object);
    } catch (e) {
        Alert.alert(e.message)
        console.log(e);
    }
    }
  }),[])

  useEffect(() => {
    AsyncStorage.getItem('logged').then(logged =>setLogged(logged))
}, [])

    return(
     
     <AuthContext.Provider value={auth}>

        <NavigationContainer>

          <RootStack.Navigator 
            screenOptions={{
            headerShown: false,
            }}>


          {(logged=='true') ? <RootStack.Screen name={'HomeStack'} component={MainStackNavigator}/> 
                  : <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator}/>}

        {/* <RootStack.Screen name={'HomeStack'} component={MainStackNavigator}/> */}

          </RootStack.Navigator>

        </NavigationContainer>

     </AuthContext.Provider>
    );
}