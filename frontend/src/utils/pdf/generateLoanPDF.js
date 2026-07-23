import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

export default function generateLoanPDF(loan) {
  const doc = new jsPDF();

  // =============================
  // Header
  // =============================

  doc.setFontSize(22);
  doc.setTextColor(33, 37, 41);
  doc.text("Loan Management System", 14, 18);

  doc.setFontSize(14);
  doc.text("Loan Report", 14, 28);

  doc.setDrawColor(50, 50, 50);
  doc.line(14, 32, 196, 32);

  // =============================
  // Customer
  // =============================

  autoTable(doc, {
    startY: 40,
    head: [["Customer Information", ""]],
    body: [
      ["Name", loan.customer?.fullName || "-"],
      ["Email", loan.customer?.email || "-"],
      ["Phone", loan.customer?.phone || "-"],
    ],
  });

  // =============================
  // Employee
  // =============================

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [["Assigned Employee", ""]],
    body: [
      ["Name", loan.employee?.fullName || "Not Assigned"],
      ["Email", loan.employee?.email || "-"],
    ],
  });

  // =============================
  // Loan
  // =============================

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [["Loan Details", ""]],
    body: [
      ["Loan Amount", formatCurrency(loan.loanAmount)],
      ["Interest", `${loan.interestRate}%`],
      ["Duration", `${loan.duration} Months`],
      ["Monthly EMI", formatCurrency(loan.emi)],
      ["Status", loan.status],
      ["Remarks", loan.remarks || "-"],
    ],
  });

  // =============================
  // EMI Schedule
  // =============================

  const rows = [];

  const P = Number(loan.loanAmount);
  const R = Number(loan.interestRate) / 100 / 12;
  const N = Number(loan.duration);

  const emi =
    (P * R * Math.pow(1 + R, N)) /
    (Math.pow(1 + R, N) - 1);

  let balance = P;

  for (let month = 1; month <= N; month++) {
    const interest = balance * R;

    const principal = emi - interest;

    balance -= principal;

    rows.push([
      month,
      formatCurrency(emi),
      formatCurrency(principal),
      formatCurrency(interest),
      formatCurrency(Math.max(balance, 0)),
    ]);
  }

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [
      [
        "Month",
        "EMI",
        "Principal",
        "Interest",
        "Balance",
      ],
    ],
    body: rows,
  });

  // =============================
  // Footer
  // =============================

  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(10);

  doc.text(
    `Generated on : ${new Date().toLocaleString()}`,
    14,
    pageHeight - 10
  );

  doc.save(`Loan_${loan._id}.pdf`);
}