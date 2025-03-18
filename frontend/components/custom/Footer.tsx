import { View } from "react-native";

import { HStack } from "@/components/ui/hstack";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Footer() {
  return (
    <HStack className="p-3" space="md" reversed={false}>
      <Link href="/signup" className="mr-auto pl-12">
        <MaterialIcons name="person" size={33} color="black" />
      </Link>
      <View className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-[#FECC32] rounded-full w-14 h-14 flex items-center justify-center">
      <Link href="/">
        <MaterialIcons name="lightbulb" size={30} color="white" />
        </Link>
      </View>
      <Link href="Library" className="ml-auto pr-14">
        <FontAwesome name="book" size={30} color="black" />
      </Link>
    </HStack>
  );
}
