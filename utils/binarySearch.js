function binarySearch(sortedArr, target, getKey) {
  let left  = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    const mid    = Math.floor((left + right) / 2);
    const midVal = getKey(sortedArr[mid]);

    if (midVal === target) {
      const results = [sortedArr[mid]];
      let i = mid - 1;
      while (i >= 0 && getKey(sortedArr[i]) === target)
        results.push(sortedArr[i--]);
      let j = mid + 1;
      while (j < sortedArr.length && getKey(sortedArr[j]) === target)
        results.push(sortedArr[j++]);
      return results;
    }
    else if (midVal < target) left  = mid + 1;
    else                      right = mid - 1;
  }
  return [];
}

module.exports = { binarySearch };