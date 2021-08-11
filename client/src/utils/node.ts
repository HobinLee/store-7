export const getSiblingIndex = ($el: ChildNode) => {
  let i = 0;

  while (($el = $el.previousSibling) !== null) {
    i++;
  }

  return i;
};
