import { ascDate, dateFormatter } from "../../src/utils/helpers";
import { mockData } from "../../src/utils/constants/mockData";

const ascDateCompare = (data, index) => {
  data.sort(function (a, b) {
    return (
      new Date(dateFormatter(a[index])) - new Date(dateFormatter(b[index]))
    );
  });
};

test("Asc Date  Sort", () => {
  const sortedData = { ...mockData };
  const compareData = { ...mockData };

  const sortedArray = [...sortedData.data];
  const comparedArray = [...compareData.data];

  ascDate(sortedArray, sortedData.cols.indexOf("Date"));
  ascDateCompare(comparedArray, compareData.cols.indexOf("Date"));

  expect(sortedArray[0]).toEqual(comparedArray[0]);
});
