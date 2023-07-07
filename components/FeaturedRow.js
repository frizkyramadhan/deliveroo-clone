import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		client
			.fetch(
				`
		*[_type == "featured" && _id == $id]{
			...,
			restaurants[]->{
				...,
				dishes[]->,
				type->{
					name
				}
			},
		}[0]
		`,
				{ id }
			)
			.then((data) => {
				setRestaurants(data?.restaurants);
			});
	}, []);

	return (
		<View>
			<View className="mt-4 px-4 flex-row items-center justify-between">
				<Text className="font-bold text-lg">{title}</Text>
				<AntDesign name="arrowright" size={24} color="#00CCBB" />
			</View>

			<Text className="text-xs text-gray-500 px-4">{description}</Text>

			<ScrollView
				horizontal
				contentContainerStyle={{
					paddingHorizontal: 15,
				}}
				showsHorizontalScrollIndicator={false}
				className="pt-4"
			>
				{/* restaurant card */}
				{restaurants?.map((restaurant) => (
					<RestaurantCard
						key={restaurant._id}
						id={restaurant._id}
						imgUrl={restaurant.image}
						title={restaurant.name}
						rating={restaurant.rating}
						genre={restaurant.type?.name}
						address={restaurant.address}
						shortDescription={restaurant.shortDescription}
						dishes={restaurant.dishes}
						long={restaurant.long}
						lat={restaurant.lat}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default FeaturedRow;
