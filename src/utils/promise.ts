export const wait = async (ms: number) => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};
