export function formatCurrency(amount){

    return Number(amount).toLocaleString("en-IN",{

        style:"currency",

        currency:"INR",

        maximumFractionDigits:0,

    });

}

export function getStatusColor(status){

    switch(status){

        case "Approved":
            return "success";

        case "Rejected":
            return "error";

        case "Assigned":
            return "info";

        case "Pending":
            return "warning";

        default:
            return "default";

    }

}   