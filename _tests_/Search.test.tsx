import SearchInput from "@/components/common/SearchInput";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Search", () => {
  it("should render search input", () => {
    render(
      <SearchInput
        onChange={() => {}}
        onClear={() => {}}
        placeholder="Search Name"
      />
    );
    const input = document.querySelector("input");
    expect(input).toBeInTheDocument();
    const text = screen.getByPlaceholderText(/Search Name/i);
    input?.setAttribute("value", "product");
    expect(input?.getAttribute("value")).toBe("product");
  });
});
