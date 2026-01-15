import PropTypes from "prop-types";

/**
 * Reusable form field component for inputs and textareas
 *
 * @param {Object} props
 * @param {string} props.label - Label text for the field
 * @param {string} props.name - Field name attribute
 * @param {string} props.type - Input type (text, email, tel, etc.) or 'textarea'
 * @param {string} props.value - Field value
 * @param {function} props.onChange - Change handler function
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.error] - Error message to display
 * @param {number} [props.rows] - Number of rows for textarea (default: 7)
 * @param {boolean} [props.required] - Whether the field is required
 * @param {string} [props.className] - Additional CSS classes for the wrapper
 * @returns {JSX.Element}
 *
 * @example
 * <FormField
 *   label="Your Name"
 *   name="name"
 *   type="text"
 *   value={form.name}
 *   onChange={handleChange}
 *   placeholder="What's your name?"
 *   error={errors.name}
 * />
 */
const FormField = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder = "",
  error = "",
  rows = 7,
  required = false,
  className = "",
}) => {
  const isTextarea = type === "textarea";

  const inputClasses =
    "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium w-full";

  const errorClasses = error ? "border-2 border-red-500" : "";

  return (
    <label className={`flex flex-col ${className}`}>
      <span className='text-white font-medium mb-4'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </span>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`${inputClasses} ${errorClasses}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${inputClasses} ${errorClasses}`}
        />
      )}
      {error && <span className='text-red-500 text-sm mt-2'>{error}</span>}
    </label>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default FormField;
