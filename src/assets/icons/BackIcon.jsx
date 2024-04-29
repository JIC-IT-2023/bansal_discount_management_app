import React from 'react';
import { Svg, Path } from 'react-native-svg';

const BackIcon = () => {
  return (
    <Svg width={20} height={16} viewBox="0 0 20 16" fill="none">
      <Path
        d="M20 8C20 7.44772 19.5523 7 19 7H3.87303L8.79984 2.12794C9.19906 1.73315 9.19792 1.08801 8.79731 0.694632C8.40494 0.309356 7.77593 0.310467 7.38493 0.697128L0.727115 7.28096C0.326861 7.67677 0.326861 8.32323 0.727114 8.71904L7.38461 15.3026C7.77539 15.689 8.40438 15.689 8.79516 15.3026C9.19192 14.9102 9.1922 14.2695 8.7958 13.8768L3.87303 9H19C19.5523 9 20 8.55229 20 8Z"
        fill="#0D1422"
      />
    </Svg>
  );
};

export default BackIcon;