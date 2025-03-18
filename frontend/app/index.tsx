import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import CustomSelect from "@/components/custom/CustomSelect";
import { styles } from "@/styles";
import { useState } from "react";
import { Alert } from "react-native";

export default function StoryGenerator() {


    //verify that everything work.
    const [storyPreferences, setStoryPreferences] = useState({
        mainIdea: "",
        theme: "",
        style: "",
        atmospher: "",
        details: "",
        charactersNumber: "",
        length: "",
        lesson: "",
        narratorSex: "",
    });

    const updateStoryPreferences = (key: any, value: any) => {
        setStoryPreferences(prev => ({ ...prev, [key]: value }));
    };

    const handleGenerateStory = () => {
        //if the input or select are empty: alertModal = true,
        //else: confitmModal, call API.
        if (!storyPreferences.mainIdea.trim() || !storyPreferences.theme || !storyPreferences.style || !storyPreferences.atmospher) {
            Alert.alert("خطأ", "يرجى ملء جميع الحقول الإجباريّة قبل المتابعة.");
            return;
        }
        console.log("hero: ", storyPreferences);

    }
    return (
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
                        placeholder="االأجواء"
                        options={[
                            { label: "الثيمة 1", value: "الثيمة 1" },
                            { label: "الثيمة 2", value: "الثيمة 2" },
                            { label: "الثيمة 3", value: "الثيمة 3" },
                        ]}
                        value={storyPreferences.atmospher}
                        onSelect={(value: any) => updateStoryPreferences("atmospher", value)}
                    />
                    <CustomSelect
                        placeholder="الأسلوب"
                        options={[
                            { label: "الثيمة 1", value: "الثيمة 1" },
                            { label: "الثيمة 2", value: "الثيمة 2" },
                            { label: "الثيمة 3", value: "الثيمة 3" },
                        ]}
                        value={storyPreferences.style}
                        onSelect={(value: any) => updateStoryPreferences("style", value)} />
                    <CustomSelect
                        placeholder="اختر الثيمة"
                        options={[
                            { label: "hello", value: "الثيمة 1" },
                            { label: "الثيمة 2", value: "الثيمة 2" },
                            { label: "الثيمة 3", value: "الثيمة 3" },
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
                            { label: "الثيمة 1", value: "الثيمة 1" },
                            { label: "الثيمة 2", value: "الثيمة 2" },
                            { label: "الثيمة 3", value: "الثيمة 3" },

                        ]}
                        value={storyPreferences.length}
                        onSelect={(value: any) => updateStoryPreferences("length", value)} />
                    <CustomSelect
                        placeholder="عدد الشخصيّات"
                        options={[
                            { label: "الثيمة 1", value: "الثيمة 1" },
                            { label: "الثيمة 2", value: "الثيمة 2" },
                            { label: "الثيمة 3", value: "الثيمة 3" },
                        ]}
                        value={storyPreferences.charactersNumber}
                        onSelect={(value: any) => updateStoryPreferences("charactersNumber", value)} />
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

                <Button className={`${styles.yellow_button} mt-9`} onPress={handleGenerateStory}><ButtonText className={`${styles.par2} ${styles.gray1}`}>توليد</ButtonText></Button>
            </VStack>
        </VStack>
    );
}