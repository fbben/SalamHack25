const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  profile_id: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true,unique : true },
  date: { type: Date, default: Date.now ,immutable: true}
});

// Enforce deletion cascade when a library is deleted
//function because arrow function because of using "this"
librarySchema.pre("remove",async function(next){
  try {
    //Delete all stories associated with this libary
    await mongoose.model("Story").deleteMany({library_id:this.id});
    next();
  }catch(error){
    next(error);
  }

});

module.exports = mongoose.model("Library", librarySchema);
