import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ImageBackground, SafeAreaView, Text, View ,Image, StyleSheet, Pressable,Alert} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import LoadingIndicator from "../../components/LoadingIndicator";



function ProfileScreen(){
  const navigation = useNavigation();
  const genderOptions = [
    { label: 'Monthly', value: '1' },
    { label: 'Weekly', value: '2' },
    { label: 'Daily', value: '3' }
  ];
  const [selected, setSelected] = useState("");
  const [ refreshToken, setRefreshToken] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
  };
  useFocusEffect(
    useCallback(() => {
      const getValueFromStorage = async () => {
        setIsLoading(true);
        try {
          // const user = await AsyncStorage.getItem('role');
          // const userName = await AsyncStorage.getItem('username');
          // const userEmail = await AsyncStorage.getItem('email');
          const refresh = await AsyncStorage.getItem('refresh_token');
          setRefreshToken(refresh);
  
          // let newRole = user;
          // let newUserName = userName;
          // let newUserEmail = userEmail;
          // let newRefreshToken = refresh;
  
          // if (
          //   newRole !== role ||
          //   newUserName !== name ||
          //   newUserEmail !== emailid ||
          //   newRefreshToken !== refreshToken
          // ) {
          //   setRole(newRole);
          //   setName(newUserName);
          //   setEmailId(newUserEmail);
          // }
  
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data from AsyncStorage:', error);
          setIsLoading(false);
        }
      };
      getValueFromStorage();
    }, [refreshToken])
  );
  function logoutHandler(){
    Alert.alert(
        'Logout',
        'Are you sure you want to logout?',[
        {
            text: "No",
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: "Yes", 
            onPress:() => {
                setIsLoading(true);
                // navigation.navigate('Login')
                const data = {
                    refresh : refreshToken
                }
                console.log('data', data);
                // ProfileApi.logout(data).then(async(res) => {
                //     console.log('res', res.data);
                //     if(res.status === 200){
                //         await AsyncStorage.removeItem('access_token')
                //         await AsyncStorage.removeItem('isLoggedIn');
                //         await AsyncStorage.removeItem('mobile_no');
                //         await AsyncStorage.removeItem('role');
                //         await AsyncStorage.removeItem('username');
                //         await AsyncStorage.removeItem('email')
                //         setIsLoading(false)
                //         navigation.dispatch(
                //             CommonActions.reset({
                //               index: 0,
                //               routes: [
                //                 { name: 'Login' }, // Navigate to the login screen
                //               ],
                //             })
                //           );
                //     }
                // }).catch((err) => {
                //     setIsLoading(false);
                // })
                //   .finally(() => {
                //     setIsLoading(false);
                // });
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      { name: 'Login' }, // Navigate to the login screen
                    ],
                  })
                );
            }
        },
      ]);
    
    
}
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'rgba(248, 249, 249, 1)'}}>
            <View>
              <ImageBackground style={{width:'100%', height:136,alignSelf:'center',marginTop:20,justifyContent:'center'}} source={require('../../assets/images/profile_background.png')}>
                <View style={{flexDirection:'row'}}>
                  <Image style={{width:85, height:85, borderRadius:4, marginLeft:20,borderColor:'rgba(6, 47, 65, 0.5)', borderWidth:2}} source={require('../../assets/images/profile_pic.png')}></Image>
                  <View style={styles.profile}>
                    <Text style={styles.welcome}>Ramu!</Text>
                    <Text style={styles.username}>Ramu@gmail.com</Text>
                    <View style={styles.modBadge}>
                      <Text style={styles.modText}>MOD</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            <View style={styles.discountContainer}>
        <ImageBackground style={styles.imageBackground} source={require('../../assets/images/discount_background.png')}>
        {/* <Image style={styles.discountIcon} source={require('../../assets/images/discount.png')} /> */}
        <View style={styles.discountText}>
          <Text style={styles.discountTitle}>All Requests</Text>
          <Text style={styles.discountNumber}>100</Text>
        </View>        
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[styles.selectedTextStyle]}
            iconStyle={styles.iconStyle}
            // iconColor= {disable ? GlobalColors.iconActive : GlobalColors.iconUnActive } 
            data={genderOptions}
            maxHeight={300}
            // activeColor={selectedValue ? GlobalColors.activeColor : undefined}
            itemTextStyle={styles.itemTextStyle}
            placeholder='Select'
            value={selected}
            labelField='label'
            valueField='value'
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={handleSelect}
        />
         </ImageBackground>
            </View>
      <View style={{flexDirection:'row',width:'94%',alignSelf:'center'}}>
        <View style={{backgroundColor:'rgba(11, 160, 220, 1)',width:'50%', height:60,alignSelf:'center',borderBottomLeftRadius:8,justifyContent:'center'}}>
            <Text style={{color:'rgba(6, 47, 65, 1)', fontFamily:'PlusJakartaSans-Medium', fontSize:10,marginLeft:10}}>Employee Discounts</Text>
            <Text style={{color:'rgba(6, 47, 65, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:13,marginLeft:10}}>40</Text>
        </View>
        <View style={{backgroundColor:'rgba(168, 207, 69, 1)',width:'50%', height:60,alignSelf:'center',borderBottomRightRadius:8,justifyContent:'center'}}>
            <Text style={{color:'rgba(6, 47, 65, 1)', fontFamily:'PlusJakartaSans-Medium', fontSize:10,marginLeft:10}}>Non-Employee Discounts</Text>
            <Text style={{color:'rgba(6, 47, 65, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:13,marginLeft:10}}>40</Text>
        </View>
      </View>
      <View style={{flexDirection:'row',marginTop:13,alignItems:'center',alignSelf:'center'}}>
        <View style={{width:'40%', height:1.5,backgroundColor:'rgba(239, 243, 249, 1)'}}></View>
        <Text style={{color:'rgba(159, 164, 173, 1)', fontSize:10, fontFamily:'PlusJakartaSans-Regular'}}>Other Settings</Text>
        <View style={{width:'40%', height:1.5,backgroundColor:'rgba(239, 243, 249, 1)'}}></View>
      </View>
      <View style={{flexDirection:'row', width:'90%', backgroundColor:'rgba(255, 255, 255, 1)', borderRadius:10,height:52, alignSelf:'center',marginTop:10,alignItems:'center'}}>
        <Text style={{color:"rgba(13, 20, 34, 1)", fontSize:14, fontFamily:'PlusJakartaSans-Medium',marginLeft:10}}>Change Password</Text>
        <Image style={{width:25, height:13,marginLeft:'auto',right:10}} source={require('../../assets/images/change_password.png')}></Image>
      </View>
      <Pressable style={{flexDirection:'row', width:'90%', backgroundColor:'rgba(248, 226, 226, 1)', borderRadius:10,height:52, alignSelf:'center',marginTop:10,alignItems:'center'}} onPress={logoutHandler}>
        <Text style={{color:"rgba(137, 11, 11, 1)", fontSize:14, fontFamily:'PlusJakartaSans-Medium',marginLeft:10}}>Log Out</Text>
        <Image style={{width:20, height:19,marginLeft:'auto',right:10}} source={require('../../assets/images/logout.png')}></Image>
      </Pressable>
        </View>
        {isLoading && <LoadingIndicator visible={isLoading} text='Loading...'></LoadingIndicator>}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(248, 249, 249, 1)',
    },
    header: {
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center',
    },
    logo: {
      alignSelf: 'center',
      marginTop: 15,
      width: 55,
      height: 35,
    },
    profile: {
      marginLeft: 15,   
    },
    welcome: {
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'PlusJakartaSans-Bold',
      fontSize: 19,
    },
    username: {
      color: 'rgba(155, 216, 241, 1)',
      fontFamily: 'PlusJakartaSans-Medium',
      fontSize: 15,
    },
    modBadge: {
      backgroundColor: 'rgba(11, 160, 220, 1)',
      width: 42,
      height: 20,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:5,
      borderRadius:4
    },
    modText: {
      color: 'white',
      fontFamily: 'PlusJakartaSans-Medium',
      fontSize: 10,
    },
    discountContainer: {
      width: '94%',
      height: 84,
      alignSelf: 'center',
      marginTop: 13,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      overflow: 'hidden', // This is important to make borderRadius work
    },
    imageBackground: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      flexDirection: 'row',
    },
    discountIcon: {
      marginLeft: 20,
    },
    discountText: {
      marginLeft: 15,
    },
    discountTitle: {
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'PlusJakartaSans-Medium',
      fontSize: 13,
    },
    discountNumber: {
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'PlusJakartaSans-Bold',
      fontSize: 18,
    },
    dropdown: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      width: 80,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 4,
      height: 27,
      marginLeft:'auto',
      right:20,
      bottom : 7
    },
    placeholderStyle: {
      fontSize: 12,
      color: '#36454F',
      marginLeft:4
  },
  selectedTextStyle: {
      fontSize: 16,
      color: 'black',
      // marginTop: 12,
      marginLeft:5,
      textAlign:'left'
  },
  iconStyle: {
      width: 20,
      height: 20,
      // marginTop:10
  },
  itemTextStyle: {
      color: 'black',
      fontSize: 10,
      marginTop:-10 
  },
  filterContainer: {
    // width:'35%',
    // height:33,
    // // borderWidth: 0.5,
    // // borderRadius: 5,
    // // marginHorizontal: 8,
    // // paddingHorizontal: 10,
    // // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 15,
    // // elevation: 8,
    // // backgroundColor: 'white',
    // marginBottom:20,
    // backgroundColor:'rgba(255, 255, 255, 1)',
    width:'27%',
    height:33,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:6
  },
  filterSection: {
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
  },
  flatListSection: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:20 
  },
  selectedFilter: {
    backgroundColor:'rgba(255, 255, 255, 1)',
    width:'27%',
    height:33,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:6,
    shadowColor: '#000',
    shadowOffset:{ width: 0,height: 2 },
    shadowOpacity: 0.25, 
    shadowRadius: 3,
    elevation:6
  },
  filterText: {
    color: 'black',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize:12
  },
  selectedText: {
    color: 'rgba(13, 20, 34, 1)',
    fontSize:12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  });
  
export default ProfileScreen;