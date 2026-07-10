export interface AlignmentProps {
  align?: string;
  halign?: string;
  valign?: string;
}

interface AlignmentsParams {
  prefix?: string;
  props?: AlignmentProps;
}

export function alignments({ prefix = "row", props = {} }: AlignmentsParams = {}): string {
  const { align, halign, valign } = props;

  const alignmentsClass = [
    align ? `align--${align}` : "",
    halign ? `${prefix}--${halign}` : "",
    valign ? `${prefix}--${valign}` : "",
  ];

  return alignmentsClass.filter(Boolean).join(" ");
}
