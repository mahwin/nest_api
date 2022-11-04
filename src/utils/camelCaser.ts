export default function camelCaser(name: string) {
  const nameList = name.split('-');

  nameList.forEach((string, idx) => {
    if (idx !== 0) {
      nameList[idx] = string.slice(0, 1).toUpperCase() + string.slice(1);
    }
  });
  return nameList.join('');
}
