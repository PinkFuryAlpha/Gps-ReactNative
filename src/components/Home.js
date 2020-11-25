import React, {useState,useEffect}from 'react';
import axios from 'axios';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, StyleSheet, View, Image, TextInput, SafeAreaView, Button, Alert} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AuthContext } from '../Context/AuthContext';
import style from '../styles/RootStyles';
import homeStyle from '../styles/HomeStyleSheet'
import CustomButton from './CustomButton';
import { dateFormat } from './DateFunction';
import { SPRING } from '..';



const geoOptions = {
    enableHighAccuracy: true,
    timeOut: 20000,
    maximumAge: 60 * 60 * 24
};

function Home() {

    const {logout} = React.useContext(AuthContext)

    const [userId,setUserId] = useState()
    const [key,setKey] = useState('')

    const [latitude,setLatitude] = useState(0)
    const [longitude, setLongitude]= useState(0)
    const [timestamp, setTimeStamp]= useState('');

    useEffect( () => {
        AsyncStorage.getItem('userId').then(userId =>setUserId(userId))
        AsyncStorage.getItem('key').then(key =>setKey(key))       
    }, [])

    

    const getLocation=  () => {

         navigator.geolocation.getCurrentPosition(position => geoSucces(position), geoError, geoOptions);

        const geoSucces = (position) => {
            console.log(position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setTimeStamp(()=>{
                setTimeStamp(dateFormat)
            })
            
            axios.post(`${SPRING}/locations`,{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                date: dateFormat(),
                userId: userId
            },
            {
                headers: {
                    'Authorization': `Basic ${key}`
                }
            })
                 .then((res) => {
                    console.log(res.data)
                })
                 .catch((error) =>{
                    console.error(error)
                })
        }
    
        const geoError = (e) => {
            console.log(e);
        }

    }

    return (
        <SafeAreaView style={homeStyle.container}>
            <View style={homeStyle.logoutIcon}>
            <SimpleLineIcons style={{marginRight: 20, padding:20}} name="logout" size={24} color="#7C1F44" onPress={()=>logout()}/>
            </View>
            <Text style={homeStyle.titleText}>Welcome to the Tracking App!</Text>
            <Text style={style.text2}>Down bellow are listed the comands available!</Text>
            <Text style={style.text2}>Key: {key}</Text>
            <Text style={style.text2}>Latitude: {latitude}</Text>
            <Text style={style.text2}>Longitude: {longitude}</Text>
            <Text style={style.text2}>Timestmap: {timestamp}</Text>
            <View >
                <CustomButton 
                style={style.login}
                onPress={()=>getLocation()}>Send Location</CustomButton>
            </View>
            <View >
                <CustomButton 
                style={style.login}
                onPress={()=>getLocation()}>Send Location Automatically</CustomButton>
            </View>
            <View >
                <CustomButton 
                style={style.login}
                onPress={()=>logout()}>Stop Sharing Location</CustomButton>
            </View>
        </SafeAreaView>
    )
}

export default Home
