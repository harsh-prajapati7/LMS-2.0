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
        "Assigned",
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

    rejectionReason: {
      type: String,
      default: "",
    },

    approvedAt: {
      type: Date,
    },

    rejectedAt: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loan", loanSchema);