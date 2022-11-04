import { Center, Spinner } from 'native-base'
import React from 'react'

export function Loading() {
  return (
    <Center flex={1} bg='gray.900'>
      <Spinner color='yellow.500'></Spinner>
    </Center>
  )
}