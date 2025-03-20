import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import CustomSelect from "@/components/custom/CustomSelect";
import { styles } from "@/styles";
import { useState } from "react";
import { Alert } from "react-native";
import { Modal, ModalBackdrop, ModalContent, ModalBody, ModalFooter } from '@/components/ui/modal';
import { generateStory } from "@/api/StoryGenerator";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

export default function StoryGenerator() {

    const [storyPreferences, setStoryPreferences] = useState({
        mainIdea: "",
        theme: "",
        style: "",
        details: "",
        atmospher: "",
        charactersNumber: "",
        length: "",
        lesson: "",
        narratorSex: "",
    });
    const [isConfirmPopupVisible, setConfirmPopupVisible] = useState(false);

    const router = useRouter();

    const updateStoryPreferences = (key: any, value: any) => {
        setStoryPreferences(prev => ({ ...prev, [key]: value }));
    };

    const handleConfirmGeneration = () => {
        if (!storyPreferences.mainIdea.trim() || !storyPreferences.theme || !storyPreferences.style) {
            Alert.alert("خطأ", "يرجى ملء جميع الحقول الإجباريّة قبل المتابعة.");
            return;
        }
        setConfirmPopupVisible(true);
    }

    const story = {
        "Segments": [
            { text: "في قرية صغيرة بالقرب من القدس، عاشت فتاة صغيرة اسمها لمى. كانت تحب الزهور كثيرًا، وتهتم بحديقة بيتها الصغير. كانت جدتها دائمًا تخبرها قصصًا عن فلسطين، عن شوارع القدس العتيقة، وعن المسجد الأقصى، وعن الزيتون الذي يملأ الأرض بطيبته.", image: "./assets/images/rose.png" },
            { text: "ذات يوم، قررت لمى أن تزرع زهرة جميلة أمام باب بيتها، وقالت: سأسميها زهرة فلسطين، وسأعتني بها كما تعتني فلسطين بنا!", image: "./assets/images/rose.png" },
            { text: "في قرية صغيرة بالقرب من القدس، عاشت فتاة صغيرة اسمها لمى. كانت تحب الزهور كثيرًا، وتهتم بحديقة بيتها الصغير. كانت جدتها دائمًا تخبرها قصصًا عن فلسطين، عن شوارع القدس العتيقة، وعن المسجد الأقصى، وعن الزيتون الذي يملأ الأرض بطيبته.", image: "./assets/images/rose.png" },
        ],
        "audio": "hello"
    };

    const handleStoryGeneration = async () => {

        setConfirmPopupVisible(false);
        router.push({ pathname: "/StoryResult", params: { storyData: JSON.stringify(story) } });

        // //call API.
        // try {
        //     const story = await generateStory(storyPreferences);
        //     console.log("Generated Story:", story);
        //     //route to StoryGeneration screen with the storyData prompt
        // setConfirmPopupVisible(false);
        // router.push({ pathname: "/StoryResult", params: { storyData: JSON.stringify(story) } });
        // catch (error) {
        //     Alert.alert("خطأ", "حدث خطأ أثناء توليد القصة. يرجى المحاولة لاحقًا.");
        // };
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack className="p-5 gap-8">
            <VStack>
                <Text className={`${styles.header1} ${styles.yellow}`}>ولِّد قصّة مُبهرة لطفلك!</Text>
                <Text className={`${styles.header2} ${styles.gray1}`}>بالصورة والصوت</Text>
            </VStack>
            <VStack className="gap-3">
                <Text className={`${styles.header2}`}>تفاصيل القصّة:</Text>
                <Text className={`${styles.par1} ${styles.gray1}`} >فكرة القصّة الأساسيّة:</Text>
                <Input>
                    <InputField
                        className={`${styles.par2}`}
                        placeholder="اكتب الفكرة الأساسيّة"
                        value={storyPreferences.mainIdea}
                        onChangeText={(text) => updateStoryPreferences("mainIdea", text)} />
                </Input>
                <HStack className=" flex-1 flex-row gap-2 mb-10">
                    <CustomSelect
                        placeholder="الأسلوب"
                        options={[
                            { label: "درامي ومُلهم", value: "درامي ومُلهم" },
                            { label: "مشوّق ومغامر", value: "مشوّق ومغامر" },
                            { label: "كوميدي ومرح", value: "كوميدي ومرح" },
                        ]}
                        value={storyPreferences.style}
                        onSelect={(value: any) => updateStoryPreferences("style", value)} />
                    <CustomSelect
                        placeholder="اختر الثيمة"
                        options={[
                            { label: "قصص من التراث العربيّ الإسلاميّ", value: "قصص من التراث العربيّ الإسلاميّ" },
                            { label: "حكايات الأبطال", value: "حكايات الأبطال" },
                            { label: "رحلات في الزمن", value: "رحلات في الزمن" },
                        ]}
                        value={storyPreferences.theme}
                        onSelect={(value: any) => updateStoryPreferences("theme", value)}
                    />

                </HStack>
                <Text className={`${styles.par1} ${styles.gray1} mt-6`}>خصائص متقدّمة (غير إجباريّة):</Text>
                <Input>
                    <InputField
                        className={`${styles.par2} ${styles.gray2}`}
                        placeholder="حدّد اسم البطل أو تفاصيل أخرى"
                        value={storyPreferences.details}
                        onChangeText={(text) => updateStoryPreferences("details", text)}
                    />
                </Input>

                <HStack className=" flex-1 flex-row gap-2 mb-10">
                    <CustomSelect
                        placeholder="طول القصّة"
                        options={[
                            { label: "قصيرة", value: "قصيرة" },
                            { label: "متوسطة", value: "متوسطة" },
                            { label: "طويلة", value: "طويلة" },

                        ]}
                        value={storyPreferences.length}
                        onSelect={(value: any) => updateStoryPreferences("length", value)} />
                    <CustomSelect
                        placeholder="عدد الشخصيّات"
                        options={[
                            { label: "1", value: "1" },
                            { label: "2", value: "2" },
                            { label: "3 أو أكثر", value: "3 أو أكثر" },
                        ]}
                        value={storyPreferences.charactersNumber}
                        onSelect={(value: any) => updateStoryPreferences("charactersNumber", value)} />
                    <CustomSelect
                        placeholder="االأجواء"
                        options={[
                            { label: "سوق تقليدي (مرحة)", value: "سوق تقليدي (مرحة)" },
                            { label: "الواحة (متفائلة)", value: "الواحة (متفائلة)" },
                            { label: "مدينة قديمة (درامية)", value: "مدينة قديمة (درامية)" },
                            { label: "مدينة قديمة (غامضة)", value: "مدينة قديمة (غامضة)" },
                            { label: "الصحراء (غامضة)", value: "الصحراء (غامضة)" },
                        ]}
                        value={storyPreferences.atmospher}
                        onSelect={(value: any) => updateStoryPreferences("atmospher", value)}
                    />
                </HStack>
                <Input>
                    <InputField
                        className={`${styles.par2} ${styles.gray2}`}
                        placeholder="المغزى أو العبرة من القصّة"
                        value={storyPreferences.lesson}
                        onChangeText={(text) => updateStoryPreferences("lesson", text)} />
                </Input>
                <CustomSelect
                    placeholder="حدّد صوت القاصّ"
                    options={[
                        { label: "ذكر", value: "ذكر" },
                        { label: "أنثى", value: "أنثى" },
                    ]}
                    value={storyPreferences.narratorSex}
                    onSelect={(value: any) => updateStoryPreferences("cnarratorSex", value)} />

                <Button className={`${styles.yellow_button} mt-9`} onPress={handleConfirmGeneration}><ButtonText className={`${styles.par2} ${styles.gray1}`}>توليد</ButtonText></Button>
            </VStack>

            {/* confirm modal */}
            <Modal isOpen={isConfirmPopupVisible} onClose={() => setConfirmPopupVisible(false)}>
                <ModalBackdrop />
                <ModalContent>
                    <Text className={`${styles.header2} text-black`}>تأكيد التوليد</Text>
                    <ModalBody>
                        <Text className={`${styles.par1} ${styles.gray1}`}>هل حقًّا تُريد توليد القصّة؟</Text>
                    </ModalBody>
                    <ModalFooter className="flex-row gap-4">
                        <Button className="bg-gray-300 flex-1" onPress={() => setConfirmPopupVisible(false)}>
                            <ButtonText className={`${styles.par1}`}>إلغاء</ButtonText>
                        </Button>
                        <Button className={` ${styles.yellow_button} flex-1`} onPress={handleStoryGeneration}>
                            <ButtonText className={`${styles.par1} tetx-white`}>تأكيد</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
        </ScrollView>
    );
}