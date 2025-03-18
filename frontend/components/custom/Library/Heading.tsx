import { styles } from "@/styles";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function Heading(){
    return (
        <View className="flex-row-reverse my-2">
      <Text className={`${styles.header1} `}>مرحبًا بك في </Text>
      <Text className={`${styles.header1} ${styles.yellow} `}>! المكتبة </Text>
      </View>
    )
}