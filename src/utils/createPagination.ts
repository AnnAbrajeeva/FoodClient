export const createPagination = (total: number, current: number): (number | string)[] => {
  const arr = [];

  if (total < 7) {
    for (let i = 1; i <= total; i++) {
      arr.push(i);
    }
    return arr;
  }

  if (current <= 4) {
    for (let i = 1; i <= 5; i++) {
      arr.push(i);
    }
    arr.push('...');
    arr.push(total);
    return arr;
  }

  if (current >= total - 3) {
    arr.push(1);
    arr.push('...');
    for (let i = total - 4; i <= total; i++) {
      arr.push(i);
    }
    return arr;
  }

  arr.push(1);
  arr.push('...');
  for (let i = current - 1; i <= current + 1; i++) {
    arr.push(i);
  }
  arr.push('...');
  arr.push(total);
  return arr;
};
