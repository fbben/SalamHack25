import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList, Pressable, View } from "react-native";
import { useState } from "react";
import dummy from "@/assets/halfSmartData";
import React from "react";
import StoryCover from "./StoryCover";
import { VStack } from "@/components/ui/vstack";
import FilterPage from "./filterPage";
import { styles } from "@/styles";

export default function Main() {
  const [SearchKeyWords, setSearchKeyWords] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterWritingStyle, setFilterWritingStyle] = useState<string[]>([]);
  const [filterTheme, setFilterTheme] = useState<string[]>([]);

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
            className={`${styles.par2}`}
          />
        </Input>
      </HStack>
      <VStack className="flex-row justify-evenly flex-1 flex-wrap gap-3">
        <View className="flex-1">
          <FlatList
            data={dummy}
            numColumns={2}
            contentContainerClassName="gap-3"
            columnWrapperClassName="gap-3 justify-evenly"
            renderItem={({ item }) => {
              return item.title.includes(SearchKeyWords) &&
                (!applyFilter ||
                  (filterTheme.includes(item.theme) &&
                    filterWritingStyle.includes(item.writingStyle))) ? (
                <StoryCover title={item.title} image={item.image} />
              ) : null;
            }}
            keyExtractor={(item) => item.index.toString()}
          />
        </View>
      </VStack>
    </>
  );
}
