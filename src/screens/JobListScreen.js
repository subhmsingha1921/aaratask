import React, {useEffect, useState} from 'react';
import { 
	Alert, 
	Dimensions, 
	FlatList,
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { jobListUrl } from '../api/data';

const { width } = Dimensions.get('window');


const JobListScreen = (props) => {
	const [jobs, setJobs] =useState([]);

	useEffect(() => {
		async function fetchJobs() {
			let response = await fetch(jobListUrl);
			let data = await response.json();
			setJobs(data.data);
		}
		fetchJobs();
	}, [])

	const JobItem = ({item}) => {
		return (
			<View style={styles.card}>
				<Text style={styles.jobType}>{item.designation}</Text>
				<Text style={styles.organization}>{item.area_of_sector}</Text>
				<View style={styles.exploc}>
					<View style={styles.breadCrumb}>
						<Ionicons name="briefcase-outline" size={13} color="grey" />
						<Text style={styles.breadText}>{item.exp}</Text>
					</View>
					<View style={styles.breadCrumb}>
						<Ionicons name="location" size={13} color="grey" />
						<Text style={styles.breadText}>{item.job_location}</Text>
					</View>
				</View>
				<View style={styles.languages}>
					<Ionicons name="information-circle-outline" size={20} color="grey" />
					<Text style={styles.tech}>{item.technology}</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.listContainer}>
				<FlatList 
					data={jobs}
					renderItem={({ item }) => <JobItem item={item} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#eaeaea',
	},
	listContainer: {
		width: width * 0.9,
		paddingTop: 20,
	},
	card: {
		backgroundColor: '#fff',
		marginVertical: 5,
		elevation: 3,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	jobType: {
		color: 'black',
		fontSize: 16,
		marginBottom: 5,
	},
	organization: {
		color: 'grey',
		fontSize: 16,
		marginBottom: 5,
	},
	exploc: {
		flexDirection: 'row',
	},
	breadCrumb: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 4,
		paddingVertical: 1,
		backgroundColor: '#eaeaea',
		borderRadius: 10,
		marginVertical: 7,
		marginRight: 10,
	},
	breadText: {
		fontSize: 12,
		color: 'grey',
		marginLeft: 2,
	},
	languages: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 3,
		marginTop: 5,
	},
	tech: {
		fontSize: 15,
		marginLeft: 5,
	}
});

export default JobListScreen;