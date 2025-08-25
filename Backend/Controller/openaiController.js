//  const axios = require("axios");
//  require("dotenv").config()

//  const getImage = async (req, res) => {
//     try {
//     //   const { title } = req.body;
      
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "mistralai/mistral-small-3.2-24b-instruct:free",
//         messages: req.body.title // frontend sends user messages
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//    return res.status(200).json({ message:"Generated",data:response});
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// module.exports = { getImage }; 



const axios = require("axios");
require("dotenv").config();

const getImage = async (req, res) => {
  try {
    const { messages } = req.body; // frontend sends messages
console.log(messages,"MMMMMM");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages, // ✅ correct structure
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`, // ✅ use correct key name
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      message: "Generated",
      data: response.data, // ✅ only send API response, not axios object
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || "Something went wrong" });
  }
};

module.exports = { getImage };

