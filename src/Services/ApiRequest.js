// import axios from 'axios';
// import { constants } from '../constraints';

// const Headers = {
//   Header: {
//     'Content-Type': 'application/json',
//   },
//   Header2: {
//     Accept: 'application/json',
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
// };
// const ApiRequest = async (url, Apidata) => {
//   // This will remove authorization and store id
//   const result = await axios.post(constants.baseUrl + url, Apidata, {
//     headers: Headers.Header2,
//   });
//   return result;
// };
// export const GetApiRequest = async (url, Apidata) => {
//   // This will remove authorization and store id
//   const result = await axios.get(constants.baseUrl + url, Apidata, {
//     headers: Headers.Header2,
//   });
//   return result;
// };

// export default ApiRequest;

// export const GetPlaceName = async (myLat, myLon) => {
//   try {
//     const res = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${myLat},${myLon}&key=${constants.GOOGLE_API_KEY}`,
//     );
//     return res
//   } catch (error) { console.log(error) }
// };

import axios from 'axios';

const Headers = {
  Header: {
    'Content-Type': 'application/json',
  },
  Header2: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};


const ApiRequest = async data => {
  // This will remove authorization and store id
  const result = await axios.post(
    `http://192.168.0.236:3000${data.type}`,
    data.data,
    {
      headers: Headers.Header,
    },
  );
  return result;
};

export const ApiRequestGet = async data => {
  // This will remove authorization and store id
  const result = await axios.get(
    `http://192.168.0.236:3000${data.type}`
  );
  return result;
};

export const ApiRequestPatch = async data => {
  // This will remove authorization and store id
  const result = await axios.patch(
    `http://192.168.0.236:3000${data.type}`,data.data ,
    {
      headers: Headers.Header,
    },
  );
  return result;
};

export const NewApiRequest = async (url, data) => {
  // This will remove authorization and store id
  const result = await axios.post(constants.baseUrl + url, data, {
    headers: Headers.Header2,
  });
  return result;
};

export default ApiRequest;
