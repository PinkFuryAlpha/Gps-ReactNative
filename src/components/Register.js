import React, {useState}from 'react';
import {Text, StyleSheet, View, Image, TextInput, SafeAreaView, Button, Alert} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import CustomButton from './CustomButton';
import style from '../styles/RootStyles'
import { AuthContext } from '../Context/AuthContext';



function Register({navigation}) {

    const{register} = React.useContext(AuthContext)
    const [object, setObject] = useState({firstName:'',lastName:'', email:'', password:''});
    const [validation, setValidation] = useState({firstNameValid:true, lastNameValid:true, emailValid:true, passwordValid:true})

    function validateFName(text){
        const regex=/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
        if(regex.test(text)){
            setValidation({...validation, firstNameValid: true})
        }else{
            setValidation({...validation, firstNameValid: false})
        }
        setObject({...object, firstName: text})
    }

    function validateLastName(text){
        const regex=/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
        if(regex.test(text)){
            setValidation({...validation, lastNameValid: true})
        }else{
            setValidation({...validation, lastNameValid: false})
        }
        setObject({...object, lastName: text})
    }

    function validateEmail(text){
        const regex=/\S+@\S+\.\S+/;
        if(regex.test(text)){
            setValidation({...validation, emailValid: true})
        }else{
            setValidation({...validation, emailValid: false})
        }
        setObject({...object, email: text})
    }

    function validatePassword(text){
        const regex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if(regex.test(text)){
            setValidation({...validation, passwordValid: true})
        }else{
            setValidation({...validation, passwordValid: false})
        }
        setObject({...object, password: text})
    }

    

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.text}>Totally not a Spy!</Text>
            <Text style={style.text2}>Complete the form in order to become part of the project.</Text>
            <View style={style.field1}>
            <MaterialCommunityIcons name="rename-box" color="#7C1F44" size={24}/>
                <TextInput 
                    style={[style.input, !validation.firstNameValid ? style.error:null]}
                    value={object.firstName} 
                    placeholder='First Name'
                    onChangeText={text => validateFName(text)}/>
            </View>
            <View style={style.field1}>
            <MaterialCommunityIcons name="rename-box" color="#7C1F44" size={24}/>
                <TextInput 
                    style={[style.input, !validation.lastNameValid ? style.error:null]}
                    value={object.lastName} 
                    placeholder='Last Name'
                    onChangeText={text => validateLastName(text)}/>
            </View>
            <View style={style.field1}>
                <Icon name="mail" color="#7C1F44" size={24}/>
                <TextInput 
                    style={[style.input, !validation.emailValid ? style.error:null]}
                    value={object.email} 
                    placeholder='email'
                    onChangeText={text => validateEmail(text)}/>
            </View>
            <View style={style.field1}>
                <MaterialCommunityIcons name="onepassword" color="#7C1F44" size={24}/>
                <TextInput 
                    style={[style.input, !validation.passwordValid ? style.error:null]}
                    value={object.password}
                    secureTextEntry={true} 
                    placeholder='password'
                    onChangeText={text => validatePassword(text)}/>
            </View>
            <View>
                <CustomButton 
                style={style.login}
                onPress={() => register(object,validation)}>Register</CustomButton>
            </View>
            <View style={style.register}>
                <Text onPress={()=>navigation.pop()}>Already a member? Click here!</Text>
            </View>
            {console.log(object)}
            {console.log(validation)}
        </SafeAreaView>
    )
}

export default Register
