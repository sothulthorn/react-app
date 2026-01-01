import { useState } from 'react';
import ExpendList from './expense-tracker/components/ExpendList';
import ExpendFilter from './expense-tracker/components/ExpendFilter';
import ExpendForm from './expense-tracker/components/ExpendForm';
import { set } from 'zod';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: 150.75, category: 'Food' },
    {
      id: 2,
      description: 'Electricity Bill',
      amount: 60.5,
      category: 'Utilities',
    },
    { id: 3, description: 'Gym Membership', amount: 40.0, category: 'Health' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <div>
      <div className="mb-5">
        <ExpendForm
          onAddExpense={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpendFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpendList
        expenses={expenses.filter(
          (expense) =>
            selectedCategory === '' || expense.category === selectedCategory
        )}
        onDeleteExpense={(id) =>
          setExpenses((prev) => prev.filter((expense) => expense.id !== id))
        }
      />
    </div>
  );
}

export default App;
