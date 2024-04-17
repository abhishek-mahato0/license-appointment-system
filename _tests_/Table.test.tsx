import { TanTable } from "@/components/common/TanTable";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Table", () => {
  it("should render table with 1 document", () => {
    render(
      <TanTable
        data={[{ name: "John", age: 25 }]}
        columns={[
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Age",
            accessorKey: "age",
          },
        ]}
      />
    );
    // const table = document.querySelector("table");
    // expect(table).toBeInTheDocument();
    const headers = document.querySelectorAll("th");
    expect(headers).toHaveLength(2);
    const rows = document.querySelectorAll("tr");
    expect(rows).toHaveLength(2);

    const name = screen.getByText(/John/i);
  });
});
