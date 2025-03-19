const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
  profile_picture: { type: String , required: false ,default: ""},
  access_key_to_ai: { type: String , required : false,default: ""}
});
profileSchema.pre("remove",async function (next){
  try {
    await mongoose.model("Library").deleteOne({profile_id : this._id});
   next();
  }catch(error){
    next(error);
  }

});

module.exports = mongoose.model("Profile", profileSchema);
