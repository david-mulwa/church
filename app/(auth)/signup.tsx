import * as React from 'react';
import { TextInput, View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState(''); // New state for username
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
        username, // Include username in the sign-up request
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error('Sign Up Error:', JSON.stringify(err, null, 2));
      Alert.alert('Sign Up Error', err.errors ? err.errors[0]?.message : 'An error occurred during sign-up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        console.error('Verification Incomplete:', JSON.stringify(completeSignUp, null, 2));
        Alert.alert('Verification Failed', 'The verification code is incorrect or expired. Please try again.');
      }
    } catch (err: any) {
      console.error('Verification Error:', JSON.stringify(err, null, 2));
      Alert.alert('Verification Error', err.errors ? err.errors[0]?.message : 'An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-full h-full">
      <View className="flex-1 justify-center items-center w-full h-full">
        <Image
          source={images.closs}
          className="w-full h-1/2"
        />
        {!pendingVerification ? (
          <>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={setEmailAddress}
              keyboardType="email-address"
              className="w-3/4 border-white p-3 bg-white rounded-xl mb-7"
            />
            <TextInput
              value={username} // New TextInput for username
              placeholder="Username..."
              onChangeText={setUsername}
              className="w-3/4 border-white p-3 bg-white rounded-xl mb-7"
            />
            <TextInput
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={setPassword}
              className="w-3/4 border-white p-4 bg-white rounded-xl mb-7"
            />
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <CustomButton
                className="w-1/2 items-center justify-center p-3 bg-red-300 rounded-full mb-7 text-white"
                title="Sign Up"
                onPress={onSignUpPress}
              />
            )}
            <View className="flex w-full justify-center items-center">
              <Text className="text-white">Already have an account?</Text>
              <CustomButton
                className="w-1/2 items-center justify-center p-3 bg-red-300 rounded-full mb-7 text-white"
                title="Log In"
                onPress={() => router.replace('/(auth)/signin')}
              />
            </View>
          </>
        ) : (
          <>
            <TextInput
              className="bg-white w-3/4 p-4 rounded-xl mb-7"
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
            />
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <CustomButton
                className="w-1/2 items-center justify-center p-3 bg-red-300 rounded-full mb-7 text-white"
                title="Verify Email"
                onPress={onPressVerify}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}
