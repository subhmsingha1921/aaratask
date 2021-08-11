import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');


const GradientButton = ({ buttonText, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<LinearGradient 
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				colors={['#5376da', '#8854e8']}
				style={styles.buttonContainer}
			>
				<Text style={styles.buttonText}>{buttonText}</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.33,
		height: 40,
		backgroundColor: '#6c61e5',
		borderRadius: 40,
		marginVertical: 25,
		elevation: 2,
	},
	buttonText: {
		fontSize: 17,
		color: 'white',
	}
});

export default GradientButton;