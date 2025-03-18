import { View } from "react-native";
import { Image } from "react-native";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { styles } from "@/styles";
export default function StoryCover(){


    return(
        <View className="flex-col justify-center items-center">
            <Image
            source={require("@/assets/StoryDummyCover.png")}
            style={{ width: 130, height: 184,  borderRadius: 10}}
            alt="StoryCover" //to change 
            resizeMode="cover"
            >
            </Image>
            <Text className={`${styles.par2}`}>Story Title</Text>

        </View>
    )
}