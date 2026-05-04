function quickSort(arr, compareFn) {
  if (arr.length <= 1) return arr;

  const pivot  = arr[Math.floor(arr.length / 2)];
  const left   = [];
  const middle = [];
  const right  = [];

  for (const item of arr) {
    const cmp = compareFn(item, pivot);
    if      (cmp < 0) left.push(item);
    else if (cmp > 0) right.push(item);
    else              middle.push(item);
  }

  return [
    ...quickSort(left,  compareFn),
    ...middle,
    ...quickSort(right, compareFn)
  ];
}

const comparators = {
  byDateDesc:     (a,b) => new Date(b.log_date)  - new Date(a.log_date),
  byDateAsc:      (a,b) => new Date(a.log_date)  - new Date(b.log_date),
  byQuantityDesc: (a,b) => b.quantity_used - a.quantity_used,
  byQuantityAsc:  (a,b) => a.quantity_used - b.quantity_used,
};

module.exports = { quickSort, comparators };