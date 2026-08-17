import { render, screen } from "@testing-library/react";

import Picture from "./index";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { priority, fetchPriority, ...rest } = props;
    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img data-priority={String(Boolean(priority))} fetchPriority={fetchPriority} {...rest} />
    );
  },
}));

describe("Picture", () => {
  it("keeps LCP images at quality 75 with sync decoding", () => {
    render(<Picture src="/x.jpg" alt="profile" width={480} height={480} priority />);

    const img = screen.getByAltText("profile");
    expect(img).toHaveAttribute("quality", "75");
    expect(img).toHaveAttribute("decoding", "sync");
    expect(img).toHaveAttribute("fetchpriority", "high");
  });
});
