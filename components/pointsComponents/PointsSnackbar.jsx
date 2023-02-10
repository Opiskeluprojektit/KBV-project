import { View, Text } from 'react-native'
import React from 'react'
import { Snackbar } from "react-native-paper";
import { style } from "../../styles/styles";
import Colors from '../../styles/colors';

const PointsSnackbar = ({showSnackbar, setShowSnackbar}) => {
  return (
    <View>
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        style={style.snackBar}
        theme={{ colors: { accent: Colors.darkText }}}
        action={{
          label: 'Piilota',
          style: style.snackBarText,
          onPress: () => setShowSnackbar(false)
        }}>
          <Text style={style.snackBarText}>Tiedot tallennettu.</Text>
      </Snackbar>
    </View>
  )
}

export default PointsSnackbar