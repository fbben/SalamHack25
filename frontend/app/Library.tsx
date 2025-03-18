
import { VStack } from "@/components/ui/vstack";
import { FlatList } from "react-native";
import { Text } from "react-native";
import Heading from "@/components/custom/Library/Heading";
import StoryCover from "@/components/custom/Library/StoryCover";
import SearchNfilter from "@/components/custom/Library/SearchNfilter";
import dummy from "@/assets/dummy";

export default function Library(){

    return (
      <VStack className="gap-8">
      <Heading />
     <SearchNfilter />
<VStack className="flex-row justify-evenly flex-wrap gap-3">
  <StoryCover />
  <StoryCover />
  <StoryCover />

</VStack>

      </VStack>
     );
}