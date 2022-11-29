import { reactive } from "vue";

export const store = reactive({
  trainList: [],
  testList: [],
  getCombinateList() {
    const newList: any[] = [];
    for (const data of this.trainList) {
      const test = this.testList.find(function (element: any[]) {
        return element[0] === data[0] && element[1] === data[1];
      });
      console.log(data[0]);
      console.log(test);
      newList.push([data[0], data[1], data[2], data[3], data[4], test[2], test[3], test[4]]);
    }
    return newList;
  },
});
