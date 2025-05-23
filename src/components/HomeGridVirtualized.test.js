import { render, screen } from "@testing-library/react";
import HomeGridVirtualized from "./HomeGridVirtualized";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/cartContext";

test("renders ice cream list with virtualization", () => {
  render(
    <BrowserRouter>
      <CartProvider>
        <HomeGridVirtualized />
      </CartProvider>
    </BrowserRouter>
  );

  expect(screen.getByText(/Our Ice Creams/i)).toBeInTheDocument();
});
