import { Alert } from 'react-native';

export const AlertService = {
    ShowSingleActionAlert : async function (message, btnTxt = "Ok") {
        Alert.alert(message, "", [
            {
              text: btnTxt,
              onPress: () => console.log('Button Pressed'),
              style: 'cancel',
            }
          ]);
    },
    ShowDualActionAlert : async function (message, PostivebtnTxt = "Ok", NegativebtnTxt = "Cancel",onPress) {
        Alert.alert(message, "", [
            {
                text: NegativebtnTxt,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: PostivebtnTxt, onPress: () => onPress()},
          ]);
    }
}