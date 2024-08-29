import { FlatList, Text, View, Image, Pressable, SafeAreaView, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { events, images, highlights } from '@/constants'
import { useRouter } from 'expo-router'
import CustomButton from '@/components/CustomButton'

const DATA = [
  {
    id: 0,
    title: 'Sermons',
    description: 'Way of the Lord',
    img: images.sermons,
    action: '/(screens)/sermons'
  },
  {
    id: 1,
    title: 'Music',
    description: 'Praise and Worship',
    img: images.music,
    action: '/(screens)/music'
  },
  {
    id: 2,
    title: 'Photos',
    description: 'Church Moments',
    img: images.photos,
    action: '/(screens)/photos'
  },
  {
    id: 3,
    title: 'Ask',
    description: 'Get Answers',
    img: images.ask,
    action: '/(screens)/ask'
  },
  {
    id: 4,
    title: 'Stream',
    description: 'Live Streaming',
    img: images.stream,
    action: '/(screens)/stream'
  },
  {
    id: 5,
    title: 'Bible',
    description: 'Read the Word',
    img: images.bible,
    action: '/(screens)/bible'
  },
]

type ItemsProp = {
  id: number
  title: string
  description: string
  img: any
  action: any
}

const Item = ({ title, description, img, action }: ItemsProp) => {
  const router = useRouter()

  return (
    <Pressable onPress={() => router.replace(action)}>
      <View className='w-32 h-40 flex border-double border-2 bg-red-300 rounded-3xl justify-center items-center m-1'>
        <Text className='text-white font-bold text-xl text-center'>{title}</Text>
        <Text className='text-white text-sm mt-1 mb-4 text-center'>{description}</Text>
        <Image source={img} className='w-24 h-20 rounded-full' />
      </View>
    </Pressable>
  )
}

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const openModal = (event: any) => {
    setSelectedEvent(event)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedEvent(null)
  }

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='w-full'>
        <View className='mt-12 flex justify-center items-center'>
          <Text className='text-3xl text-white font-semibold mb-7'>Hello, welcome to church</Text>
          <Text className='text-3xl text-red-300 font-semibold mb-7'>Upcoming Events</Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ paddingHorizontal: 10 }} // Adjust spacing between events
            className='w-full mb-7'
          >
            {events.map((item) => (
              <Pressable key={item.id} onPress={() => openModal(item)} className='m-2'>
                <Image source={item.image} className='w-[200px] h-[250px] rounded-lg' />
              </Pressable>
            ))}
          </ScrollView>

          <FlatList
            data={DATA}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} // Disable scrolling within FlatList to prevent conflict with parent ScrollView
            columnWrapperStyle={{ justifyContent: 'space-between' }} // Space between columns
            renderItem={({ item }) => <Item {...item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View className='mt-12 flex justify-center items-center'>
          <Text className='text-2xl text-white font-semibold mb-7'>Highlights from previous Events</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ paddingHorizontal: 10 }} // Adjust spacing between events
            className='w-full mb-7'
          >
            {highlights.map((item) => (
              <Pressable key={item.id} onPress={() => openModal(item)} className='m-2'>
                <Image source={item.image} className='w-[200px] h-[250px] rounded-lg' />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {selectedEvent && (
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <SafeAreaView className='flex-1 bg-black'>
              <View className='flex-1 justify-center items-center'>
                <Image source={selectedEvent.image} className='w-[90%] h-[70%] rounded-lg' />
                <Text className='text-3xl text-white font-semibold mt-5'>{selectedEvent.title}</Text>
                <Text className='text-lg text-gray-300 mt-3 text-center'>{selectedEvent.description}</Text>
                <CustomButton title="Close" onPress={closeModal} className='mt-6 bg-red-300 p-3 w-1/2 justify-center items-center rounded-full text-white text-xl font-bold' />
              </View>
            </SafeAreaView>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index
