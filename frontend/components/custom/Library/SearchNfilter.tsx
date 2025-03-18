import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";


export default function SearchNfilter(){
    return(
        <HStack className="items-center flex justify-around">
        <View className="bg-[#FECC32] rounded-full w-10 h-10 mx-5 flex justify-center items-center"> 
          <FontAwesome name="filter" size={25} color="black" />
        </View>
          <Input className=" flex-1 mx-1  " variant="rounded" size="sm">
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="ابحث عن قصتك" className="text-right dir-rtl" />
          </Input>
        </HStack>
    )

}