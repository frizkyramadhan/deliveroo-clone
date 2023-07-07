import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {
		params: {
			id,
			imgUrl,
			title,
			rating,
			genre,
			address,
			shortDescription,
			dishes,
			long,
			lat,
		},
	} = useRoute();

	useEffect(() => {
		dispatch(
			setRestaurant({
				id,
				imgUrl,
				title,
				rating,
				genre,
				address,
				shortDescription,
				dishes,
				long,
				lat,
			})
		);
	}, [dispatch]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<>
			{/* basket icon */}
			<BasketIcon />
			<ScrollView>
				{/* custom header with image */}
				<View className="relative">
					<Image
						source={{ uri: urlFor(imgUrl).url() }}
						className="w-full h-56 bg-gray-300 p-4"
					/>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
					>
						<Feather name="arrow-left" size={20} color="#00CCBB" />
					</TouchableOpacity>
				</View>

				{/* body */}
				<View className="bg-white">
					<View className="px-4 pt-4">
						{/* title */}
						<Text className="text-3xl font-bold">{title}</Text>
						<View className="flex-row space-x-2 my-1">
							{/* rating */}
							<View className="flex-row space-x-1 items-center">
								<Entypo name="star" size={22} color="green" opacity={0.5} />
								<Text className="text-gray-500 text-xs">
									<Text className="text-green-500">{rating}</Text> . {genre}
								</Text>
							</View>
							{/* address */}
							<View className="flex-row items-center space-x-1">
								<Entypo
									name="location-pin"
									size={22}
									color="gray"
									opacity={0.4}
								/>
								<Text className="text-xs text-gray-500">
									Nearby . {address}
								</Text>
							</View>
						</View>
						{/* short description */}
						<Text className="text-gray-500 mt-2 pb-2">{shortDescription}</Text>
					</View>

					{/* allergy? */}
					<TouchableOpacity className="flex-row items-center space-x-1 p-4 border-y border-gray-300">
						<AntDesign
							name="questioncircleo"
							size={20}
							color="black"
							opacity={0.5}
						/>
						<Text className="pl-2 flex-1 text-md font-bold">
							Have a Food Allergy?
						</Text>
						<Entypo name="chevron-right" size={24} color="#00CCBB" />
					</TouchableOpacity>
				</View>

				{/* menu */}
				<View className="pb-36">
					<Text className="px-4 pt-4 mb-3 font-bold text-xl">Menu</Text>
					{/* dishes */}
					{dishes?.map((dish) => (
						<DishRow
							key={dish._id}
							id={dish._id}
							name={dish.name}
							shortDescription={dish.shortDescription}
							price={dish.price}
							image={dish.image}
						/>
					))}
				</View>
			</ScrollView>
		</>
	);
};

export default RestaurantScreen;
