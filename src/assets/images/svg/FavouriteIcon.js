import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {colors} from '../../../constraints';

const FavouriteIcon = ({focused = false}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={20} fill="none">
    <Path
      stroke={focused ? colors.primaryColor : colors.gray}
      // stroke="#A2A2A2"
      strokeLinecap="round"
      strokeWidth={2}
      d="M11 3.216C6.5-1.46 1 1.989 1 6.852s4.02 7.454 6.962 9.774C9 17.445 10 18.216 11 18.216M11 3.216c4.5-4.675 10-1.227 10 3.636s-4.02 7.454-6.962 9.774C13 17.445 12 18.216 11 18.216"
    />
  </Svg>
);

export default memo(FavouriteIcon);
