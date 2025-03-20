import { Pressable, View } from "react-native";
import { Image } from "react-native";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { styles } from "@/styles";
export default function StoryCover( {title = "عنوان القصة" , image }: { title: string, image: any } ){
    return(
        <Pressable onPress={() => console.log(`${title} Pressed`)} >
        <View className="flex-col justify-center items-center">
            <Image
            source={ require(`@/assets/StoryDummyCover.png`) }
            style={{ width: 130, height: 184,  borderRadius: 10}}
            resizeMode="contain"
            >
            </Image>
            <Text className={`${styles.par2} mt-2`}>{title}</Text>

        </View>
        </Pressable>
    )
}