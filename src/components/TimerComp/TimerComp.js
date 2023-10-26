import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

function TimerComp({onResendOtp, setRemainingTime, remainingTime}) {
  useEffect(() => {
    if (remainingTime > 0) {
      const timerId = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [remainingTime]);

  const handleSendOtp = () => {
    if (remainingTime === 0) {
      // Handle sending OTP here
      onResendOtp();
      setRemainingTime(29); // Reset the timer
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSendOtp}
      disabled={remainingTime !== 0}
      style={{paddingTop: 10, marginVertical: 40, alignSelf: 'center'}}>
      <Text>
        {remainingTime !== 0 ? `Resend in ${remainingTime} Sec` : 'Resend code'}
      </Text>
    </TouchableOpacity>
  );
}

export default TimerComp;

//// how we call  it

// const [remainingTime, setRemainingTime] = useState(29);
//      <TimerComp
//        onResendOtp={handleOTP} your otp call api function
//        setRemainingTime={setRemainingTime}  state to set data
//        remainingTime={remainingTime}  start to show data
//      />;
