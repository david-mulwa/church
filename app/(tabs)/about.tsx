import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const About = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }} className='w-full bg-black'>
      <View className='w-full'>
        <Text className='text-3xl text-white text-center mt-4'>Church of Christ</Text>

        <View className='w-full justify-start items-center mt-6'>
          <Image source={images.cross} className='w-full h-60 rounded-lg' resizeMode="contain" />
          <Text className='text-3xl text-white text-center mt-4'>Pasi Church of Christ</Text>
          
          <View className='mt-6'>
            <Text className='text-3xl text-white text-center mt-4'>Who we are</Text>
            <Text className='mt-4 text-white leading-relaxed text-base'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>

            <Text className='text-center mt-8 text-3xl text-white'>Vision</Text>
            <Text className='mt-4 text-white leading-relaxed text-base'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>

            <Text className='text-center mt-8 text-3xl text-white'>Mission</Text>
            <Text className='mt-4 text-white leading-relaxed text-base'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default About
