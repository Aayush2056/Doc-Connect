import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    phone: {
      type: String,
      trim: true,
    },

    fees: {
      type: Number,
      required: true,
    },
   image: {
  type: String,
  required: true
},
    availability: [
      {
        day: {
          type: String,
          enum: [  "Monday", "Tuesday","Wednesday", "Thursday", "Friday",  "Saturday", ],
          required : true,
        },
        slots: [
          {
            startTime: {
              type: String,
              required: true,
            },

            endTime: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
