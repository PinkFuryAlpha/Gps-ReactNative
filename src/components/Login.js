import React, {useState}from 'react'
import {Text, StyleSheet, View, TextInput, SafeAreaView, Alert} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import CustomButton from './CustomButton';
import axios from 'axios';
import style from '../styles/RootStyles'
import {AuthContext} from '../Context/AuthContext';
import { SPRING } from '..';


function Login({navigation}) {

    const {login} = React.useContext(AuthContext)
    const [object, setObject] = useState({email:'', password:''})

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.text}>Track your friends!</Text>
            <Text style={style.text2}>This application is developed for
            a school project, send location so it can be tracked by admins!</Text>
            <View style={style.field1}>
                <Icon name="mail" color="#7C1F44" size={24}/>
                <TextInput 
                    style={{marginLeft: 10, flex: 1, alignSelf: 'center'}}
                    value={object.email} 
                    placeholder='email'
                    onChangeText={text => setObject({...object, email: text})}/>
            </View>
            <View style={style.field1}>
                <MaterialCommunityIcons name="textbox-password" color="#7C1F44" size={24}/>
                <TextInput 
                    style={{marginLeft: 10, flex: 1, alignSelf: 'center'}}
                    secureTextEntry={true}
                    value={object.password} 
                    placeholder='password'
                    onChangeText={text => setObject({...object, password: text})}/>
            </View>
            <View>
                <CustomButton 
                style={style.login}
                onPress={() => login(object)}>Login</CustomButton>
            </View>
            <View style={style.register}>
                <Text onPress={()=>navigation.navigate('Register')}>New to this? Register here!</Text>
            </View>
        </SafeAreaView>
    )
}

export default Login

