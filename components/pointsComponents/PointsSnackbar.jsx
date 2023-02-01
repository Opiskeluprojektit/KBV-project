import { View, Text } from 'react-native'
import React from 'react'
import { Snackbar } from "react-native-paper";
import { style } from "../../styles/styles";
import Colors from '../../styles/colors';

const PointsSnackbar = ({props}) => {
  return (
    <View>
      <Snackbar
        visible={props.showSnackbar}
        onDismiss={() => props.setShowSnackbar(false)}
        style={style.snackBar}
        theme={{ colors: { accent: Colors.darkText }}}
        action={{
          label: 'Piilota',
          style: style.snackBarText,
          onPress: () => props.setShowSnackbar(false)
        }}>
          <Text style={style.snackBarText}>Tiedot tallennettu.</Text>
      </Snackbar>
    </View>
  )
}

export default PointsSnackbar