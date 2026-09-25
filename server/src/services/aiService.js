import dotenv from "dotenv"
dotenv.config()
import { GoogleGenAI, Type } from "@google/genai";
import { findDoctors } from "../controllers/userControllers.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// ===============================
// TOOL DECLARATION
// ===============================

const findDoctorsTool = {
  name: "findDoctors",

  description:
    "Find doctors from the Doc-Connect database based on medical specialization. Use this when the user needs to consult a doctor or asks which doctor they should consult.",

  parameters: {
    type: Type.OBJECT,

    properties: {
      specialization: {
        type: Type.STRING,
        description:
          "Medical specialization such as Cardiologist, Dermatologist, Neurologist, Orthopedic, General Physician, Gynecologist, etc.",
      },
    },

    required: ["specialization"],
  },
};


// ===============================
// AI CONSULTATION
// ===============================

export const healthConsultation = async (message) => {

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: message,
        },
      ],
    },
  ];


  // ===============================
  // FIRST GEMINI CALL
  // ===============================

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",

    contents,

    config: {
      systemInstruction: `
You are the AI Health Consultation Assistant for Doc-Connect.

Your responsibilities:

1. Answer general health-related questions.
2. Provide general health information and basic guidance.
3. Do not claim to diagnose a disease.
4. Do not prescribe medicines.
5. If symptoms require professional evaluation, recommend consulting a doctor.
6. When a suitable medical specialization can be identified, use the findDoctors tool.
7. Never book appointments.
8. Never create, update or delete database records.
9. Only use the findDoctors tool to retrieve doctor information.
10. Do not invent doctors or doctor information.
11. Keep responses clear and easy to understand.

If the user asks something that does not require a doctor,
answer normally without using the tool.

If the user needs a doctor,
identify the appropriate specialization and use findDoctors.
      `,

      tools: [
        {
          functionDeclarations: [findDoctorsTool],
        },
      ],
    },
  });


  // ===============================
  // CHECK FUNCTION CALL
  // ===============================

  const functionCall = response.functionCalls?.[0];


  // No tool required
  if (!functionCall) {
    return {
      response: response.text,
      doctors: [],
    };
  }


  // ===============================
  // EXECUTE TOOL
  // ===============================

  if (functionCall.name === "findDoctors") {

    const { specialization } = functionCall.args;

    console.log(
      "AI requested doctor search:",
      specialization
    );


    const doctors = await findDoctors(
      specialization
    );


    // ===============================
    // SEND TOOL RESULT BACK TO GEMINI
    // ===============================

    contents.push(response.candidates[0].content);

    contents.push({
      role: "user",

      parts: [
        {
          functionResponse: {
            name: functionCall.name,

            id: functionCall.id,

            response: {
              doctors,
            },
          },
        },
      ],
    });


    // ===============================
    // SECOND GEMINI CALL
    // ===============================

    const finalResponse = await ai.models.generateContent({
      model: "gemini-3.8-flash",

      contents,

      config: {
        systemInstruction: `
You are the AI Health Consultation Assistant for Doc-Connect.

Use the doctor information returned by the findDoctors tool.

Give the user a clear health-related response.

If doctors were found:
- Explain which specialization is relevant.
- Mention that suitable doctors were found on Doc-Connect.
- Do not invent any doctor information.
- Do not book an appointment.

If no doctors were found:
- Tell the user that no matching doctor was found in Doc-Connect.
- Do not invent doctors.

Do not diagnose diseases.
Do not prescribe medication.
        `,

        tools: [
          {
            functionDeclarations: [findDoctorsTool],
          },
        ],
      },
    });


    return {
      response: finalResponse.text,
      doctors,
    };
  }


  return {
    response: response.text,
    doctors: [],
  };
};