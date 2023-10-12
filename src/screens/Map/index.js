// // import {StyleSheet, Text, View} from 'react-native';
// // import React, {useEffect, useState} from 'react';
// // import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// // import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
// // import {useRoute} from '@react-navigation/native';
// // import style from '../../assets/css/style';
// // import {colors, fonts} from '../../constraints';
// // const Map = () => {
// //   const route = useRoute();
// //   const {params} = route?.params;
// //   const [initialRegion, setInitialRegion] = useState(null);
// // const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${destLat},${destLng}`;
// //   useEffect(() => {
// //     // Check if params and latitude/longitude are available
// //     if (params && params.lat && params.lng) {
// //       const {lat, lng} = params;
// //       const region = {
// //         latitude: parseFloat(lat),
// //         longitude: parseFloat(lng),
// //         latitudeDelta: 0.032,
// //         longitudeDelta: 0.033,
// //       };
// //       setInitialRegion(region);
// //     }
// //   }, [params]);

// //   return (
// //     <>
// //       <FocusAwareStatusBar
// //         animated={true}
// //         // barStyle={'light-content'}
// //         backgroundColor="transparent"
// //         translucent={true}
// //       />
// //       {initialRegion ? (
// //         <MapView
// //           style={{flex: 1}}
// //           provider={PROVIDER_GOOGLE}
// //           initialRegion={initialRegion}>
// //           <Marker coordinate={initialRegion} title="Current Location" />
// //         </MapView>
// //       ) : (
// //         <Text
// //           style={[
// //             style.font18Re,
// //             {
// //               color: colors.primaryColor,
// //               marginVertical: 100,
// //               fontFamily: fonts.bold,
// //             },
// //           ]}>
// //           No Location Data Available
// //         </Text>
// //       )}
// //     </>
// //   );
// // };

// // export default Map;

// // const styles = StyleSheet.create({});

// import {useRoute} from '@react-navigation/native';
// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import WebView from 'react-native-webview';

// const Map = () => {
//   const route = useRoute();
//   const {params} = route.params;
//   //   console.log(startLat, 'dsd');
//   const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${parseFloat(
//     params.startLat,
//   )},${parseFloat(params.startLng)}&destination=${parseFloat(
//     params.destLat,
//   )},${parseFloat(params.destLng)}`;

//   return (
//     <View style={styles.container}>
//       <WebView source={{uri: directionsUrl}} style={styles.map} />
//     </View>
//   );
// };

// export default Map;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// import {StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
// import {useRoute} from '@react-navigation/native';
// import style from '../../assets/css/style';
// import {colors, fonts} from '../../constraints';
// const Map = () => {
//   const route = useRoute();
//   const {params} = route?.params;
//   const [initialRegion, setInitialRegion] = useState(null);
// const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${destLat},${destLng}`;
//   useEffect(() => {
//     // Check if params and latitude/longitude are available
//     if (params && params.lat && params.lng) {
//       const {lat, lng} = params;
//       const region = {
//         latitude: parseFloat(lat),
//         longitude: parseFloat(lng),
//         latitudeDelta: 0.032,
//         longitudeDelta: 0.033,
//       };
//       setInitialRegion(region);
//     }
//   }, [params]);

//   return (
//     <>
//       <FocusAwareStatusBar
//         animated={true}
//         // barStyle={'light-content'}
//         backgroundColor="transparent"
//         translucent={true}
//       />
//       {initialRegion ? (
//         <MapView
//           style={{flex: 1}}
//           provider={PROVIDER_GOOGLE}
//           initialRegion={initialRegion}>
//           <Marker coordinate={initialRegion} title="Current Location" />
//         </MapView>
//       ) : (
//         <Text
//           style={[
//             style.font18Re,
//             {
//               color: colors.primaryColor,
//               marginVertical: 100,
//               fontFamily: fonts.bold,
//             },
//           ]}>
//           No Location Data Available
//         </Text>
//       )}
//     </>
//   );
// };

// export default Map;

// const styles = StyleSheet.create({});

import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

import MapViewDirections from 'react-native-maps-directions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {colors, constants} from '../../constraints';
const Map = () => {
  const route = useRoute();
  const {params} = route.params;
  console.log(params, 'dsd');
  //   const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${parseFloat(
  //     params.startLat,
  //   )},${parseFloat(params.startLng)}&destination=${parseFloat(
  //     params.destLat,
  //   )},${parseFloat(params.destLng)}`;

  const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = {latitude: 37.771707, longitude: -122.4053769};

  return (
    <View style={styles.container}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          //  latitude: parseFloat(lat),
          //   longitude: parseFloat(lng),
          latitude: 37.3318456,
          longitude: -122.0296002,
          latitudeDelta: 0.032,
          longitudeDelta: 0.033,
        }}>
        {/* <Marker coordinate={region} title="Current Location" /> */}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={constants.MAP_API_KEY}
          strokeWidth={3}
          strokeColor={colors.primaryColor}
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

// <!-- jabbar sir -->
//      android:value="AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc"/>

//   old
//      < !--android: value = "AIzaSyCZLtofoePX_DcD3LIoSYvBg4sKVU-JZR4" /> -->
