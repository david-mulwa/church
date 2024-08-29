import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import * as SecureStore from 'expo-secure-store'
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';


const EXPO_CLERK_PUBLIC_KEY =  process.env.EXPO_CLERK_PUBLIC_KEY

const tokenCache = {
  async getToken (key :string){
    try {
      return await SecureStore.getItemAsync(key)
    } catch (error) {
      console.error('failed to retrieve token: ' , error)
    }
  },
  async saveToken (key: string, value: string){
    try {
       await SecureStore.setItemAsync(key, value)
    } catch (error) {
      console.error('failed to save Token ' , error)
    }
  },
  async deleteToken(key: string){
    try {
      await SecureStore.deleteItemAsync(key)
    } catch (error) {
      console.error ('failed  to delete token: ', error)
    }
  }
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider 
     publishableKey={EXPO_CLERK_PUBLIC_KEY!}
     tokenCache={tokenCache}
     >
      
      <ClerkLoaded>
        <RootLayoutNav/>
      </ClerkLoaded>

     </ClerkProvider> 
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  

  return(
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='index'/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
        <Stack.Screen name ='(screens)' options={{ headerShown: false }}/>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  )
  
}
