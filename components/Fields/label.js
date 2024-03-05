export default function Label({ required, label }) {
  return (
    <span>
      {required && "*"}
      {label}
    </span>
  );
}
