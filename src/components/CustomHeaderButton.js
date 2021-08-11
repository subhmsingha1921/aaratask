import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
	HeaderButton,
} from 'react-navigation-header-buttons';


const CustomHeaderButton = (props) => (
	<HeaderButton IconComponent={Feather} color="#fff" iconSize={28} {...props} />
);

export default CustomHeaderButton;