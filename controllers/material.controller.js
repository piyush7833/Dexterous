import { UploadSingleImage } from '../helpers/utils.helper.js';
import Material from '../models/material.model.js';
// import { UploadSingleImage } from '../helpers/utils.helper.js';
// Create a new material
export const CreateMaterial = async (req, res) => {
  try {
    const { name, technology, colors, applicationTypes, pricePerGram } = req.body;
    if(pricePerGram && pricePerGram<0) return res.status(400).json({ message: 'Price per gram cannot be negative',data:null });
    const imageUrl = req.file ? await UploadSingleImage(req.file) : '';
    
    const newMaterial = new Material(
        {
            name,
            technology,
            colors,
            applicationTypes,
            pricePerGram,
            imageUrl,
        },
    );
    const savedMaterial = await newMaterial.save();
    res.status(201).json({
      message: 'Material created successfully',
      data:savedMaterial
    });
  } catch (error) {
    res.status(500).json({ message: error.message,data:null });
  }
};

// Update an existing material by ID
export const UpdateMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, technology, colors, applicationTypes, pricePerGram } = req.body;
    if(pricePerGram && pricePerGram<0) return res.status(400).json({ message: 'Price per gram cannot be negative',data:null });
    const imageUrl = req.file ? await UploadSingleImage(req.file) : '';
    // const imageUrl="image.jpg"
    // console.log(imageUrl,"imageurl")
    const updatedMaterial = await Material.findByIdAndUpdate(id, {
        name,
        technology,
        colors,
        applicationTypes,
        pricePerGram,
        imageUrl,
    }, { new: true });
    if (!updatedMaterial) {
      return res.status(404).json({ message: 'Material not found',data:null });
    }
    res.status(200).json({message: 'Material updated successfully',
      data:updatedMaterial});
  } catch (error) {
    res.status(500).json({ message: error.message,data:null });
  }
};

// Get a material by ID
export const GetMaterialById = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    const material = await Material.findById(id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found',data:null });
    }
    res.status(200).json({message: 'Material fetched successfully',
      data:material});
  } catch (error) {
    res.status(500).json({ message: error.message,data:null });
  }
};

// Get all materials
export const GetAllMaterial = async (req, res) => {
  try {
    const materials = await Material.find({});
    res.status(200).json({message: 'Materials fetched successfully',
      data:materials});
  } catch (error) {
    res.status(500).json({ message: error.message ,data:null});
  }
};

// Delete a material by ID
export const DeleteMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMaterial = await Material.findByIdAndDelete(id);
    if (!deletedMaterial) {
      return res.status(404).json({ message: 'Material not found',data:null });
    }
    res.status(200).json({ message: 'Material deleted successfully',data:null });
  } catch (error) {
    res.status(500).json({ message: error.message,data:null });
  }
};

