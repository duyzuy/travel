const Menus = () => {
  const MENU_ITEMS = [
    { id: "travelDestination", name: "Cẩm nang du lịch", children: [] },
    { id: "depart", name: "Điểm đến", children: [] },
    { id: "hotdeal", name: "Khuyến mại", children: [] },
    { id: "routes", name: "Chặng bay", children: [] },
  ];
  return (
    <>
      <div className="flex space-x-4">
        {MENU_ITEMS.map((item) => (
          <a
            href="#"
            className=" rounded-md px-3 py-2 font-medium hover:bg-gray-100"
            aria-current="page"
            key={item.id}
          >
            {item.name}
          </a>
        ))}
      </div>
    </>
  );
};
export default Menus;
