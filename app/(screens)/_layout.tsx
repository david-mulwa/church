import { TouchableOpacity} from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
   const router = useRouter()

  return (
    <Stack>
      <Stack.Screen name="sermons" options={{  headerShown: true, 
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/')}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
        )
      }} />

      <Stack.Screen name="music" options={{ headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/')}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
        )
       }} />

      <Stack.Screen name="photos" options={{ headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/')}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
        )
       }} />

      <Stack.Screen name="ask" options={{ 
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/')}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
        )
        }} />

      <Stack.Screen name="stream" options={{ headerShown: true,
      headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/')}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
        )


      }} />

      <Stack.Screen name="bible" options={{ headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/')}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
        )
      }} />

    </Stack>
  )
}

export default _layout