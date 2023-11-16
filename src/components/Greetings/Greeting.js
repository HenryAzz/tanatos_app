import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import style from '../../assets/css/style';
import {colors} from '../../constraints';
import {useTranslation} from 'react-i18next';

function Greetings({accountType}) {
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState('');
  const {t} = useTranslation();
  // console.log(accountType, 'accountTypeaccountTypeaccountType');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(t('Good Morning'));
    } else if (hour < 18) {
      setGreeting(t('Good Afternoon'));
    } else {
      setGreeting('Good Evening');
    }

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      style={[
        style.font14Re,
        {color: accountType === 'store' ? colors.white : colors.textGray},
      ]}>
      {greeting}
    </Text>
  );
}

export default Greetings;

/// call it
// <Greetings/>
