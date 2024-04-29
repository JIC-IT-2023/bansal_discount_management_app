import React, { useState } from 'react';
import { TextInput, StyleSheet, Text ,View,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Styles from '../public/Styles';


function CustomTextInput({ placeholder, onChangeText, value, secureTextEntry,inputHeader,isPassword, width,keyboardType ,maxLength, onFocus,editable = true,required}){
    const [showPassword, setShowPassword] = useState(isPassword);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  return (
    <View style={{width:'92%',justifyContent:'center',alignSelf:'center'}}>
        <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:10,marginLeft:5}}>{inputHeader}
          <Text style={{ color: 'red' }}> {required ? '*' : ''}</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry && showPassword}
          placeholderTextColor='rgba(27, 30, 40, 0.3)'
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={onFocus}
          editable= {editable}
        />
        {isPassword && (
        <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: 'absolute', right: 25, top: 55,alignSelf:'center' }}>
            <Icon name={!showPassword ? 'visibility' : 'visibility-off'} size={20} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor:'rgba(255, 255, 255, 1)',
    borderRadius:10,
    marginTop:10,
    color:'black',
    fontFamily:'PlusJakartaSans-Regular'
  },
});

export default CustomTextInput;