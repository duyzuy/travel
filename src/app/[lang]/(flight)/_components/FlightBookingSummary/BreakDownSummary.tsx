const BreakDownSummary = () => {
  return (
    <div className="price-breakdown-sector">
      <div className="sector-price--label">
        <h4 className="text-lg py-2">Chi tiết giá chiều đi</h4>
      </div>
      <ul className="price-breakdown-items text-sm text-gray-600">
        <li className="flex items-center justify-between py-2">
          <span>Người lớn</span>
          <span>2 x 1.198.000</span>
        </li>
        <li className="flex items-center justify-between py-2">
          <span>Trẻ em</span>
          <span>2 x 1.198.000</span>
        </li>
        <li className="flex items-center justify-between py-2">
          <span>Em bé</span>
          <span>Miễn phí</span>
        </li>
        <li className="flex items-center justify-between py-2">
          <span>Thuế và phí sân bay</span>
          <span>2 x 2.446.000</span>
        </li>
        <li className="flex items-center justify-between py-2">
          <span>Phí dịch vụ</span>
          <span>140.000</span>
        </li>
      </ul>
      <div className="price-breakdown-sector-total">
        <p className="py-2 flex justify-between items-center">
          <span>Tổng giá chiều đi</span> <span>4.864.000</span>
        </p>
      </div>
    </div>
  );
};
export default BreakDownSummary;
