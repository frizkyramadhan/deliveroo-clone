import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
	const navigation = useNavigation();
	const [featuredCategories, setFeaturedCategories] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		client
			.fetch(
				`*[_type == "featured"]{
					...,
					restaurants[]->{
						...,
						dishes[]->,
						type->{
							name
						}
					},
				}`
			)
			.then((data) => {
				setFeaturedCategories(data);
			});
	}, []);

	return (
		<SafeAreaView className="bg-white pt-5">
			{/* header */}
			<View className="flex-row pb-3 items-center mx-4 space-x-2">
				<Image
					source={{
						uri: "https://links.papareact.com/wru",
					}}
					className="h-7 w-7 bg-gray-300 p-4 rounded-full"
				/>
				<View className="flex-1">
					<Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
					<Text className="font-bold text-xl">
						Current Location
						<Entypo name="chevron-down" size={24} color="#00CCBB" />
					</Text>
				</View>
				<AntDesign name="user" size={35} color="#00CCBB" />
			</View>

			{/* search */}
			<View className="flex-row items-center space-x-2 pb-2 mx-4">
				<View className="flex-row flex-1 items-center space-x-2 bg-gray-200 p-2">
					<AntDesign name="search1" size={20} color="#00CCBB" />
					<TextInput
						placeholder="Restaurants and Cuisines"
						keyboardType="default"
					/>
				</View>
				<Entypo name="menu" size={20} color="#00CCBB" />
			</View>

			{/* body */}
			<ScrollView
				className="bg-gray-100"
				contentContainerStyle={{
					paddingBottom: 100,
				}}
			>
				{/* Categories */}
				<Categories />

				{/* Featured Rows */}
				{featuredCategories?.map((category) => (
					<FeaturedRow
						key={category._id}
						id={category._id}
						title={category.name}
						description={category.shortDescription}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
