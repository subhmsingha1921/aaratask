import React, {useEffect, useState} from 'react';
import { 
	Alert, 
	Dimensions, 
	KeyboardAvoidingView, 
	StatusBar, 
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View 
} from 'react-native';
import { RadioButton } from 'react-native-paper';

import FieldInput from '../components/FieldInput';
import GradientButton from '../components/GradientButton';
import { signUpUrl } from '../api/data';

const { width } = Dimensions.get('window');


const SignupScreen = (props) => {
	const [value, setValue] = useState('seeker');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

	const handleChangeEmail = (text) => setEmail(text);
	const handleChangeName = (text) => setName(text);
	const handleChangePhone = (text) => setPhone(text);
	const handleChangePassword = (text) => setPassword(text);

	const handleSignup = async() => {
		if (!email || !name || !phone || !password) {
			Alert.alert('Field Error', 'Field cannot be empty!');
			return;
		}
		console.log(value, email, name, phone, password);
		const formData = new FormData();
		formData.append('type', value);
		formData.append('email', email);
		formData.append('name', name);
		formData.append('mno', phone);
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
			let response = await fetch(signUpUrl, requestOptions);
			let data = await response.text();
			Alert.alert("Account created.");
			console.log("response", data);
		} catch (e) {
			console.log(e);
		}

		setEmail('');
		setName('');
		setPhone('');
		setPassword('');
	}

	return (
		<KeyboardAvoidingView behavior="height" style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#eaeaea" />
			<Text style={styles.headerText}>Signup</Text>
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
					fieldLabel="Your Name" 
					fieldType="default" 
					onChangeValue={handleChangeName}
					value={name}
				/>
				<FieldInput 
					fieldLabel="Your Number" 
					fieldType="number-pad" 
					onChangeValue={handleChangePhone}
					value={phone}
				/>
				<FieldInput 
					fieldLabel="Password" 
					fieldType="default" 
					onChangeValue={handleChangePassword}
					value={password}
				/>
				<GradientButton buttonText="Sign up" onPress={handleSignup} />
			</View>
			<View style={styles.navigateContainer}>
				<Text style={styles.text}>Already have an account ? </Text>
				<TouchableOpacity onPress={() => {props.navigation.navigate('Signin')}}>
					<Text style={styles.navigateButton}>Login</Text>
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
		fontSize: 25,
		fontWeight: 'bold',
	},
	navigateContainer: {
		flexDirection: 'row',
		marginTop: 8,
	},
	text: {
		fontSize: 17,
	},
	navigateButton: {
		fontSize: 17,
		color: '#5376da',
	}
});

export default SignupScreen;