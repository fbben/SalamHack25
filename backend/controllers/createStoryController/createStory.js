const StoryModel = require ('../../models/Story');
const ParentPromptModel = require('../../models/ParentPrompt');
const LibraryModel = require ('../../models/Library');
const ProfileModel = require ('../../models/Profile');
const UserModel = require ('../../models/user');
const generateStoryPages = require ('../createStoryController/mainGenerationController');
// main route handler
const createStory = async (req,res,next) => {
    try {
    //save the prompt in the database

    const promptparent = new ParentPromptModel(req.body);
    const savedParentPrompt = await promptparent.save();
    console.log("parentPrompt of create is : ",savedParentPrompt);

    //retreive library id by user email
    const library_id= await retreive_UserLibrary_ByEmail(req.user,res);

//=================================================
// const generatedStoryPages = await generateStory.generateStory();
 const generatedStoryPages =[
  {
    "position":"1",
    "content": "في سوق قديم مزدحم، يعثر زيد على خريطة بالية مخبأة داخل كتاب قديم.",
    "image_link": "https://example.com/image1.jpg",
  },
  {
    "position":"2",
    "content": "مستعينًا بالرموز الغامضة، ينطلق في رحلة عبر الصحراء القاحلة متحديًا حرارة الشمس وكثبان الرمال.",
    "image_link": "https://example.com/image2.jpg"
  },
  {
    "position":"3",
    "content": "عند غروب الشمس، يصل إلى واحة منسية، حيث يخبره شيخ حكيم بأسطورة الكنز المفقود.",
    "image_link": "https://example.com/image3.jpg"
  },
  {
    "position":"4",
    "content": "بحماس متجدد، يواجه زيد الألغاز القديمة والفخاخ المميتة داخل القبر المخفي.",
    "image_link": "https://example.com/image4.jpg"
  },
  {
    "position":"5",
    "content": "وأخيرًا، يكتشف الكنز—لوحًا ذهبيًا منقوشًا بحكمة تهدف إلى إرشاد الأجيال القادمة.",
    "image_link": "https://example.com/image5.jpg"
  }
]
//=================================================
// create story model
const savedStory = await creatingstoryModel(library_id,savedParentPrompt._id,generatedStoryPages);

    //success httpresponse .
        return res.status(201).json({
            success: true,
            message: "Story created successfully.",
            data : savedStory,
        });
    }catch (error)
    {
        //error httpresponse .
        return res.status(500).json({message: 'createStory method error',error : error.message });
    }
}


//======================================================================================
const creatingstoryModel = async (library_id,savedParentPrompt_id,generatedStoryPages)=>{

      // creation of the story model (test until integration)
    const newstory = new StoryModel({
        library_id,
        title: 'title of the story',
        summary: 'summary of the story',
        parent_prompt_id: savedParentPrompt_id,
        storyPages: generatedStoryPages
    });
    //save library in database
     const savedStory = await newstory.save();
     return savedStory;
} ;
//=======================================================================================

const retreive_UserProfile_ByEmail = async (inputemail,res)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputemail)) {
      return res.status(400).json({ success: false, message: "Invalid email format." }); // ⚠️ Vérifier et retourner si l'email est invalide
  }
  try{
    //retrieve user
  const user = await UserModel.findOne({ email: inputemail });

  if (!user) {
  return res.status(400).json({
  success: false,
  message: "Invalid credentials: user not found.",
  });}

// find the corresponding profile
  let profile = await ProfileModel.findOne({ user_id: user._id });

  if (!profile) {
    // Create user profile if it does not exist
    profile = new ProfileModel({ user_id: user._id });
    await profile.save();
}

return profile._id;
  }catch(error){
    next( error);
  }
}
//=======================================================================================
const retreive_UserLibrary_ByEmail = async (inputemail,res)=> {
try {
  const profileId = await retreive_UserProfile_ByEmail(inputemail,res);
  // find the correspendant Library
  let library = await LibraryModel.findOne({ profile_id: profileId });

  if (!library) {
    // Create library if it does not exist
    library = new LibraryModel({ profile_id: profileId });
    await library.save();
}

return library._id;
  }catch(error){
    next("error when retreiving Library");
  }
}
//========================================
module.exports = createStory;