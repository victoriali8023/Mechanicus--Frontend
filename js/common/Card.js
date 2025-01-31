import React, { useEffect, useState } from "react";
import {
	TextInput,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Alert,
	Image,
	Button,
	StyleSheet,
} from "react-native";
import { commonStyles, colors } from "./Style";
import { BtnSmall } from "./Buttons";
import { Icon } from "./Svg";
import { resultKeyNameFromField } from "@apollo/client/utilities";

const sampleAppointment = {
	id: 1,
	status: "upcoming",
	scheduleDate: "04/05/2021",
	mechanic: {
		firstName: "Michael",
		lastName: "Williams",
		phone: "123-456-7890",
	},
	quote: {
		id: 1,
		createdAt: "04/05/2021",
		costEstimate: 120.63,
		vehicle: {
			make: "Honda",
			model: "CR-V",
			year: "2019",
			imgUrl:
				"https://file.kelleybluebookimages.com/kbb/base/evox/CP/10858/2017-Ford-Focus-front_10858_032_2400x1800_YZ.png",
			vin: "12345678901234567",
		},
		services: [
			{
				id: "01",
				type: "Vehicle Inspection",
				price: 100,
			},
			{
				id: "02",
				type: "Oil change",
				price: 100,
			},
		],
	},
};
const imageHeight = 50;
const taskStatus = {
	// pending approved canceled completed
	pending: {
		color: colors.secondaryDark,
		bgColor: colors.secondaryLight,
	},
	approved: {
		color: colors.primaryDark,
		bgColor: colors.primaryLight,
	},
	completed: {
		color: colors.gray3,
		bgColor: colors.gray6,
	},
	canceled: {
		color: colors.gray3,
		bgColor: colors.gray6,
	},
};
export const Tag = ({
	title = "text",
	color = colors.gray3,
	bgColor = colors.gray6,
}) => {
	return (
		<View style={[commonStyles.tag, { backgroundColor: bgColor }]}>
			<Text style={[commonStyles.note, { color: color }]}>{title}</Text>
		</View>
	);
};

/* DETAIL VIEWS */
/*=======================================*/

//only displays vehicle information, for quotes and appointment details
export const VehicleInfoCard = ({
	item, //vehicle data object
}) => {
	if (item) {
		return (
			<View style={[commonStyles.card, commonStyles.cardBody]}>
				<View style={[styles.col_A, styles.imgContainer]}>
					<Image style={styles.vehicleImg} source={{ uri: item.imgUrl }} />
				</View>
				<View style={styles.col_B}>
					<Text style={commonStyles.h3}>
						{item.make} {item.model}
					</Text>
					<Text style={commonStyles.body}>{item.year}</Text>
					<Text style={[commonStyles.cap2, { marginTop: 12 }]}>
						VIN {item.vin}
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={[commonStyles.card, commonStyles.cardBody]}>
			<Text style={[commonStyles.body, { color: colors.gray4 }]}>
				No Vehicle
			</Text>
		</View>
	);
};

export const MechanicInfoCard = ({
	item = sampleAppointment.mechanic, //vehicle data object
}) => {
	if (item) {
		return (
			<View style={commonStyles.card}>
				<Text style={[commonStyles.h3, { marginBottom: 12 }]}>
					{item.firstName} {item.lastName}
				</Text>
				<View style={styles.row}>
					<Icon name={"phone"} size={18} color={colors.primaryDark} />
					<Text style={[commonStyles.body, { marginLeft: 8 }]}>
						{item.phone}
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={[commonStyles.card, commonStyles.cardBody]}>
			<Text style={[commonStyles.body, { color: colors.gray4 }]}>
				Mechanic not assigned
			</Text>
		</View>
	);
};

export const ServiceInfoCard = ({
	item = sampleAppointment.quote.services,
	handleTotalPrice,
}) => {
	const renderItem = ({ item }) => {
		return (
			<View style={styles.entry}>
				<Text style={commonStyles.body}>{item.type}</Text>
				<Text style={commonStyles.body}>{item.price}</Text>
			</View>
		);
	};

	const [fees, setFees] = useState({
		tax: null,
		fee: null,
	});

	console.log("fees: ", fees);

	const get_cost = (services) => {
		const tax_rate = 0.06,
			labor_rate = 95;
		let total = 0;
		item.forEach((obj) => {
			total += obj.price;
		});
		let tax = total * 0.06;
		if (!fees.tax) setFees((prevState) => ({ ...prevState, tax: tax }));
		let fee = 2.5;
		if (!fees.fee) setFees((prevState) => ({ ...prevState, fee: fee }));
		return total + tax + fee;
	};

	useEffect(() => {
		if (handleTotalPrice && item) {
			handleTotalPrice(get_cost());
		}
	});

	if (item) {
		return (
			<View style={commonStyles.card}>
				<View style={styles.entry}>
					<Text style={commonStyles.body}>Tax</Text>
					<Text style={commonStyles.body}>{fees.tax}</Text>
				</View>
				<View style={styles.entry}>
					<Text style={commonStyles.body}>Fees</Text>
					<Text style={commonStyles.body}>{fees.fee}</Text>
				</View>
				<FlatList
					data={item}
					renderItem={renderItem}
					keyExtractor={(item) => (item ? item.id.toString() : "")}
				/>
				<View style={styles.totalEntry}>
					<Text style={commonStyles.body}>Total Price </Text>
					<Text style={commonStyles.h3}> {get_cost()}</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={commonStyles.card}>
			<Text>No services selected</Text>
		</View>
	);
};

/* LIST VIEWS */
/*=======================================*/

// VEHICLE, card displayed in vehicle list
export const VehicleCard = ({
	navigation,
	route,
	item = sampleAppointment.quote.vehicle, //vehicle data object
}) => {
	return (
		<View style={[commonStyles.card, commonStyles.shadowDefault]}>
			<View style={[commonStyles.cardHeader, styles.spaceBetween]}>
				<Text style={commonStyles.h3}>
					{item.make} {item.model}
				</Text>
				<BtnSmall
					title={"Get A Quote"}
					onPress={() =>
						navigation.navigate("QuoteVehicle", {
							...route.params,
							selectedVehicle: item.id,
						})
					}
				/>
			</View>

			<View style={commonStyles.cardBody}>
				<View style={[styles.col_A, styles.imgContainer]}>
					<Image style={styles.vehicleImg} source={{ uri: item.imgUrl }} />
				</View>
				<View style={styles.col_B}>
					<Text style={commonStyles.body}>{item.year}</Text>
					<Text style={[commonStyles.cap2, { marginTop: 12 }]}>
						VIN {item.vin}
					</Text>
				</View>
			</View>
		</View>
	);
};

// QUOTE, cards displayed in quote list
export const QuoteCard = ({
	navigation,
	route,
	item = sampleAppointment.quote,
}) => {
	const { createdAt, costEstimate, services, vehicle } = item;
	let serviceStr = get_service_string(services);

	return (
		<TouchableOpacity
			style={[commonStyles.card, commonStyles.shadowDefault]}
			onPress={(e) =>
				navigation.navigate("QuoteDetail", {
					...route,
					quote: item,
				})
			}
		>
			<View style={[commonStyles.cardHeader, styles.spaceBetween]}>
				<View style={styles.row}>
					<Icon name="money" size={24} color={colors.primaryDark} />
					<Text style={commonStyles.h3}>{item.costEstimate}</Text>
				</View>
				<BtnSmall
					title={"schedule"}
					onPress={() =>
						navigation.navigate("Schedule", {
							...route,
							quote: item,
						})
					}
				/>
			</View>

			<View style={commonStyles.cardBody}>
				<View style={styles.col_A}>
					<Image style={styles.vehicleImg} source={{ uri: vehicle.imgUrl }} />
				</View>
				<View style={styles.col_B}>
					<Text style={[commonStyles.body, commonStyles.m_b_s]}>
						{vehicle.make} {vehicle.model}
					</Text>
					<Text style={commonStyles.note}>
						Service({services.length}): {serviceStr}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

// APPOINTMENT, cards displayed in appointment list
export const TaskCard = ({ navigation, item = sampleAppointment, route }) => {
	const tagStyle = taskStatus[item.status] || {
		color: colors.secondaryDark,
		bgColor: colors.secondaryLight,
	};
	const { services, vehicle } = item.quote;

	let serviceStr = get_service_string(services);
	let mechanicStr = "unassigned";
	if (item.mechanic) {
		mechanicStr = item.mechanic.firstName + " " + item.mechanic.lastName;
	}

	return (
		<TouchableOpacity
			style={[commonStyles.card, commonStyles.shadowDefault]}
			onPress={(e) =>
				navigation.navigate("TaskDetailPresent", {
					...route,
					appointmentID: item.id,
				})
			}
		>
			<View style={commonStyles.cardHeader}>
				<Tag
					title={item.status}
					color={tagStyle.color}
					bgColor={tagStyle.bgColor}
				/>
				<Text
					style={[
						commonStyles.h3,
						item.status == "completed" ? { color: colors.gray3 } : "",
					]}
				>
					{item.scheduleDate}
				</Text>
			</View>

			<View style={commonStyles.cardBody}>
				<View style={styles.col_A}>
					<Image style={styles.vehicleImg} source={{ uri: vehicle.imgUrl }} />
				</View>
				<View style={styles.col_B}>
					<Text style={[commonStyles.body, commonStyles.m_b_s]}>
						{vehicle.make} {vehicle.model}
					</Text>
					<Text style={commonStyles.note}>
						Service({services.length}): {serviceStr}
					</Text>
					<Text style={commonStyles.note}>Mechanic: {mechanicStr}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const get_service_string = (services) => {
	let result = "";
	let maxLength = 50;

	for (let i = 0; i < Math.min(services.length, 3); i++) {
		result += services[i].type + ", ";
	}

	result = result.slice(0, -2);

	if (result.length >= maxLength) {
		result = result.slice(0, maxLength - 3);
		result += "...";
	}

	return result;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	row: {
		flexDirection: "row",
	},
	col2: {
		//half of the row
		flex: 0.5,
		paddingHorizontal: 4,
	},
	col_A: {
		flex: 0.4,
		paddingRight: 24,
	},
	col_B: {
		flex: 0.6,
	},
	spaceBetween: {
		justifyContent: "space-between",
	},
	vehicleImg: {
		width: "100%",
		height: imageHeight,
	},
	entry: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	totalEntry: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: colors.gray5,
		paddingTop: 12,
	},
});
