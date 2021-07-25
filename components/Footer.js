export default function Footer() {
  return (
    <footer className="new_footer_area bg_color">
      <div className="new_footer_top">
        <div className="footer_bg">
          <div className="footer_bg_one"></div>
          <div className="footer_bg_two"></div>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="row align-items-center">
          <div className="col-lg-12 col-sm-12 text-center">
            <p className="mb-0 f_400">
              © Jagir Bahesh {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
