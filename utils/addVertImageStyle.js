export const addVertImageStyle = (item, styles) => {
  const ids = [
    "65670ca9a623b6fddfce5ffd",
    "655c90e8cbffef93b8accab8",
    "65670c97a623b6fddfce5ff9",
    "65670cbea623b6fddfce6001",
    "65670cd5a623b6fddfce6005",
    "653c08511e1415d9c89d1769",
    "655e112449ba0935b43a3eb2",
    "654bb117c2fbb0f34ee5a6ec",
    "654bb11ac2fbb0f34ee5a6f0",
  ];

  if (ids.includes(item.subcategory_id)) return styles.vertImage;
  else return null;
};
