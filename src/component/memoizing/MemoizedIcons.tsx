import React from 'react';
import Google from '../../assets/Google.svg';
import { SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
  width: number;
}

export const GoogleIcon: React.FC<IconProps> = React.memo(({ width }) => (
    <Google width={width} height={width}/>
));
