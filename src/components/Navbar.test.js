import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("navbar contains correct links", () => {
    render(<BrowserRouter><Navbar /></BrowserRouter>);
    
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("About Us").closest("a")).toHaveAttribute("href", "/about");
    expect(screen.getByText("Cart").closest("a")).toHaveAttribute("href", "/cart");
    expect(screen.getByText("Contact Us").closest("a")).toHaveAttribute("href", "#contact");
  });
  