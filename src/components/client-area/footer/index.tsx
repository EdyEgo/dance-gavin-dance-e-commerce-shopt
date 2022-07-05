import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AppleIcon from "@mui/icons-material/Apple";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="footer-container h-96 py-12 text-white">
      <div className="footer-header flex justify-between items-center">
        <div className="footer-header__left-half">
          <div className="title font-extrabold">SUPPORT</div>
          <div className="items-list">
            <div>SEARCH</div>
            <div>CONTACT US</div>
            <div>PRIVACY POLICY</div>
            <div>REFUND POLICY</div>
            <div>SHIPPING POLICY</div>
          </div>
        </div>
        <div className="footer-header__middle-half">
          <div className="title">FOLLOW</div>
          <div className="items-list flex items-center">
            <div className="social-media-item  border border-gray-50 p-4 py-2">
              <a href="#" className="social-media-link">
                <FacebookIcon />
              </a>
            </div>

            <div className="social-media-item   border border-gray-50 p-4 py-2">
              <a href="#" className="social-media-link">
                <TwitterIcon />
              </a>
            </div>
            <div className="social-media-item border border-gray-50 p-4 py-2">
              <a href="#" className="social-media-link">
                <InstagramIcon />
              </a>
            </div>
            <div className="social-media-item   border border-gray-50 p-4 py-2">
              <a href="#" className="social-media-link">
                <YouTubeIcon />
              </a>
            </div>
            <div className="social-media-item border border-gray-50 p-4 py-2">
              <a href="#" className="social-media-link">
                <AppleIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-header__right-half">
          <div className="title">STAY UP TO DATE</div>
          <div className="items-list"></div>
        </div>
      </div>
      <div className="footer-middle"></div>
      <div className="footer-footer"></div>
    </div>
  );
};

export default Footer;
