import React, { useContext, useState, useEffect, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import AuthContext from '../auth/authContext'

import hu from 'dayjs/locale/hu'

import io from 'socket.io-client'
import storage from '../auth/storage'

function ChatsScreen(props) {
  const socket = io('wss://dev-plander-org.koyeb.app', {
    secure: true,
    auth: {
      token: storage.getToken(),
    },
  })
  const [messages, setMessages] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    socket.connect()
  }, [socket])

  useEffect(() => {
    socket.on('recieve-message', (message) => {
      if (message.sender._id != user._id) {
        console.log(message)
        setMessages((prevMessage) =>
          GiftedChat.append(prevMessage, {
            ...convertToGiftedChatMessage(message),
          }),
        )
      }
    })
  }, [])

  const onSend = useCallback((localMessages) => {
    socket.emit('send-message', localMessages[0].text)
    console.log('local', localMessages[0])
    setMessages((prevMessage) =>
      GiftedChat.append(prevMessage, {
        ...localMessages[0],
      }),
    )
  }, [])

  return (
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
    />
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

export default ChatsScreen
