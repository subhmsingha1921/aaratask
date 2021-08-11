import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');


const FieldInput = ({ fieldLabel, fieldType, onChangeValue, value }) => {

	const handleChangeValue = (text) => {
		// if (!text) return;
		onChangeValue(text);
	}

	return (
		<View style={styles.field}>
			<Text style={styles.label}>{fieldLabel}</Text>
			<TextInput 
				keyboardType={fieldType}
				style={styles.formInput}
				onChangeText={(text) => handleChangeValue(text)}
				secureTextEntry={fieldLabel === 'Password' ? true : false}
				value={value}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	field: {
		width: width * 0.9,
		marginVertical: 12,
	},
	label: {
		fontSize: 17,
		marginBottom: -5,
	},
	formInput: {
		color: 'grey',
		fontSize: 17,
		borderBottomWidth: 1,
		borderColor: 'grey',
		height: 40,
		paddingBottom: -3,
		paddingHorizontal: 0,
	}
});

export default FieldInput;