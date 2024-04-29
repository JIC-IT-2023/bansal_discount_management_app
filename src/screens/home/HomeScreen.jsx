import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, SafeAreaView, Text, View, StyleSheet ,Pressable, ScrollView, ImageBackground} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { HomeApi } from "../../services/home/HomeServices";
import { useAppContext } from "../../context/AppContext";



function HomeScreen() {
  const genderOptions = [
    { label: 'Monthly', value: '1' },
    { label: 'Weekly', value: '2' },
    { label: 'Today', value: '3' }
  ];
  const filterTitle = [
    {
      id:1,
      title : 'All'
    },
    {
      id : 2,
      title: 'Employee'
    },
    {
      id : 3,
      title : 'Non-Employee'
    }
  ]
  const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
  const [selected, setSelected] = useState(genderOptions[2]);
  const [userDetails, setUserDetails] = useState();
  const {updateDetails} = useAppContext();
  const [discountCount, setDiscountCount] = useState();

  const handleSelect = (value) => {
    setSelected(value);
  };
  const handlePress = (item) => {
    console.log("handlePress",item)
    //setIsLoading(true)
    setSelectedFilter(item);
    // console.log('selected==', item)
    // if(item.title === 'All Transactions'){
    //   getHistoryList();
    // }
    // else{
    //   getHistoryStatusList(item.value);
    // }
  };
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
       // await AsyncStorage.setItem('LastScreen', 'Home');
        getUserDetails();
        getDiscountCounts();
      };

      fetchData();
     
      return () => {
        // Optional: clean up logic when the screen is unfocused
      };
    }, [])
  );
  async function getUserDetails(){
    await HomeApi.getUserDetails()
      .then((res) => {
        console.log('user====', res.data);
        setUserDetails(res.data);
        updateDetails(res.data)
    }).catch((err) => {
      console.log('errrr',err);
    })
  }
  async function getDiscountCounts(){
    await HomeApi.getDiscount()
      .then((res) => {
        console.log('user====', res.data);
        setDiscountCount(res.data);
        // updateDetails(res.data)
    }).catch((err) => {
      console.log('errrr',err);
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
        <View style={styles.header}>
            <Image style={{width:38, height:38, borderRadius:4, marginLeft:20}} source={require('../../assets/images/profile_pic.png')}></Image>
            <View style={styles.profile}>
                <Text style={styles.welcome}>WELCOME</Text>
                <Text style={styles.username}>{userDetails?.name}!</Text>
            </View>
        <View style={styles.modBadge}>
          <Text style={styles.modText}>{userDetails?.role}</Text>
        </View>
      </View>
      <View style={styles.discountContainer}>
        <ImageBackground style={styles.imageBackground} source={require('../../assets/images/discount_background.png')}>
        <Image style={styles.discountIcon} source={require('../../assets/images/discount.png')} />
        <View style={styles.discountText}>
          <Text style={styles.discountTitle}>All Discounts</Text>
          <Text style={styles.discountNumber}>{setSelected?.label=== "Today" ?  discountCount?.discount_amount_granted_today : setSelected?.label=== "Weekly" ? discountCount?.discount_amount_granted_weekly :discountCount?.discount_amount_granted_monthly }</Text>
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
      {userDetails?.role === 'MOD' && 
      <View style={{flexDirection:'row',width:'94%',alignSelf:'center'}}>
        <View style={{backgroundColor:'rgba(11, 160, 220, 1)',width:'50%', height:60,alignSelf:'center',borderBottomLeftRadius:8,justifyContent:'center'}}>
            <Text style={{color:'rgba(6, 47, 65, 1)', fontFamily:'PlusJakartaSans-Medium', fontSize:10,marginLeft:10}}>Employee Discounts</Text>
            <Text style={{color:'rgba(6, 47, 65, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:13,marginLeft:10}}>{setSelected?.label=== "Today" ?  discountCount?.employees_today_requests : setSelected?.label=== "Weekly" ? discountCount?.employees_weekly_requests :discountCount?.employees_monthly_requests }</Text>
        </View>
        <View style={{backgroundColor:'rgba(168, 207, 69, 1)',width:'50%', height:60,alignSelf:'center',borderBottomRightRadius:8,justifyContent:'center'}}>
            <Text style={{color:'rgba(6, 47, 65, 1)', fontFamily:'PlusJakartaSans-Medium', fontSize:10,marginLeft:10}}>Non-Employee Discounts</Text>
            <Text style={{color:'rgba(6, 47, 65, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:13,marginLeft:10}}>{setSelected?.label=== "Today" ?  discountCount?.non_employees_today_requests : setSelected?.label=== "Weekly" ? discountCount?.non_employees_weekly_requests:discountCount?.non_employees_monthly_requests}</Text>
        </View>
      </View>
    }
      <View style={{flexDirection:'row',marginTop:13,alignItems:'center',alignSelf:'center'}}>
        <View style={{width:'30%', height:1.5,backgroundColor:'rgba(239, 243, 249, 1)'}}></View>
        <Text style={{color:'rgba(159, 164, 173, 1)', fontSize:10, fontFamily:'PlusJakartaSans-Regular'}}>Discount Requests Breakdown</Text>
        <View style={{width:'30%', height:1.5,backgroundColor:'rgba(239, 243, 249, 1)'}}></View>
      </View>
      {userDetails?.role === 'MOD' && 
      <View style={{flexDirection:'row',backgroundColor:'rgba(239, 243, 249, 1)',width:'93%', height:37, borderRadius:6,alignItems:'center',justifyContent:'space-around',alignSelf:'center',marginTop:13}}>
      {filterTitle.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[
                styles.filterContainer,
                selectedFilter.id === item.id && styles.selectedFilter,
              ]}
              onPress={() => {handlePress(item)}}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter.id === item.id && styles.selectedText,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      }
      <View style={{marginTop:15,alignItems:'center'}}>
        <View style={{width:'93%', height:76, backgroundColor:'rgba(242, 201, 150, 1)',borderRadius:8,flexDirection:'row'}}>
           <View>
              <Text style={{color:'rgba(167, 84, 0, 1)', fontFamily:'PlusJakartaSans-Medium', fontSize:13,marginLeft:10,textAlign:'left',marginTop:10}}>Pending Discounts</Text>
              <Text style={{color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:18,marginLeft:10,textAlign:'left'}}>{selectedFilter?.title === "All" ?  discountCount?.pending : selectedFilter?.title === "Employee" ? discountCount?.employees_pending :discountCount?.non_employees_pending }</Text>
           </View>
           <Image style={{marginLeft:'auto'}} source={require('../../assets/images/yellow.png')}></Image>
        </View>
        <View style={{width:'93%', height:76, backgroundColor:'rgba(167, 216, 173, 1)',borderRadius:8,flexDirection:'row',marginTop:10}}>
           <View>
              <Text style={{color:'rgba(39, 104, 49, 1)', fontFamily:'PlusJakartaSans-Medium', fontSize:13,marginLeft:10,textAlign:'left',marginTop:15}}>Accepted Discounts</Text>
              <Text style={{color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:18,marginLeft:10,textAlign:'left'}}>{selectedFilter?.title === "All" ?  discountCount?.approved : selectedFilter?.title === "Employee" ? discountCount?.employees_approved :discountCount?.non_employees_approved }</Text>
           </View>
           <Image style={{marginLeft:'auto'}} source={require('../../assets/images/green.png')}></Image>
        </View>
        <View style={{width:'93%', height:76, backgroundColor:'rgba(237, 162, 162, 1)',borderRadius:8,flexDirection:'row',marginTop:10}}>
           <View>
              <Text style={{color:'rgba(137, 11, 11, 1)', fontFamily:'PlusJakartaSans-Medium', fontSize:13,marginLeft:10,textAlign:'left',marginTop:15}}>Rejected Discountss</Text>
              <Text style={{color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:18,marginLeft:10,textAlign:'left'}}>{selectedFilter?.title === "All" ?  discountCount?.rejected : selectedFilter?.title === "Employee" ? discountCount?.employees_rejected :discountCount?.non_employees_rejected }</Text>
           </View>
           <Image style={{marginLeft:'auto'}} source={require('../../assets/images/red.png')}></Image>
        </View>
        <View style={{width:'93%', height:76, backgroundColor:'rgba(155, 216, 241, 1)',borderRadius:8,flexDirection:'row',marginTop:10,marginBottom:40}}>
           <View>
              <Text style={{color:'rgba(12, 97, 134, 1)', fontFamily:'PlusJakartaSans-Medium', fontSize:13,marginLeft:10,textAlign:'left',marginTop:15}}>Cumulative Discount Amount Granted:</Text>
              <Text style={{color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:18,marginLeft:10,textAlign:'left'}}>{selectedFilter?.title === "All" ?  discountCount?.completed : selectedFilter?.title === "Employee" ? discountCount?.employees_completed :discountCount?.non_employees_completed }</Text>
           </View>
           <Image style={{marginLeft:'auto'}} source={require('../../assets/images/blue.png')}></Image>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    color: 'rgba(120, 126, 139, 1)',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
  },
  username: {
    color: 'rgba(13, 20, 34, 1)',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 13,
  },
  modBadge: {
    backgroundColor: 'rgba(239, 243, 249, 1)',
    width: 42,
    height: 20,
    marginLeft: 'auto',
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modText: {
    color: 'rgba(13, 20, 34, 1)',
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
    fontSize: 12,
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

export default HomeScreen;