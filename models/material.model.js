import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: true,
    },
    technology: {
      type: String, 
      required: true,
    },
    colors:{
      type:[String],
    }, 
    applicationTypes:{
      type:[String],
    }, 
    pricePerGram: { 
      type: String,
      required: true,
    },
    imageUrl: { 
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Material", MaterialSchema);