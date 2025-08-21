 const supabase = require("../utility/supabase")
 const Blog = require("../Model/blogSchema")
 
 const addBlog = async (req,res)=>{
    try {
        const {id} = req.user
        console.log(id);
        
        const {title,description} = req.body
        const image = req.file
        
        if(!image || !title || !description){
            return res.status(400).json({message:"All feild are require"})
        }

        const filename = `${Date.now()}-${image.originalname}`
        const {data,error} = await supabase.storage
        .from("Blog.ai_bucket")
        .upload(filename,image.buffer,{
        contentType: image.mimetype, 
        upsert: false,
        })
      
        
        if(error){
            return res.status(400).json({error:error.message})
        }
          const { data: publicUrlData } = supabase.storage
      .from("Blog.ai_bucket")
      .getPublicUrl(filename);
      const response = await Blog.create({title,description,image:publicUrlData.publicUrl,author:id})
      return res.status(200).json({message:"Add Sucessfully", data:response})
    } catch (error) {
        return res.status(500).json(error)
    }
 }

 const getBlog = async(req,res)=>{
    try {
        const response = await Blog.find().sort({createdAt:-1})
        return res.status(200).json({data:response})
    } catch (error) {
        return res.status(400).json({message:"Server Error"})
    }
 }

 const userProfil = async (req,res)=>{
    try {        
        const {id} = req.user                
        const response = await Blog.find({author:id})
        return res.status(200).json({data:response})        
           
    } catch (error) {
        return res.status(400).json({message:"Server Error"})
    }  
 }  

 module.exports = {addBlog, getBlog, userProfil}