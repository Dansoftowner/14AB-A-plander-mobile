import React from 'react'
import { StyleSheet, Text } from 'react-native'

function MyErrorMessage({ error, visible }) {
  if (!visible || !error) return null

  return <Text style={styles.error}>{error}</Text>
}

const styles = StyleSheet.create({
  error: { color: 'red', maxWidth: '95%' },
})

export default MyErrorMessage
