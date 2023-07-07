import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
	addToBasket,
	removeFromBasket,
	selectBasketItemsWithId,
} from "../features/basketSlice";
import { createSelector } from "@reduxjs/toolkit";
import { TextInputMask } from "react-native-masked-text";

const DishRow = ({ id, name, shortDescription, price, image }) => {
	const [isPressed, setIsPressed] = useState(false);
	const items = useSelector((state) => selectBasketItemsWithId(state, id));
	const dispatch = useDispatch();

	const addItemToBasket = () => {
		dispatch(addToBasket({ id, name, shortDescription, price, image }));
	};

	const removeItemFromBasket = () => {
		if (!items.length > 0) return;
		dispatch(removeFromBasket({ id }));
	};

	return (
		<>
			<TouchableOpacity
				onPress={() => setIsPressed(!isPressed)}
				className={`bg-white p-4 border border-gray-300 ${
					isPressed && "border-b-0"
				}`}
			>
				<View className="flex-row">
					<View className="flex-1 pr-2">
						<Text className="text-lg mb-1">{name}</Text>
						<Text className="text-gray-400">{shortDescription}</Text>
						<TextInputMask
							type={"money"}
							options={{
								precision: 0,
								separator: ",",
								delimiter: ".",
								unit: "Rp. ",
								suffixUnit: "",
							}}
							value={price}
							editable={false}
							className="text-gray-500 mt-2 text-lg"
						/>
					</View>
					<View>
						<Image
							style={{
								borderWidth: 1,
								borderColor: "#F3F3F4",
							}}
							source={{ uri: urlFor(image).url() }}
							className="h-20 w-20 bg-gray-300 p-4"
						/>
					</View>
				</View>
			</TouchableOpacity>

			{isPressed && (
				<View className="bg-white px-4">
					<View className="flex-row items-center space-x-3 pb-3">
						<TouchableOpacity
							disabled={!items.length}
							onPress={removeItemFromBasket}
						>
							<Entypo
								name="circle-with-minus"
								size={40}
								color={items.length > 0 ? "#00CCBB" : "gray"}
							/>
						</TouchableOpacity>
						<Text>{items.length}</Text>
						<TouchableOpacity onPress={addItemToBasket}>
							<Entypo name="circle-with-plus" size={40} color="#00CCBB" />
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
};

export default DishRow;
