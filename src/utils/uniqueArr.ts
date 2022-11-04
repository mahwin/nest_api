function uniqueArr(arr1: string, arr2: string): string {
  const array1 = JSON.parse(arr1);
  const array2 = JSON.parse(arr2);
  const unique = Array.from(new Set([...array1, ...array2]));
  return JSON.stringify(unique);
}

export default uniqueArr;
