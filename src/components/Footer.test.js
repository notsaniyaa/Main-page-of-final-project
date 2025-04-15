import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders footer with contact links", () => {
  render(<Footer />);
  expect(screen.getByText(/Ice Cream Shop/i)).toBeInTheDocument();
  expect(screen.getByText(/Instagram/i)).toBeInTheDocument();
  expect(screen.getByText(/Gmail/i)).toBeInTheDocument();
  expect(screen.getByText(/\+7 \(705\) 706-2482/i)).toBeInTheDocument();
});
