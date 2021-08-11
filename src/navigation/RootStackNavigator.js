import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {
	HeaderButtons,
	Item
} from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/CustomHeaderButton';
import JobListScreen from '../screens/JobListScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';


const RootStack = createStackNavigator();

const RootStackNavigator = () => {
	return (
		<RootStack.Navigator screenOptions={{headerShown:false}}>
			<RootStack.Screen 
				name="Signup"
				component={SignupScreen}
			/>
			<RootStack.Screen 
				name="Signin"
				component={SigninScreen}
			/>
			<RootStack.Screen 
				name="Jobs"
				component={JobListScreen}
				options={{
					headerShown: true,
					headerLeft: () => (
						<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
							<Item title="menu" iconName="menu" onPress={() => alert('menu')} />
						</HeaderButtons>
					),
					headerRight: () => (
						<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
							<Item title="search" iconName="search" onPress={() => alert('search')} />
							<Item title="filter" iconName="filter" onPress={() => alert('filter')} />
						</HeaderButtons>
					),
					headerBackground: () => (
						<LinearGradient 
							colors={['#5376da', '#8854e8']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={{ flex: 1 }}
						/>
					),
					headerStyle: {
						height: 85,
					},
					headerTintColor: 'transparent',
				}}
			/>
		</RootStack.Navigator>
	);
}

export default RootStackNavigator;