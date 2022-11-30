import { reactive } from "vue";

export const store = reactive({
  trainList: [],
  testList: [],
  trainAverage: 0,
  testAverage: 0,
  getCombinateList() {
    const newList: any[] = [];
    let trainTotal = 0;
    let testTotal = 0;
    for (const data of this.trainList) {
      const test = this.testList.find(function (element: any[]) {
        return element[0] === data[0] && element[1] === data[1];
      });
      if (test !== undefined) {
        newList.push([data[0], data[1], data[2], data[3], data[4], test[2], test[3], test[4]]);
        trainTotal += data[2];
        testTotal += test[2];
      }
    }
    this.testAverage = testTotal / this.trainList.length;
    this.trainAverage = trainTotal / this.testList.length;
    return newList;
  },
});
