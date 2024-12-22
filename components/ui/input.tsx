type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${className}`}
      {...props}
    />
  );
};
