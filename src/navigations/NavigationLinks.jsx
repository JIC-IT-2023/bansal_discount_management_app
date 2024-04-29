import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';
import RequestScreen from '../screens/requests/RequestScreen';
import ALertScreen from '../screens/alerts/AlertScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View,Image, ImageBackground, Text, Platform } from 'react-native';
import AddRequestScreen from '../screens/requests/PatientDetailsScreen';
import PatientDetailsScreen from '../screens/requests/PatientDetailsScreen';
import AdditionalInfoScreen from '../screens/requests/AdditionalInfoScreen';
import DiscountAmountScreen from '../screens/requests/DiscountAmountScreen';
import ReviewScreen from '../screens/requests/ReviewScreen';
import EmployeeScreen from '../screens/requests/EmployeeScreen';
import SuccessScreen from '../screens/requests/SuccessScreen';
import RequestExpandScreen from '../screens/requests/RequestExpandScreen';
import EmailVerification from '../screens/forgetpassword/EmailVerification';
import OtpVerification from '../screens/forgetpassword/OtpVerification';
import ResetPassword from '../screens/forgetpassword/ResetPassword';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      
      <Tab.Navigator     
        screenOptions={({ route,focused }) => ({
        tabBarShowLabel : false,
        headerShown: false,
        tabBarActiveTintColor: 'rgba(13, 20, 34, 1)',
        tabBarInactiveTintColor:'rgba(12, 97, 134, 1)',
        tabBarStyle:[{
          display:'flex',
          backgroundColor:'rgba(12, 97, 134, 1)',
          // height:5
        }],
        tabBarLabelStyle : [{
           bottom:20,
           fontFamily : "PlusJakartaSans-Medium",
        }],
       
        tabBarIcon: ({ focused }) => {
          let iconComponent;
  
          if (route.name === 'Home') {
            iconComponent = focused ? (
              <View>
                <ImageBackground style={{width:90, height:60,alignItems:'center',justifyContent:'center',marginTop:Platform.OS === 'ios' ? 9:0}} source={require('../assets/images/tabBackground.png')}>
                    <Image style={{width:24, height:23,bottom:4}} source={require('../assets/images/home_active.png')}></Image>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:10, fontFamily : "PlusJakartaSans-Bold",}}>HOME</Text>
                </ImageBackground>
              </View>
            ) : (
             <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image style={{width:24, height:23,bottom:3}} source={require('../assets/images/home_inactive.png')}></Image>
             </View>
            );
          } 
          else if (route.name === 'Requests') {
            iconComponent = focused ? (
                <ImageBackground style={{width:90, height:58,alignItems:'center',justifyContent:'center',marginTop:Platform.OS === 'ios' ? 8:0}} source={require('../assets/images/tabBackground.png')}>
                    <Image style={{width:28, height:23,bottom:4}} source={require('../assets/images/request_active.png')}></Image>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:10, fontFamily : "PlusJakartaSans-Bold",}}>REQUESTS</Text>
                </ImageBackground>
            ) : (
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image style={{width:28, height:23,bottom:3}} source={require('../assets/images/request_inactive.png')}></Image>
             </View>
            );
          }
          else if (route.name === 'Alert') {
            iconComponent = focused ? (
            <ImageBackground style={{width:90, height:58,alignItems:'center',justifyContent:'center',marginTop:Platform.OS === 'ios' ? 8:0}} source={require('../assets/images/tabBackground.png')}>
                <Image style={{width:24, height:23,bottom:4}} source={require('../assets/images/alert_active.png')}></Image>
                <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:10, fontFamily : "PlusJakartaSans-Bold",}}>ALERTS</Text>
            </ImageBackground>
            ) : (
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image style={{width:24, height:23,bottom:3}} source={require('../assets/images/alert_inactive.png')}></Image>
             </View>
            );
          }
          else if (route.name === 'Profile'){
            iconComponent = focused ? (
            <ImageBackground style={{width:90, height:58,alignItems:'center',justifyContent:'center',marginTop:Platform.OS === 'ios' ? 8:0}} source={require('../assets/images/tabBackground.png')}>
                <Image style={{width:24, height:23,bottom:4}} source={require('../assets/images/profile_active.png')}></Image>
                <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:10, fontFamily : "PlusJakartaSans-Bold",}}>PROFILE</Text>
            </ImageBackground>
            ): (
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image style={{width:24, height:23,bottom:3}} source={require('../assets/images/profile_inactive.png')}></Image>
             </View>
            )
          }
          return iconComponent;
        },
      })}>
          <Tab.Screen name="Home" component={HomeScreen} 
          options={{
            tabBarLabel:'HOME' , // Show label only if tab is focused
            }} />
          <Tab.Screen name="Requests" component={RequestScreen} options={{
            tabBarLabel: 'Requests',
          }}/>
          <Tab.Screen name="Alert" component={ALertScreen} options={{
            tabBarLabel: 'Alerts',
          }}/>
          <Tab.Screen name="Profile" component={ProfileScreen} 
          options={{tabBarLabel: 'Profile'
          }}/>
          
      </Tab.Navigator>
    );
  }

function NavigationLinks(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name='HomeScreen' component={MyTabs} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name='PatientDetails' component={PatientDetailsScreen} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name='AdditionalInfo' component={AdditionalInfoScreen} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name='DiscountAmount' component={DiscountAmountScreen} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name='Review' component={ReviewScreen} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name='Employee' component={EmployeeScreen} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name='Success' component={SuccessScreen} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name='RequestExpand' component={RequestExpandScreen} options={{headerShown:false}}></Stack.Screen>
              <Stack.Screen name='EmailVerification' component={EmailVerification} options={{headerShown:false}}/>
              <Stack.Screen name='OtpVerification' component={OtpVerification} options={{headerShown:false}}/>
              <Stack.Screen name='ResetPassword' component={ResetPassword} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationLinks;