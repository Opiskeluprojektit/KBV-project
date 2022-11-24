import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Pressable } from 'react-native';

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.header}>
          <Text>Tänne logo ja hamppari</Text>
        </View>
        
        <View style={styles.heading}>
          <Text style={styles.title}>Kokkola{'\n'}Beach{'\n'}Volley</Text>
        </View>

        <View style={styles.homeButtons}>
          <Pressable style={styles.button1}>
            <View style={styles.ellipse1}></View>
            <Text style={styles.signup}>Ilmoittaudu viikkokisaan</Text>
          </Pressable>
          <Pressable style={styles.button2}>
            <View style={styles.ellipse2}></View>
            <Text style={styles.points}>Pisteiden{'\n'}syöttö</Text>
          </Pressable>
          <Pressable style={styles.button3}>
            <View style={styles.ellipse3}></View>
            <Text style={styles.rules}>ViikkoBiitsi säännöt</Text>
          </Pressable>
          <Pressable style={styles.button4}>
            <View style={styles.ellipse4}></View>
            <Text style={styles.ranking}>Ranking{'\n'}listat</Text>
          </Pressable>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#F9F9F9'
  },
  content: {
    marginTop: 20,
    marginLeft: 24,
    marginBottom: 24,
    //marginRight: 24
  },
  header: {
    height: "10%",
    width: "100%"
  },
  heading: {
    height: "30%",
    width: "100%"
    //fontWeight: 500,
  },
  title: {
    fontSize: 60,
    color: "#00353D",
    textAlign: "left",
    lineHeight: 60
  },
  homeButtons: {
    width: "100%",
    height: "60%"
  },
  button1: {
    width: 165,
    height: 210,
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "#005C70"
  }, 
  button2: {
    position: "absolute",
    width: 165,
    height: 165,
    borderRadius: 10,
    left: 180,
    shadowRadius: 4,
    backgroundColor: "#005C70",
    shadowOpacity: 0.25,
  },
  button3: {
    position: "absolute",
    width: 165,
    height: 165,
    borderRadius: 10,
    shadowRadius: 4,
    backgroundColor: "#005C70",
    shadowOpacity: 0.25,
    top: 227
  },
  button4: {
    position: "absolute",
    width: 165,
    height: 210,
    borderRadius: 10,
    left: 180,
    top: 182,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "#005C70"
  },
  signup: {
    position: "absolute",
    width: "auto",
    height: "auto",
    left: 12,
    right: "auto",
    top: 155,
    bottom: "auto",
    fontSize: 20,
    color: "#FFFFFF",
  },
  points: {
    position: "absolute",
    width: "auto",
    height: "auto",
    right: "auto",
    top: 110,
    left: 12,
    bottom: "auto",
    fontSize: 20,
    color: "#FFFFFF",
  },
  rules: {
    position: "absolute",
    width: "auto",
    height: "auto",
    left: 12,
    right: "auto",
    top: 110,
    bottom: "auto",
    fontSize: 20,
    color: "#FFFFFF"

  },
  ranking: {
    position: "absolute",
    width: "auto",
    height: "auto",
    left: 12,
    right: "auto",
    top: 155,
    bottom: "auto",
    fontSize: 20,
    color: "#FFFFFF"
  },
  ellipse1: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 1000,
    backgroundColor: "#EEE8A9",
    left: 12,
    right: "auto",
    top: 12,
    bottom: "auto",
  },
  ellipse2: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 1000,
    backgroundColor: "#EEE8A9",
    left: 12,
    right: "auto",
    top: 12,
    bottom: "auto"
  },
  ellipse3: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 1000,
    backgroundColor: "#EEE8A9",
    left: 12,
    right: "auto",
    top: 12
  },
  ellipse4: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 1000,
    backgroundColor: "#EEE8A9",
    left: 12,
    right: "auto",
    top: 12,
    bottom: "auto"
  }

});
