import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, Button, View, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Sign In Failed', 'Please check your credentials and try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Sign In Error', 'An error occurred during sign-in. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View className="flex-1 items-center justify-center w-full h-full">
      <Image source={images.closs} className="w-full h-1/2" />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={setEmailAddress}
        keyboardType="email-address"
        className="w-3/4 bg-white p-3 rounded-xl mb-7"
        accessibilityLabel="Email Address"
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={setPassword}
        className="w-3/4 bg-white p-3 rounded-xl mb-7"
        accessibilityLabel="Password"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <CustomButton
          title="Sign In"
          onPress={onSignInPress}
          className="w-1/2 items-center justify-center p-3 bg-red-300 rounded-full mb-7 text-white"
        />
      )}
      <View className="flex items-center justify-center">
        <Text className="text-white font-semibold text-xl">Don't have an account?</Text>
        <CustomButton
          title="Sign Up"
          onPress={() => router.replace('/(auth)/signup')}
          className="w-1/2 items-center justify-center p-3 bg-red-300 rounded-full mb-7 text-white mt-6"
        />
      </View>
    </View>
  );
}
