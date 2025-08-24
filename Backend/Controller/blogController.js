const supabase = require("../utility/supabase");
const Blog = require("../Model/blogSchema");

const addBlog = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, description } = req.body;
    const image = req.file;

    if (!image || !title || !description) {
      return res.status(400).json({ message: "All feild are require" });
    }

    const filename = `${Date.now()}-${image.originalname}`;
    const { data, error } = await supabase.storage
      .from("Blog.ai_bucket")
      .upload(filename, image.buffer, {
        contentType: image.mimetype,
        upsert: false,
      });

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { data: publicUrlData } = supabase.storage
      .from("Blog.ai_bucket")
      .getPublicUrl(filename);
    const response = await Blog.create({
      title,
      description,
      image: publicUrlData.publicUrl,
      author: id,
    });
    return res.status(200).json({ message: "Add Sucessfully", data: response });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getBlog = async (req, res) => {
  try {
    const response = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(400).json({ message: "Server Error" });
  }
};

const userProfil = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await Blog.find({ author: id }).sort({createdAt:-1})
    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(400).json({ message: "Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting blog", error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.file;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

const blog = await Blog.findById(id)    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Extract filename from image URL (assuming publicUrl is stored)
    const imageURL = blog.image;
    const filename = imageURL.split("/").pop(); // adjust if using folders

    // Delete file from Supabase
    await supabase.storage
      .from("Blog.ai_bucket")
      .remove([filename]);


    let imageUrl;
    // If a new image is uploaded → store in Supabase
    if (image) {
      const filename = `${Date.now()}-${image.originalname}`;
      const { data, error } = await supabase.storage
        .from("Blog.ai_bucket")
        .upload(filename, image.buffer, {
          contentType: image.mimetype,
          upsert: false,
        });

      if (error) {
        return res.status(500).json({ message: "Image upload failed", error });
      }

      const { data: publicUrlData } = supabase.storage
        .from("Blog.ai_bucket")
        .getPublicUrl(filename);

      imageUrl = publicUrlData.publicUrl;
    }

    // Build update object dynamically
    const updateFields = { title, description };
    if (imageUrl) updateFields.image = imageUrl;

    const response = await Blog.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!response) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: response,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { addBlog, getBlog, userProfil, deleteBlog, updateBlog };
