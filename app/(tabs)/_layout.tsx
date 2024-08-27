import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const _layout = () => {
    return(
        <Tabs 
         screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#00B0FF',
            tabBarInactiveTintColor: 'gray',
            }}>

            <Tabs.Screen name="about" options={{title: 'About', tabBarIcon: ({color}) => <FontAwesome name="home" color={color} size={24}/>}} />
            
            <Tabs.Screen name="index" options={{title: 'Home', tabBarIcon: ({color}) => <FontAwesome name="home" color={color} size={36}/>}} />

            <Tabs.Screen name="partner" options={{title: 'givings', tabBarIcon: ({color}) => <FontAwesome name="users" color={color} size={24}/>}} />

            <Tabs.Screen name="profile" options={{title: 'profile', tabBarIcon: ({color}) => <FontAwesome name="user" color={color} size={24}/>}} />
            

        </Tabs>
    )
}

export default _layout