import { View } from "react-native";

import { HStack } from "@/components/ui/hstack";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";


export default function Footer() {
  const router = useRouter();

  return (

    <HStack className="p-3" space="md" reversed={false}>

      <View className="mr-auto pl-12">
        <MaterialIcons onPress={() => router.replace("/profile")}  name="person" size={33} color="black" />
      </View>
      <View className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-[#FECC32] rounded-full w-14 h-14 flex items-center justify-center">
        <Pressable onPress={() => router.push("/StoryGenerator")}>
          <MaterialIcons name="lightbulb" size={30} color="white" />
        </Pressable>
      </View>
      <View className="ml-auto pr-14">
        <FontAwesome onPress={() => router.replace("/Library")} name="book" size={30} color="black" />
      </View>

    </HStack>

  );
}
