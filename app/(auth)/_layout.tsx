
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'


const routlayout = () => {
  const router = useRouter()

  return (
    <Stack>
        <Stack.Screen name='welcome' options={{
          headerTitle: '',
          animation: 'slide_from_right',
          headerLeft: () => (
            <TouchableOpacity
            onPress={() =>{ router.replace('/(auth)/signin')}}
              >
              <Text className='text-white text-2xl hover:text-red-300'>skip</Text>
            </TouchableOpacity>
          )
        }}/>
        <Stack.Screen name='signin' options={{
          headerTitle: '',
          animation: 'slide_from_right',
          headerLeft: () => (
            <TouchableOpacity
            onPress={() =>{ router.replace('/(auth)/welcome')}}
              >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          )
        }}/>
        <Stack.Screen name='signup' options={{
          headerTitle: '',
          animation: 'slide_from_bottom',
          headerLeft: () => (
            <TouchableOpacity
            onPress={() =>{ router.replace('/(auth)/signin')}}
              >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          )
        }}/>
        
    </Stack>
  )
}

export default routlayout