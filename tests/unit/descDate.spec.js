import { descDate, dateFormatter } from "../../src/utils/helpers";
import { mockData } from "../../src/utils/constants/mockData";

const descDateCompare = (data, index) => {
  data.sort(function (a, b) {
    return (
      new Date(dateFormatter(b[index])) - new Date(dateFormatter(a[index]))
    );
  });
};

test("Desc Date Sort", () => {
  const sortedData = { ...mockData };
  const compareData = { ...mockData };

  const sortedArray = [...sortedData.data];
  const comparedArray = [...compareData.data];

  descDate(sortedArray, sortedData.cols.indexOf("Date"));
  descDateCompare(comparedArray, compareData.cols.indexOf("Date"));

  expect(sortedArray[0]).toEqual(comparedArray[0]);
});
