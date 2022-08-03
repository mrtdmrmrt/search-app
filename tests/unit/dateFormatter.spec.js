import { dateFormatter } from "../../src/utils/helpers";

test("Date Formatter", () => {
  // dd/mm/yyyy
  const date = "24/08/2022";

  // mm/dd/yyyy
  const dateConvert = dateFormatter(date);

  expect(dateConvert).toEqual("08/24/2022");
});
