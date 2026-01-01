import categories from '../categories';

interface ExpendFilterProps {
  onSelectCategory?: (category: string) => void;
}

const ExpendFilter = ({ onSelectCategory }: ExpendFilterProps) => {
  return (
    <select
      className="form-select"
      onChange={(e) => onSelectCategory?.(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpendFilter;
