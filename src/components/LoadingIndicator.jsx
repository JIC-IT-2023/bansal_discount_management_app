import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet,Modal } from 'react-native';

const LoadingIndicator = ({ visible, text }) => {
  if (!visible) {
    return null; 
  }

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
            <ActivityIndicator size="large" color="rgba(177, 41, 44, 1)" />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white', // Adjust the background color of the inner container as needed
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular', // Add font family styling as needed
    fontSize: 16, // Add font size styling as needed
    color: 'rgba(177, 41, 44, 1)', // Add text color styling as needed
  },
});

export default LoadingIndicator;