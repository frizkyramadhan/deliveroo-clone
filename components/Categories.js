import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard.js";
import client, { urlFor } from "../sanity.js";

const Categories = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		client.fetch(`*[_type == "category"]`).then((data) => {
			setCategories(data);
		});
	}, []);

	return (
		<ScrollView
			contentContainerStyle={{
				paddingHorizontal: 15,
				paddingTop: 10,
			}}
			horizontal
			showsHorizontalScrollIndicator={false}
		>
			{/* Category card */}
			{categories?.map((category) => (
				<CategoryCard
					key={category._id}
					imgUrl={urlFor(category.image).width(200).url()}
					title={category.name}
				/>
			))}
		</ScrollView>
	);
};

export default Categories;
