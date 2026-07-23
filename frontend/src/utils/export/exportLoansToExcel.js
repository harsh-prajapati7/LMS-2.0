import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
    });

export default function exportLoansToExcel(loans) {
    if (!loans || loans.length === 0) {
        alert("No loan data available.");
        return;
    }

    const rows = loans.map((loan, index) => ({
        "Sr No": index + 1,

        Customer: loan.customer?.fullName || "-",

        Employee: loan.employee?.fullName || "Not Assigned",

        Amount: loan.loanAmount,

        Interest: `${loan.interestRate}%`,

        Duration: `${loan.duration} Months`,

        EMI: loan.emi,

        Status: loan.status,

        Remarks: loan.remarks || "",

        Created: new Date(
            loan.createdAt
        ).toLocaleDateString(),
    }));

    const worksheet =
        XLSX.utils.json_to_sheet(rows);

    worksheet["!cols"] = [
        { wch: 8 },
        { wch: 25 },
        { wch: 25 },
        { wch: 15 },
        { wch: 10 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 30 },
        { wch: 18 },
    ];

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Loans"
    );

    const excelBuffer =
        XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

    const file = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
    );

    saveAs(
        file,
        `Loans_${new Date()
            .toISOString()
            .slice(0, 10)}.xlsx`
    );
}