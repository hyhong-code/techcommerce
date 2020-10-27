const TAG_COLORS = ["magenta", "volcano", "cyan", "geekblue", "purple"];

const randomTagColor = () => {
  return TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];
};

export default randomTagColor;
