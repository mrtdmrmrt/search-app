import { ascName } from "../../src/utils/helpers";
import { mockData } from "../../src/utils/constants/mockData";

const ascNameCompare = (data, index) => {
  data.sort(function (a, b) {
    if (b[index] < a[index]) {
      return 1;
    }
    if (b[index] > a[index]) {
      return -1;
    }
    return 0;
  });
};

test("Asc Name (A -> Z)  Sort", () => {
  const sortedData = { ...mockData };
  const compareData = { ...mockData };

  const sortedArray = [...sortedData.data];
  const comparedArray = [...compareData.data];

  ascName(sortedArray, sortedData.cols.indexOf("Date"));
  ascNameCompare(comparedArray, compareData.cols.indexOf("Date"));

  expect(sortedArray[0]).toEqual(comparedArray[0]);
});
