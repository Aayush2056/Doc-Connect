import { healthConsultation } from "../services/aiService.js";

export const chatWithAI = async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }


    const result = await healthConsultation(message);


    res.status(200).json({
      success: true,
      response: result.response,
      doctors: result.doctors,
    });

  } catch (error) {

    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};