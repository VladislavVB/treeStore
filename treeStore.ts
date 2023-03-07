interface Iitem {
  readonly id: number;
  readonly parent: number | string;
  readonly type?: string | null 
}


class TreeStore {
  _array = [];
  initArray: any
  // id: number
  constructor(initArray: Iitem[]) {
    // this.id = id;
    for (let i = 0; i < initArray.length; ++i) {
      this._array[i] = initArray[i];
    }
  }
  getAll() {
    return this._array;
  }
  getItem(id: number) {
    return this._array.find((item) => item.id === id);
  }
  getChildren(id: number) {
    return this._array.filter((item) => item.parent === id);
  }
  getParent(id: number) {
    return this._array.filter((item) => this.getItem(id).parent === item.id) 
  }
  getAllChildren(id: number) {
    let resultArr = [];
    let parentArr = this.getChildren(id);
    let childrenArr = [];
    do {
      childrenArr = [];
      parentArr.forEach((elem) => {
        childrenArr = [...childrenArr, ...this.getChildren(elem.id)];
      });
      resultArr = [...resultArr, ...parentArr];
      parentArr = childrenArr;
    } while (parentArr.length);
    return resultArr;
  }
  getAllParents(id: number) {
    let resultArr = [];
    let parentArr = this.getParent(id);
    let childrenArr = [];
    do {
      childrenArr = [];
      parentArr.forEach((elem) => {
        childrenArr = [...childrenArr, ...this.getParent(elem.id)];
      });
      resultArr = [...resultArr, ...parentArr];
      parentArr = childrenArr;
    } while (parentArr.length);
    return resultArr;
  }
}

const items = [
  { id: 1, parent: "root" },
  { id: 2, parent: 1, type: "test" },
  { id: 3, parent: 1, type: "test" },

  { id: 4, parent: 2, type: "test" },
  { id: 5, parent: 2, type: "test" },
  { id: 6, parent: 2, type: "test" },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];
const treeStore = new TreeStore(items);
console.log(treeStore.getAll());
console.log(treeStore.getItem(7));
console.log(treeStore.getChildren(4));
console.log(treeStore.getAllChildren(2));
console.log(treeStore.getAllParents(7));

