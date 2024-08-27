import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState , useRef} from 'react'
import { router } from 'expo-router'
import Swiper from 'react-native-swiper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { welcom } from '@/constants/index'
import CustomButton from '@/components/CustomButton'
const welcome = () => {

  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<Swiper>(null)

  const isLastSlide = activeIndex === welcom.length - 1
  return (
    <SafeAreaView className='flex-1 w-full '>
      

      <Swiper
        ref={swiperRef}
        loop={false}
        dot= {<View className='w-[32px] h-[4px] mx-1 bg-white rounded-full' />}
        activeDot={<View className='w-[32px] h-[4px] mx-1 bg-red-400 rounded-full' />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {welcom.map((item)=>(
          <View
            key={item.id} className='flex items-center justify-center w-full'>
              <Image
                source={item.image}
                className='w-full h-1/2'
                resizeMode='contain'
              />
              <View className='flex items-center justify-center w-full mt-10'>
                <Text className='text-3xl text-center text-white font-bold mx-10'>{item.title}</Text>

                <View>
                  <Text className='text-sm text-center text-white mx-10 mt-3 font-semibold'>{item.description}</Text>
                </View>

              </View>
            </View>
        ))}

      </Swiper>
      <CustomButton
       title={isLastSlide ? 'Get Started' : 'Next'}
       onPress={()=> isLastSlide ? router.replace('/(auth)/signin') : swiperRef.current?.scrollBy(1)}
       className='flex justify-center items-center mb-8 mt-10 border  border-white rounded-full p-5 bg-red-300 text-white w-[80%] mx-auto'
      >

      </CustomButton>

    </SafeAreaView>
  )
}

export default welcome