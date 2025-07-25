export const calcYoY = (series: number[]) => {
  const result = [];
  series.forEach((cur, idx, ary) => {
    if (idx > 11) {
      const prev = ary[idx - 12];
      if (prev > 0) {
        const yoy = (cur / prev - 1) * 100;
        result.push(yoy);
      } else {
        result.push(null);
      }
    }
  });

  return result;
};