const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    loanAmount: {
      type: Number,
      required: true,
      min: 1000,
    },

    interestRate: {
      type: Number,
      required: true,
      default: 10,
    },

    duration: {
      type: Number,
      required: true,
    },

    emi: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Closed",
      ],
      default: "Pending",
    },

    remarks: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loan", loanSchema);