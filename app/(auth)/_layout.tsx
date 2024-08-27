
import React from 'react'
import { Stack } from 'expo-router'


const routlayout = () => {

  return (
    <Stack>
        <Stack.Screen name='welcome'/>
        <Stack.Screen name='signin'/>
        <Stack.Screen name='signup'/>
    </Stack>
  )
}

export default routlayout