import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { payment } from '@/constants'
import { Picker } from '@react-native-picker/picker'
import CustomButton from '@/components/CustomButton'
import { lipaNaMpesa } from '@/app/services/mpesaService'; 

const Partner = () => {
  const [selected, setSelected] = useState<string>("Giving method");
  const [amount, setAmount] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handlePayment = async () => {
    try {
      const response = await lipaNaMpesa(phoneNumber, parseFloat(amount));
      console.log('Payment Response:', response);
      // Handle response, e.g., show a success message or navigate
    } catch (error) {
      console.error('Payment Error:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <View className='flex-1 justify-center items-center bg-black'>
      <Text className='text-3xl font-bold text-white mt-4'>Partnership & Givings</Text>

      <View className='flex flex-row mt-10'>
        {payment.map((item) => (
          <View key={item.id} className='m-2'>
            <Image source={item.img} className='w-[100px] h-[100px] rounded-full' resizeMode="cover" />
          </View>
        ))}
      </View>
      
      <Text className='mt-5 text-2xl text-white italic'>Please select giving method</Text>

      <Picker
        selectedValue={selected}
        onValueChange={(itemValue) => setSelected(itemValue)}
        style={{ width: '80%', backgroundColor: '#FFF', borderRadius: 10, marginTop: 20 }}
      >
        {payment.map((item) => (
          <Picker.Item key={item.id} label={item.name} value={item.name} />
        ))}
      </Picker>

      <TextInput
        placeholder='Enter amount in KSh'
        value={amount}
        onChangeText={setAmount}
        className='text-black w-[80%] border p-3 bg-white mt-12 rounded-3xl'
        keyboardType='number-pad'
      />

      <TextInput
        placeholder='Enter phone number'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        className='text-black w-[80%] border p-3 bg-white mt-4 rounded-3xl'
        keyboardType='phone-pad'
      />

      <CustomButton
        title="Continue"
        onPress={handlePayment}
        className='bg-red-300 p-3 w-1/2 rounded-full mt-5 items-center'
      />
    </View>
  )
}

export default Partner
