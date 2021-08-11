import React, {useEffect, useState} from 'react';
import { 
	Alert, 
	Dimensions, 
	KeyboardAvoidingView,
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View 
} from 'react-native';
import { RadioButton } from 'react-native-paper';

import FieldInput from '../components/FieldInput';
import GradientButton from '../components/GradientButton';
import { signInUrl } from '../api/data';

const { width } = Dimensions.get('window');


const SigninScreen = (props) => {
	const [value, setValue] = useState('seeker');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChangeEmail = (text) => setEmail(text);
	const handleChangePassword = (text) => setPassword(text);

	const handleSignin = async() => {
		if (!email || !password) {
			Alert.alert('Field Error', 'Field cannot be empty!');
			return;
		}
		console.log(value, email, password);
		const formData = new FormData();
		formData.append('type', value);
		formData.append('email', email);
		formData.append('ps', password);

		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data' 
			},
			body: formData
		};

		try {
			let response = await fetch(signInUrl, requestOptions);
			let data = await response.json();
			console.log(data.staus);
			if (data.staus === "true") {
				Alert.alert("Login successful.");
				props.navigation.navigate('Jobs');
			} else {
				Alert.alert("Login failed!", data.message);
			}
			console.log("response sigin", data);
		} catch (e) {
			console.log(e);
		}
		setEmail('');
		setPassword('');
	}

	return (
		<KeyboardAvoidingView style={styles.container}>
			<Text style={styles.headerText}>Login</Text>
			<View style={styles.formContainer}>
				<RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
					<View style={styles.radioButtonContainer}>
						<View style={styles.radioButton}>
							<RadioButton color="#5376da" value='seeker' />
							<Text 
								style={[
									styles.radioText, 
									{color: value === 'seeker' ? '#5376da' : 'grey'}
								]}
							>
								Seeker
							</Text>
						</View>
						<View style={styles.radioButton}>
							<RadioButton color="#5376da" value='recruiter' />
							<Text 
								style={[
									styles.radioText, 
									{color: value === 'recruiter' ? '#5376da' : 'grey'}
								]}
							>
								Recruiter
							</Text>
						</View>
					</View>
				</RadioButton.Group>
				<FieldInput 
					fieldLabel="Your email" 
					fieldType="email-address" 
					onChangeValue={handleChangeEmail}
					value={email}
				/>
				<FieldInput 
					fieldLabel="Password" 
					fieldType="default" 
					onChangeValue={handleChangePassword}
					value={password}
				/>
				<View style={styles.whitespace} />
				<GradientButton buttonText="Login" onPress={handleSignin} />
			</View>
			<View style={styles.navigateContainer}>
				<Text style={styles.text}>Don't have an account ? </Text>
				<TouchableOpacity onPress={() => {props.navigation.navigate('Signup')}}>
					<Text style={styles.navigateButton}>Register</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#eaeaea',
	},
	headerText: {
		marginVertical: 45,
		fontSize: 28,
		fontWeight: 'bold',
		color: '#5376da',
	},
	radioButtonContainer: {
		height: 50,
		width: width * 0.9,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 20,
	},
	radioButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	radioText: {
		fontSize: 23,
		fontWeight: 'bold',
	},
	whitespace: {
		marginVertical: 8,
	},
	navigateContainer: {
		flexDirection: 'row',
		marginTop: 12,
	},
	text: {
		fontSize: 17,
	},
	navigateButton: {
		fontSize: 17,
		color: '#5376da',
	}
});

export default SigninScreen;