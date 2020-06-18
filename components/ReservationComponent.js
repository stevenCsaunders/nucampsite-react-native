import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	Picker,
	Switch,
	Button,
	Alert,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'

class Reservation extends Component {
	constructor(props) {
		super(props)

		this.state = {
			campers: 1,
			hikeIn: false,
			date: '',
			showModal: false,
		}
	}

	static navigationOptions = {
		title: 'Reserve Campsite',
	}

	handleReservation() {
		// handling the search button press
		Alert.alert(
			`Begin Search?`, // Title of alert
			`Number of campers ${this.state.campers}\nHike in? ${this.state.hikeIn}\nDate: ${this.state.date}`, //Message for alert
			[
				{
					text: 'Cancel',
					onPress: () => this.resetForm(), // reset the form on press
					style: ' cancel',
				},
				{
					text: 'OK', 
                    onPress: () => {
                        this.presentLocalNotification(this.state.date); //shows the local notificaoin when pressing the OK button
                        this.resetForm();
                    } //reset the form on press
				},
			],
			{ cancelable: false }
		)
	}

	//awaits permission from user to show notificaiton
	async obtainNotificationPermission() {
        const permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            const permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
            return permission;
        }
        return permission;
    }

	// presents the notification to the user with selected date
    async presentLocalNotification(date) {
        const permission = await this.obtainNotificationPermission();
        if (permission.status === 'granted') {
            Notifications.presentLocalNotificationAsync({
                title: `Your Campsite Reservation Search`,
                body: `Search for ${date} requested`
            });
        }
    }

	resetForm() {
		// reset the form to initial state
		this.setState({
			campers: 1,
			hikeIn: false,
			date: '',
			showModal: false,
		})
	}

	render() {
		return (
			<Animatable.View //animate in the view
				animation="zoomIn"
				duration={2000}
				delay={1000}
			>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Number of Campers</Text>
					<Picker
						style={styles.formItem}
						selectedValue={this.state.campers}
						onValueChange={(itemValue) =>
							this.setState({ campers: itemValue })
						}
					>
						<Picker.Item label="1" value="1" />
						<Picker.Item label="2" value="2" />
						<Picker.Item label="3" value="3" />
						<Picker.Item label="4" value="4" />
						<Picker.Item label="5" value="5" />
						<Picker.Item label="6" value="6" />
					</Picker>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Hike-In?</Text>
					<Switch
						style={styles.formItem}
						value={this.state.hikeIn}
						trackColor={{ true: '#5637DD', false: null }}
						onValueChange={(value) =>
							this.setState({ hikeIn: value })
						}
					></Switch>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Date</Text>
					<DatePicker
						style={{ flex: 2, marginRight: 20 }}
						date={this.state.date}
						format="YYYY-MM-DD"
						mode="date"
						placeholder="Select Date"
						minDate={new Date().toISOString()}
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0,
							},
							dateInput: {
								marginLeft: 36,
							},
						}}
						onDateChange={(date) => {
							this.setState({ date: date })
						}}
					/>
				</View>
				<View style={styles.formRow}>
					<Button
						onPress={() => this.handleReservation()}
						title="Search"
						color="#5637DD"
						accessibilityLabel="Tap me to search for available campsites to reserve"
					/>
				</View>
			</Animatable.View>
		)
	}
}

const styles = StyleSheet.create({
	formRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20,
	},
	formLabel: {
		fontSize: 18,
		flex: 2,
	},
	formItem: {
		flex: 1,
	},
	modal: {
		justifyContent: 'center',
		margin: 20,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		backgroundColor: '#5637DD',
		textAlign: 'center',
		color: '#fff',
		marginBottom: 20,
	},
	modalText: {
		fontSize: 18,
		margin: 10,
	},
})

export default Reservation
