import React, { useContext, useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import AuthContext from '../auth/authContext'

import hu from 'dayjs/locale/hu'

import io from 'socket.io-client'
import storage from '../auth/storage'
import { useInfiniteQuery } from '@tanstack/react-query'
import apiClient from '../api/client'

function ChatsScreen(props) {
  const socket = io('wss://dev-plander-org.koyeb.app', {
    secure: true,
    auth: {
      token: storage.getToken(),
    },
  })

  const { user } = useContext(AuthContext)

  const { data, isFetched, isFetching } = useInfiniteQuery({
    queryKey: ['chats'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await apiClient.get('/chats', {
        limit: 10,
        offset: (pageParam - 1) * 10,
      })
      return res.data
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.items?.length > 0 ? allPages?.length + 1 : undefined
    },
  })

  const chatMessages = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.items]
  })

  const [messages, setMessages] = useState([])
  useEffect(() => {
    let parsed = extractMessages(chatMessages, setMessages)
    setMessages(parsed)
    console.log(parsed)
  }, [chatMessages, isFetched])

  useEffect(() => {
    socket.connect()
  }, [socket])

  useEffect(() => {
    socket.on('recieve-message', (message) => {
      if (message.sender._id != user._id && !messages.includes(message)) {
        console.log(message)
        setMessages((prevMessage) =>
          GiftedChat.append(prevMessage, {
            ...convertToGiftedChatMessage(message),
          }),
        )
      }
    })
    return () => socket.off('recieve-message')
  }, [])

  const onSend = useCallback((localMessages) => {
    socket.emit('send-message', localMessages[0].text)
    setMessages((prevMessage) =>
      GiftedChat.append(prevMessage, {
        ...localMessages[0],
      }),
    )
  }, [])

  return (
    <>
      {isFetching && <Text>Loading...</Text>}
      <GiftedChat
        placeholder="Írja be az üzenetet..."
        locale={hu}
        messages={messages}
        onSend={onSend}
        user={user}
        key={(message) => message?._id}
        showUserAvatar={true}
        bottomOffset={10}
        renderUsernameOnMessage={true}
        timeFormat="LT"
        loadEarlier
        infiniteScroll
        scrollToBottom
        renderChatEmpty={() => (
          <View style={{ height: 100 }}>
            <Text>Nem történt még beszélgetés!</Text>
          </View>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
})

function convertToGiftedChatMessage(message) {
  return {
    _id: Math.random().toString(36).substring(7),
    text: message.content,
    createdAt: message.timestamp,
    user: message.sender,
  }
}

const extractMessages = (messages, setMessages) => {
  if (messages != undefined) {
    const parsed = messages.items.map((r) => convertToGiftedChatMessage(r))
    setMessages(parsed)

    return parsed
  }
}

export default ChatsScreen
