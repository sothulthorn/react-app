import categories from '../categories';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  description: z.string().min(3, 'Description must be at least 3 characters'),
  amount: z
    .number({ invalid_type_error: 'Amount is required' })
    .min(0.01, 'Amount must be at least 0.01')
    .max(1000, 'Amount is too large'),
  category: z.enum([...categories] as [string, ...string[]], {
    errorMap: () => ({ message: 'Category is required' }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface ExpendFormProps {
  onAddExpense: (data: ExpenseFormData) => void;
}

const ExpendForm = ({ onAddExpense }: ExpendFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onAddExpense(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register('description')}
          type="text"
          className="form-control"
          id="description"
        />
        {errors.description && (
          <div className="text-danger">{errors.description.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register('amount', { valueAsNumber: true })}
          type="number"
          className="form-control"
          id="amount"
        />
        {errors.amount && (
          <div className="text-danger">{errors.amount.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register('category')} className="form-select" id="category">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <div className="text-danger">{errors.category.message}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Add Expense
      </button>
    </form>
  );
};

export default ExpendForm;
