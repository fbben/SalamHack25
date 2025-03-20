import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { styles } from "@/styles";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Button, ButtonText } from "@/components/ui/button";
import { CloseIcon, Icon } from "@/components/ui/icon";
import React from "react";
import { Pressable } from "@/components/ui/pressable";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import FilterCheckBox from "./filterCheckBox";
import writingStyles from "@/assets/writingStyles";
import arabicStoryThemes from "@/assets/themes";
export default function FilterPage({
  applyFilter,
  DiscardFilter,
  setFilterWritingStyle,
  setFilterTheme,
}: {
  applyFilter: () => void;
  DiscardFilter: () => void;
  setFilterWritingStyle: (arg0: string[]) => void;
  setFilterTheme: (arg0: string[]) => void;
}) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        <View className="bg-[#FECC32] rounded-full w-10 h-10 mx-5 flex justify-center items-center">
          <FontAwesome name="filter" size={25} color="black" />
        </View>
      </Pressable>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader className="flex-row-reverse justify-between">
            <Text className={`${styles.header2} text-black`}>فلترة القصص</Text>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text className={`${styles.par2} mb-3`}>اختر ثيمة القصّة</Text>
            <FilterCheckBox
              filter={arabicStoryThemes}
              setFilter={setFilterTheme}
            />
          </ModalBody>
          <ModalFooter className="flex-row-reverse justify-end">
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false);
                DiscardFilter();
              }}
              className="bg-gray-300"
            >
              <ButtonText className={`${styles.par2} text-white`}>إلغاء</ButtonText>
            </Button>
            <Button
              className={`${styles.yellow_button}`}
              onPress={() => {
                setShowModal(false);
                applyFilter();
              }}
            >
              <ButtonText className={`${styles.par2}`}>تأكيد</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
