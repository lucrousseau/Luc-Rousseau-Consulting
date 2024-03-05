export function alignments({ prefix = "row", props }) {
  const { align, halign, valign } = props;

  const alignmentsClass = [
    align ? `align--${align}` : "",
    halign ? `${prefix}--${halign}` : "",
    valign ? `${prefix}--${valign}` : "",
  ];

  return alignmentsClass.filter(Boolean).join(" ");
}
