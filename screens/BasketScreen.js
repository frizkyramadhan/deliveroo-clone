import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
	removeFromBasket,
	selectBasketItems,
	selectBasketTotal,
} from "../features/basketSlice";
import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { urlFor } from "../sanity";
import { TextInputMask } from "react-native-masked-text";

const BasketScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectRestaurant);
	const items = useSelector(selectBasketItems);
	const basketTotal = useSelector(selectBasketTotal);
	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

	const dispatch = useDispatch();

	useMemo(() => {
		const groupedItems = items.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {});

		setGroupedItemsInBasket(groupedItems);
	}, [items]);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 bg-gray-100">
				<View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
					<View>
						<Text className="text-lg font-bold text-center">Basket</Text>
						<Text className="text-center text-gray-400">
							{restaurant.title}
						</Text>
					</View>

					<TouchableOpacity
						onPress={navigation.goBack}
						className="rounded-full bg-gray-100 absolute top-6 right-5"
					>
						<AntDesign name="closecircle" size={40} color="#00CCBB" />
					</TouchableOpacity>
				</View>

				<View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
					<Image
						source={{ uri: "https://links.papareact.com/wru" }}
						className="h-7 w-7 bg-gray-300 p-4 rounded-full"
					/>
					<Text className="flex-1">Deliver in 50-75 min</Text>
					<TouchableOpacity>
						<Text className="text-[#00CCBB]">Change</Text>
					</TouchableOpacity>
				</View>

				{/* order row */}
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					className="divide-y divide-gray-200"
				>
					{Object.entries(groupedItemsInBasket).map(([key, items]) => (
						<View
							key={key}
							className="flex-row items-center space-x-3 py-2 px-5 bg-white"
						>
							<Text className="text-[#00CCBB]">{items.length}x</Text>
							<Image
								source={{ uri: urlFor(items[0]?.image).url() }}
								className="h-12 w-12 rounded-full"
							/>
							<Text className="flex-1">{items[0]?.name}</Text>
							<TextInputMask
								type={"money"}
								value={items[0]?.price}
								options={{
									precision: 0,
									separator: ",",
									delimiter: ".",
									unit: "Rp",
									suffixUnit: "",
								}}
								className="text-gray-600"
							/>

							<TouchableOpacity>
								<Text
									className="text-[#00CCBB] text-xs"
									onPress={() => dispatch(removeFromBasket({ id: key }))}
								>
									Remove
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>

				{/* total */}
				<View className="p-5 bg-white mt-5 space-y-4">
					{/* subtotal */}
					<View className="flex-row justify-between">
						<Text className="text-gray-400">Subtotal</Text>
						<TextInputMask
							type={"money"}
							value={basketTotal}
							options={{
								precision: 0,
								separator: ",",
								delimiter: ".",
								unit: "Rp",
								suffixUnit: "",
							}}
							className="text-gray-400"
						/>
					</View>
					{/* delivery fee */}
					<View className="flex-row justify-between">
						<Text className="text-gray-400">Delivery Fee</Text>
						<TextInputMask
							type={"money"}
							value={12000}
							options={{
								precision: 0,
								separator: ",",
								delimiter: ".",
								unit: "Rp",
								suffixUnit: "",
							}}
							className="text-gray-400"
						/>
					</View>
					{/* total order */}
					<View className="flex-row justify-between">
						<Text>Order Total</Text>
						<TextInputMask
							type={"money"}
							value={basketTotal + 12000}
							options={{
								precision: 0,
								separator: ",",
								delimiter: ".",
								unit: "Rp",
								suffixUnit: "",
							}}
							className="font-extrabold"
						/>
					</View>
					{/* order button */}
					<TouchableOpacity
						className="rounded-lg bg-[#00CCBB] p-4"
						onPress={() => navigation.navigate("PreparingOrder")}
					>
						<Text className="text-center text-white text-lg font-bold">
							Place Order
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default BasketScreen;
