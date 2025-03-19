import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { styles } from "@/styles";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { ScrollView, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal, ModalBackdrop, ModalContent, ModalBody, ModalFooter } from '@/components/ui/modal';
import { useState } from "react";
import { Alert } from "react-native";
import { deleteStory } from "@/api/StoryResult";
import { useLocalSearchParams } from "expo-router";


//
//this is an example of the backend response,
//the images should be urls.
//the audio shoul be handeled in the fornt?
//it will not be generated, neither saved in the BD,
//so why send a big json requests?

//IMPORTANT!
//the story should not have "" marks, or any
//specifc characters that can break the json.


export default function StoryResult() {

    const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);

    const { storyData } = useLocalSearchParams();
    const GeneratedStory = storyData ? JSON.parse(storyData as string) : null;

    const handleDelete = async () => {
        setDeletePopupVisible(false);
        //call API:
        //NB: call the delete function with id.
        const result = await deleteStory();
        if (result.success) {
            Alert.alert("تم الحذف", "تم حذف القصة بنجاح!");
            // route to Library screen.
        } else {
            Alert.alert("خطأ", "حدث خطأ أثناء الحذف، يرجى المحاولة لاحقًا.");
        }
    };

    return (
        <VStack className="flex-1 p-5 gap-4">
            <Text className={`${styles.header1} text-black`}>زهرة في القدس</Text>

            <ScrollView className="flex-1 mt-4 mb-4">
                <VStack className="gap-6">
                    {GeneratedStory.Segments.map((segment: any, index: any) => (
                        <VStack key={index} className="gap-3">
                            <Text className={`${styles.par1}`}>{segment.text}</Text>
                            <Image source={require('/assets/rose.png')} className="w-full h-48 rounded-lg" />
                        </VStack>
                    ))}
                </VStack>
            </ScrollView>

            <VStack className="gap-3">
                <HStack className="flex">
                    <Box className="flex-1 h-[2px] bg-[#FECC32] self-center"></Box>
                    <AntDesign name="play" size={30} color="#FECC32" />
                    <Box className=" flex-1 h-[2px] bg-[#FECC32] self-center"></Box>
                </HStack>
                <Button className={`${styles.yellow_button}`}>
                    <ButtonText className={`${styles.par2} ${styles.gray1}`}>إضافة القصّة إلى المكتبة</ButtonText>
                </Button>
                <Button className={`${styles.yellow_button}`} onPress={() => setDeletePopupVisible(true)}>
                    <ButtonText className={`${styles.par2} ${styles.gray1}`}>حذف القصّة</ButtonText>
                </Button>
            </VStack>

            {/* delete modal: */}
            <Modal isOpen={isDeletePopupVisible}>
                <ModalBackdrop />
                <ModalContent>
                    <Text className={`${styles.header2} text-black`}>تأكيد الحذف:</Text>
                    <ModalBody>
                        <Text className={`${styles.par1} ${styles.gray1}`}>هل حقًّا تُريد حذف القصّة؟</Text>
                    </ModalBody>
                    <ModalFooter className="flex-row gap-4">
                        <Button className="bg-gray-300 flex-1" onPress={() => setDeletePopupVisible(false)}>
                            <ButtonText className={`${styles.par1}`}>إلغاء</ButtonText>
                        </Button>
                        <Button className="bg-red-500 flex-1" onPress={handleDelete}>
                            <ButtonText className={`${styles.par1} tetx-white`}>حذف</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
}