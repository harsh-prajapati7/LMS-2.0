const loans = [
  {
    id: 1,
    customer: "Rahul Sharma",
    amount: "₹50,000",
    status: "Approved",
  },
  {
    id: 2,
    customer: "Priya Patel",
    amount: "₹75,000",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Aman Verma",
    amount: "₹30,000",
    status: "Rejected",
  },
];

function RecentLoans() {
  return (
    <div className="table-card">
      <h3>Recent Loan Applications</h3>
         
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{loan.customer}</td>
              <td>{loan.amount}</td>
              <td>
                <span
                    className={`status ${loan.status.toLowerCase()}`}
                >
                    {loan.status}
                </span>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentLoans;