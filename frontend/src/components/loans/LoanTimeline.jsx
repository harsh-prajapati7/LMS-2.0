import {
  Paper,
  Typography,
  Divider,
} from "@mui/material";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PaymentsIcon from "@mui/icons-material/Payments";

function LoanTimeline({ loan }) {
  const events = [];

  // Loan Applied
  events.push({
    title: "Loan Applied",
    date: loan.createdAt,
    description: "Customer submitted a loan application.",
    icon: <AssignmentIcon />,
    color: "primary",
  });

  // Employee Assigned
  if (loan.employee) {
    events.push({
      title: "Employee Assigned",
      date: loan.updatedAt,
      description: `${loan.employee.fullName} was assigned to this loan.`,
      icon: <PersonAddIcon />,
      color: "info",
    });
  }

  // Approved
  if (loan.status === "Approved") {
    events.push({
      title: "Loan Approved",
      date: loan.updatedAt,
      description: "The loan has been approved.",
      icon: <CheckCircleIcon />,
      color: "success",
    });
  }

  // Rejected
  if (loan.status === "Rejected") {
    events.push({
      title: "Loan Rejected",
      date: loan.updatedAt,
      description: "The loan has been rejected.",
      icon: <CancelIcon />,
      color: "error",
    });
  }

  // EMI Generated
  if (loan.emi) {
    events.push({
      title: "EMI Generated",
      date: loan.updatedAt,
      description: `Monthly EMI: ₹${Number(loan.emi).toLocaleString("en-IN")}`,
      icon: <PaymentsIcon />,
      color: "secondary",
    });
  }

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" fontWeight="bold">
        Loan Timeline
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Timeline position="alternate">
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent color="text.secondary">
              {event.date
                ? new Date(event.date).toLocaleString()
                : "-"}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot color={event.color}>
                {event.icon}
              </TimelineDot>

              {index !== events.length - 1 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>

            <TimelineContent>
              <Typography fontWeight="bold">
                {event.title}
              </Typography>

              <Typography color="text.secondary">
                {event.description}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}

export default LoanTimeline;