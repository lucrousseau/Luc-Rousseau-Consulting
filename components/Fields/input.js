export default function Input({ name, type, value, defaultValue, required, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...(required && { required: true })}
    />
  );
}
