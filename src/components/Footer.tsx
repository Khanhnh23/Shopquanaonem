import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-4">

      <div className="container">

        <div className="row">

          {/* GIỚI THIỆU */}
          <div className="col-md-4 mb-3">
            <h5>NEM FASHION - THỜI TRANG CÔNG SỞ</h5>
            <p className="small">
              Công ty TNHH Dịch vụ và Thương mại An Thành.<br />
              Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017
            </p>

            <p className="small">
              Địa chỉ: Lô 1+2, Ô quy hoạch E.2/NO7 đường Lâm Hạ,
              phường Bồ Đề, quận Long Biên, Hà Nội
            </p>

            <p className="small">
              CSKH: 0246.2591551 <br />
              Mua hàng online: 0246.2909098 <br />
              Email: nemcskh@stripe-vn.com
            </p>
          </div>

          {/* GIỚI THIỆU + CHÍNH SÁCH */}
          <div className="col-md-4 mb-3">
            <h5>Giới thiệu</h5>
            <ul className="list-unstyled small">
              <li>Triết lý kinh doanh tại NEM Fashion</li>
              <li>NEM's Blog</li>
              <li>Hệ thống showroom</li>
            </ul>

            <h5 className="mt-3">Chính sách</h5>
            <ul className="list-unstyled small">
              <li>Giao nhận - Vận chuyển</li>
              <li>Thanh toán</li>
              <li>Tra cứu đơn hàng</li>
              <li>Chọn Size</li>
              <li>Đổi hàng</li>
              <li>Bảo hành - Sửa chữa</li>
            </ul>
          </div>

          {/* KHÁCH HÀNG */}
          <div className="col-md-4 mb-3">
            <h5>Khách hàng</h5>
            <ul className="list-unstyled small">
              <li>Khách hàng thân thiết</li>
              <li>Hướng dẫn bảo quản sản phẩm</li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center small">
          © 2026 NEM Fashion Clone - React Project
        </div>

      </div>

    </footer>
  );
};

export default Footer;