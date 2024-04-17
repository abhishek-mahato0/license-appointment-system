import {
  capitalizeFirstLetter,
  convertDate,
  getCustomDate,
} from "@/utils/convertDate";
import "@testing-library/jest-dom";

describe("Utils", () => {
  test("Should captalize the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });
  test("Should give date in specific format", () => {
    expect(convertDate(new Date())).toBe("2024-04-17");
  });

  test("Should give date after specific days from current date", () => {
    expect(convertDate(getCustomDate(5))).toBe("2024-04-22");
  });
});
