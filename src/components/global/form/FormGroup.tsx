interface FormGroupProps {
  label: string;
  name: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}

export default function FormGroup({
  label,
  name,
  textarea = false,
  required = false,
  placeholder,
  defaultValue,
}: FormGroupProps) {
  const props = {
    name,
    id: name,
    placeholder,
    defaultValue,
    required,
  };
  return (
    <div className="not-first:mt-6">
      <label htmlFor={name}>
        <span>
          {label} {required && <span className="text-red-300">*</span>}
        </span>

        {textarea ? <textarea {...props} /> : <input {...props} />}
      </label>
    </div>
  );
}
