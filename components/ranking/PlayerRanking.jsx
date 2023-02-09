import { View, Text } from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper'

const PlayerRanking = () => {
  return (
    <View style={{flex: 1}}>
      <Text>PlayerRanking</Text>
      <DataTable style={{flex: 1}}></DataTable>
    </View>
  )
}

export default PlayerRanking