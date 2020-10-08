import { CommonActions } from '@react-navigation/native';

let navigation

export const setNavigator = nav =>{
    console.log("nave", nav);
    navigation = nav
}
 
export const navigate = ( routeName,params )=>{

    console.log(navigation);
    // navigation.navigate(routeName)

    // navigation.dispatch(
    //     CommonActions.navigate({
    //       name: routeName,
    //       params: {
    //         user: 'jane',
    //       },
    //     })
    //   );
}