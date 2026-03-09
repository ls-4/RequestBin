const generateBinId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export { generateBinId };