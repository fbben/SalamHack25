const mongoose = require("mongoose");

const parentPromptSchema = new mongoose.Schema({

    main_idea: { type: String, required: true }, // Core idea of the story
    theme: { type: String, required: true, enum: ['قصص من التراث العربيّ الإسلاميّ', 'حكايات الأبطال', 'رحلات في الزمن'] }, // Story theme
    style: { type: String, required: true, enum: ['درامي ومُلهم', 'مشوّق ومغامر', 'كوميدي ومرح'] }, // Storytelling tone/style
    details: { type: String }, // Additional customization (e.g., character names, specific events)

    atmospher: {
        type: String,
        enum: ['سوق تقليدي (مرحة)', 'الواحة (متفائلة)', 'مدينة قديمة (درامية)', 'مدينة قديمة (غامضة)', 'الصحراء (غامضة)']
    }, // Story setting/mood

    characters_number: { type: String, enum: ['1', '2', '3 أو أكثر'] }, // Number of main characters
    length: { type: String, enum: ['قصيرة', 'متوسطة', 'طويلة'] }, // Story length
    lesson: { type: String }, // Moral or lesson of the story
    narrator_sex: { type: String, enum: ['ذكر', 'أنثى'] }, // Preferred narrator's gender

});

module.exports = mongoose.model("ParentPrompt", parentPromptSchema);
