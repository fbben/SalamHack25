import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList, Pressable, View } from "react-native";
import { useState } from "react";
import Ldummy from "@/assets/halfSmartData";
import StoryCover from "./StoryCover";
import { VStack } from "@/components/ui/vstack";
import FilterPage from "./filterPage";
import { useEffect } from "react";

import { useQuery } from '@tanstack/react-query';
import Toast from "react-native-toast-message";
import { retrieveStories } from '@/api/library';

export default function Main() {
  const [SearchKeyWords, setSearchKeyWords] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterWritingStyle, setFilterWritingStyle] = useState<string[]>([]);
  const [filterTheme, setFilterTheme] = useState<string[]>([]);

  const [stories, setStories  ]=useState([])
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchStoryReadingData'],
    queryFn: retrieveStories,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Data Loaded",
        text2: "Library Stories fetched successfully!",
      });
      setStories(data)
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Fetch Error",
        text2: error?.message || "An error occurred while fetching the library stories.",
      });
    },
  });

  if (isLoading) return <VStack>Loading...</VStack>;
  if (error) return <VStack>Error: {error.message}</VStack>;

  return (




    <>
      <HStack className="items-center flex justify-around">
        <FilterPage
          applyFilter={function (): void {
            setApplyFilter(true);
          }}
          DiscardFilter={function (): void {
            setApplyFilter(false);
          }}
          setFilterWritingStyle={(arg0: string[]) => {
            setFilterWritingStyle(arg0);
          }}
          setFilterTheme={(arg0: string[]) => {
            setFilterTheme(arg0);
          }}
        />
        <Input className=" flex-1 mx-1  " variant="rounded" size="sm">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            onChangeText={setSearchKeyWords}
            value={SearchKeyWords}
            placeholder="ابحث عن قصتك"
            className="text-right dir-rtl"
          />
        </Input>
      </HStack>
      <VStack className="flex-row justify-evenly flex-1 flex-wrap gap-3">
        <View className="flex-1">
          <FlatList
            data={stories}
            numColumns={2}
            contentContainerClassName="gap-3"
            columnWrapperClassName="gap-3 justify-evenly"
            renderItem={({ item }) => {


            
             
             
              return item.title.includes(SearchKeyWords) /*&&
                (!applyFilter ||
                  (filterTheme.includes(item.theme) &&
                    filterWritingStyle.includes(item.writingStyle)))*/ ? (
                <StoryCover title={item.title} image={item.storyPages[0].image_link} />
              ) : null;
            }}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      </VStack>
    </>
  );
}
