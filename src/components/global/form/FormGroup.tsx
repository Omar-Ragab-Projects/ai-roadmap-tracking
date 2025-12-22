"use client";
interface FormGroupProps {
  label?: string;
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
    <div className="not-first-of-type:mt-5 lg:not-first-of-type:mt-6">
      <label htmlFor={name}>
        {label && (
          <span>
            {label} {required && <span className="text-red-300">*</span>}
          </span>
        )}

        {textarea ? (
          <textarea onKeyDown={(e) => e.stopPropagation()} {...props} />
        ) : (
          <input {...props} />
        )}
      </label>
    </div>
  );
}
