import { render, screen, fireEvent } from "@testing-library/react";
import IceCreamCard from "./IceCreamCard";

const mockIce = {
  name: "Vanilla",
  price: 500,
  image: "vanilla.jpg"
};

test("renders image with correct src and alt", () => {
    const mockAdd = jest.fn();
    render(<IceCreamCard ice={mockIce} addToCart={mockAdd} />);
  
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("vanilla.jpg"));
    expect(img).toHaveAttribute("alt", "Vanilla");
  });
  