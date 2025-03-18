import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { styles } from "@/styles";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { ScrollView, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { useState } from "react";


//
//this is an example of the backend response,
//the images should be urls.

//IMPORTANT!
//the story should not have "" marks, or any
//specifc characters that can break the json.

const GeneraterStory = {
    "Segments": [
        { text: "في قرية صغيرة بالقرب من القدس، عاشت فتاة صغيرة اسمها لمى. كانت تحب الزهور كثيرًا، وتهتم بحديقة بيتها الصغير. كانت جدتها دائمًا تخبرها قصصًا عن فلسطين، عن شوارع القدس العتيقة، وعن المسجد الأقصى، وعن الزيتون الذي يملأ الأرض بطيبته.", image: "./assets/images/rose.png" },
        { text: "ذات يوم، قررت لمى أن تزرع زهرة جميلة أمام باب بيتها، وقالت: سأسميها زهرة فلسطين، وسأعتني بها كما تعتني فلسطين بنا!", image: "./assets/images/rose.png" },
        { text: "في قرية صغيرة بالقرب من القدس، عاشت فتاة صغيرة اسمها لمى. كانت تحب الزهور كثيرًا، وتهتم بحديقة بيتها الصغير. كانت جدتها دائمًا تخبرها قصصًا عن فلسطين، عن شوارع القدس العتيقة، وعن المسجد الأقصى، وعن الزيتون الذي يملأ الأرض بطيبته.", image: "./assets/images/rose.png" },
    ],
    "audio": "hello"
};

export default function StoryResult() {
    const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
    const handleDelete = () => {
        setDeletePopupVisible(false);
        console.log("Story deleted!");
        // call API to delete story.
        // route to library page.
    };

    return (
        <VStack className="flex-1 p-5 gap-4">
            <Text className={`${styles.header1} text-black`}>زهرة في القدس</Text>

            <ScrollView className="flex-1 mt-4 mb-4">
                <VStack className="gap-6">
                    {GeneraterStory.Segments.map((segment, index) => (
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
            <Modal isOpen={isDeletePopupVisible} onClose={() => setDeletePopupVisible(false)}>
                <ModalBackdrop />
                <ModalContent>
                    <Text className={`${styles.header2} text-black`}>تأكيد الحذف:</Text>
                    <ModalBody>
                        <Text className={`${styles.par1} ${styles.gray1}`}>هل حقًّا تُريد حذف القصّة؟</Text>
                    </ModalBody>
                    <ModalFooter className="flex-row gap-4">
                        <Button className="bg-gray-300 flex-1" onPress={() => setDeletePopupVisible(false)}>
                            <ButtonText>إلغاء</ButtonText>
                        </Button>
                        <Button className="bg-red-500 flex-1" onPress={handleDelete}>
                            <ButtonText className="text-white">حذف</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
}