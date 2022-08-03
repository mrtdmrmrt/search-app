import { descName } from "../../src/utils/helpers";
import { mockData } from "../../src/utils/constants/mockData";

const descNameCompare = (data, index) => {
  data.sort(function (a, b) {
    if (b[index] < a[index]) {
      return -1;
    }
    if (b[index] > a[index]) {
      return 1;
    }
    return 0;
  });
};

test("Desc Name (Z -> A)  Sort", () => {
  const sortedData = { ...mockData };
  const compareData = { ...mockData };

  const sortedArray = [...sortedData.data];
  const comparedArray = [...compareData.data];

  descName(sortedArray, sortedData.cols.indexOf("Date"));
  descNameCompare(comparedArray, compareData.cols.indexOf("Date"));

  expect(sortedArray[0]).toEqual(comparedArray[0]);
});
