interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface ExpendListProps {
  expenses: Expense[];
  onDeleteExpense?: (id: number) => void;
}

const ExpendList = ({ expenses, onDeleteExpense }: ExpendListProps) => {
  if (expenses.length === 0) {
    return <p className="text-center">No expenses found.</p>;
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>{expense.category}</td>
            <td>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDeleteExpense?.(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td colSpan={3}>
            $
            {expenses
              .reduce((acc, expense) => acc + expense.amount, 0)
              .toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpendList;
