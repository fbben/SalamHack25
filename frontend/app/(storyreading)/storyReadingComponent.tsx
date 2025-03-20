import { useState } from "react";
// import { Audio } from "expo-av";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import {styles} from "@/styles";

import { useQuery } from '@tanstack/react-query';
import Toast from "react-native-toast-message";
import fetchStoryReadingData from '@/api/storyReading';

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const storyPages = [
  {
    image: "https://picsum.photos/410/300",
    text: " في قر. كانت جدتها تروي لها حكايات عن الأيام القديمة لها حكايات عن الأيام القديمة لها حكايات عن الأيام القديمة لها حكايات عن الأيام القديمة لها حكايات عن الأيام القديمة لها حكايات عن الأيام القديمة لها حكايات عن الأيام القديمة لها حكايات عن الأيام القديمة، عن الأسواق الصاخبة في القدس والأزقة الضيقة المليئة بالحياة.",
  },
  {
    image: "https://picsum.photos/410/300",
    text: "كانت جدتها تروي لها حكايات عن الأيام القديمة، عن الأسواق الصاخبة في القدس والأزقة الضيقة المليئة بالحياة.",
  },
  {
    image: "https://picsum.photos/420/300",
    text: "ذات يوم، قررت لمى أن تزرع شجرة زيتون جديدة في حديقة منزلها، رمزًا للحب والسلام والأمل في المستقبل.",
  },
  {
    image: "https://picsum.photos/430/300",
    text: "في ليلة صيفية هادئة، جلست لمى قرب النافذة تتأمل القمر وهي تستمع إلى أغاني الطيور العائدة إلى أعشاشها.",
  },
  {
    image: "https://picsum.photos/440/300",
    text: "عندما زارت لمى المدينة القديمة لأول مرة، اندهشت بجمال قبابها الذهبية وأصوات الباعة الذين ينادون على بضائعهم.",
  },
  {
    image: "https://picsum.photos/450/300",
    text: "وفي يوم ممطر، خرجت لمى لترى المطر يغسل الطرقات ويمنح الأرض حياة جديدة، فتمنت لو أن كل الأيام تحمل معها هذا النقاء.",
  },
];


  

const ControlButtons = () => (
  <HStack style={CSS_styles.controlButtons}>
    <Pressable
      onPress={() => {
        alert("sound");
      }}
    >
      <MaterialIcons name="volume-up" size={30} color="#484C52" />
    </Pressable>
    <Pressable
      onPress={() => {
        alert("home");
      }}
    >
      <MaterialIcons name="home" size={30} color="#FECC32" />
    </Pressable>
  </HStack>
);

export default function StoryReading() {

  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchStoryReadingData'],
    queryFn: fetchStoryReadingData,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Data Loaded",
        text2: "Story fetched successfully!",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Fetch Error",
        text2: error?.message || "An error occurred while fetching the story.",
      });
    },
  });

  if (isLoading) return <VStack>Loading...</VStack>;
  if (error) return <VStack>Error: {error.message}</VStack>;



  const [pageIndex, setPageIndex] = useState(0);

  const nextPage = () => {
    if (pageIndex < storyPages.length - 1) setPageIndex(pageIndex + 1);
  };

  const prevPage = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const totalPages = storyPages.length;
  return (
    <>
      {/* <StoryContent /> */}
      <HStack style={CSS_styles.StoryContentContainer}>
        <VStack style={CSS_styles.imageContainer}>
          <Image
            size="2xl"
            className="aspect-[350/208] w-full max-w-[350px]"
            source={{
              uri: storyPages[pageIndex].image,
            }}
            alt="image"
          />
        </VStack>

        <VStack style={CSS_styles.text_ControlButtons_Container}>
          <ControlButtons />
          <VStack style={CSS_styles.textContainer}>
            <Text className={`${styles.par1} ${CSS_styles.text}`}>{storyPages[pageIndex].text}</Text>
          </VStack>
        </VStack>
      </HStack>
      {/* NavigationControl /> */}
      <HStack style={CSS_styles.NavigationControlsContainer}>
        <Pressable onPress={prevPage} disabled={pageIndex === 0}>
          <AntDesign
            name="leftcircle"
            size={32}
            color={pageIndex === 0 ? "#484C52" : "#FECC32"}
          />
        </Pressable>
        <Text className={`${styles.par1} ${CSS_styles.text}`}>{`${pageIndex + 1}/${totalPages}`}</Text>
        <Pressable onPress={nextPage} disabled={pageIndex === totalPages - 1}>
          <AntDesign
            name="rightcircle"
            size={32}
            color={pageIndex === totalPages - 1 ? "#484C52" : "#FECC32"}
          />
        </Pressable>
      </HStack>
    </>
  );
}

const CSS_styles = StyleSheet.create({
  NavigationControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
    // backgroundColor: "green",
  },
  StoryContentContainer: {
    flex: 1,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  text_ControlButtons_Container: {
    flex: 1,
    height: "100%",
    // backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    height: "100%",
    // backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // resizeMode: "contain",
  },
  textContainer: {
    margin: 10,
    flex: 1,
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#737373",
    textAlign: "center",
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    // backgroundColor: "red",
    width: "100%",
    paddingRight: 15,
  },
});
