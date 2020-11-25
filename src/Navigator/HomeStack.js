import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/Home';



const MainStack = createStackNavigator();

export function MainStackNavigator() {

    return (
        <MainStack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <MainStack.Screen name={'Home'} component={Home}/>
        </MainStack.Navigator>
    );
}