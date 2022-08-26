import { useLocation } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AppleIcon from "@mui/icons-material/Apple";
import EmailSubscriptionInput from "./EmailSubscriptionInput";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  // const locationReact = useLocation();
  // const isCheckoutPage = locationReact.pathname.includes("checkout");

  return (
    <div className="footer-container  text-white p-12">
      <div className="footer-header flex flex-wrap justify-between ">
        <div className="footer-header__left-half flex flex-col gap-1 mb-16 ">
          <div className="title font-extrabold mb-5">SUPPORT</div>
          <div className="items-list font-extralight flex flex-col gap-3 ">
            <Link to="#" className="font-serif text-[18px] font-semibold">
              SEARCH
            </Link>
            <a
              href="https://merchnow.com/contact/shopifysupport"
              className="font-serif text-[18px] font-semibold"
            >
              CONTACT US
            </a>
            <a
              href="https://merchnow.com/about/privacypolicy"
              className="font-serif text-[18px] font-semibold"
            >
              PRIVACY POLICY
            </a>
            <Link to="#" className="font-serif text-[18px] font-semibold">
              REFUND POLICY
            </Link>
            <Link to="#" className="font-serif text-[18px] font-semibold">
              SHIPPING POLICY
            </Link>
          </div>
        </div>
        <div className="footer-header__middle-half">
          <div className="title mb-5">FOLLOW</div>
          <div className="items-list flex flex-wrap items-center">
            <div className="social-media-item  border border-[#EC6A63] p-4 py-2">
              <a
                href="https://www.facebook.com/DanceGavinDance/"
                className="social-media-link"
              >
                <FacebookIcon />
              </a>
            </div>

            <div className="social-media-item   border border-[#EC6A63] p-4 py-2">
              <a
                href="https://twitter.com/dgdtheband"
                className="social-media-link"
              >
                <TwitterIcon />
              </a>
            </div>
            <div className="social-media-item border border-[#EC6A63] p-4 py-2">
              <a
                href="https://www.instagram.com/dancegavindance/"
                className="social-media-link"
              >
                <InstagramIcon />
              </a>
            </div>
            <div className="social-media-item   border border-[#EC6A63] p-4 py-2">
              <a
                href="https://www.youtube.com/channel/UCkmEoZbpH7jPCe1_Ym4XJdQ"
                className="social-media-link"
              >
                <YouTubeIcon />
              </a>
            </div>
            <div className="social-media-item border border-[#EC6A63] p-4 py-2">
              <a
                href="https://open.spotify.com/artist/6guC9FqvlVboSKTI77NG2k?si=GtU3HEcaSeu-yHrwJHIbhA&nd=1"
                className="social-media-link"
              >
                <AppleIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-header__right-half">
          <div className="title mb-5">STAY UP TO DATE</div>
          <div className="items-list text-[14px]">
            <EmailSubscriptionInput />
          </div>
        </div>
      </div>
      <div className="footer-middle flex flex-wrap justify-between items-center text-sm mb-14">
        <div className="footer-middle-left-side flex flex-wrap gap-3 text-[17px] font-semibold">
          <div className="font-serif">Dance Gavin Dance</div>
          <div className="separator-square flex items-end p-1">
            <div className="square h-1 w-1 bg-gray-100 opacity-50"></div>
          </div>
          <div className="font-serif">Powered by ExampleHere</div>
          <div className="separator-square flex items-end p-1">
            <div className="square h-1 w-1 bg-gray-100 opacity-50"></div>
          </div>
          <div className="font-serif">Designed by Prodan Septimiu(EdyEgo)</div>
        </div>
        <div className="footer-middle-right-side flex justify-between items-center gap-5">
          <div className="we-accept-money-title ">We accept</div>
          <div className="cards-list flex flex-wrap gap-4">
            <div className="paypal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--fa"
                width="48"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 2304 1536"
              >
                <path
                  fill="currentColor"
                  d="M745 778q0 37-25.5 61.5T657 864q-29 0-46.5-16T593 804q0-37 25-62.5t62-25.5q28 0 46.5 16.5T745 778zm785-149q0 42-22 57t-66 15l-32 1l17-107q2-11 13-11h18q22 0 35 2t25 12.5t12 30.5zm351 149q0 36-25.5 61t-61.5 25q-29 0-47-16t-18-44q0-37 25-62.5t62-25.5q28 0 46.5 16.5T1881 778zM513 607q0-59-38.5-85.5T374 495H214q-19 0-21 19l-65 408q-1 6 3 11t10 5h76q20 0 22-19l18-110q1-8 7-13t15-6.5t17-1.5t19 1t14 1q86 0 135-48.5T513 607zm309 312l41-261q1-6-3-11t-10-5h-76q-14 0-17 33q-27-40-95-40q-72 0-122.5 54T489 816q0 59 34.5 94t92.5 35q28 0 58-12t48-32q-4 12-4 21q0 16 13 16h69q19 0 22-19zm447-263q0-5-4-9.5t-9-4.5h-77q-11 0-18 10l-106 156l-44-150q-5-16-22-16h-75q-5 0-9 4.5t-4 9.5q0 2 19.5 59t42 123t23.5 70q-82 112-82 120q0 13 13 13h77q11 0 18-10l255-368q2-2 2-7zm380-49q0-59-38.5-85.5T1510 495h-159q-20 0-22 19l-65 408q-1 6 3 11t10 5h82q12 0 16-13l18-116q1-8 7-13t15-6.5t17-1.5t19 1t14 1q86 0 135-48.5t49-134.5zm309 312l41-261q1-6-3-11t-10-5h-76q-14 0-17 33q-26-40-95-40q-72 0-122.5 54T1625 816q0 59 34.5 94t92.5 35q29 0 59-12t47-32q0 1-2 9t-2 12q0 16 13 16h69q19 0 22-19zm218-409v-1q0-14-13-14h-74q-11 0-13 11l-65 416l-1 2q0 5 4 9.5t10 4.5h66q19 0 21-19zM392 644q-5 35-26 46t-60 11l-33 1l17-107q2-11 13-11h19q40 0 58 11.5t12 48.5zm1912-516v1280q0 52-38 90t-90 38H128q-52 0-90-38t-38-90V128q0-52 38-90t90-38h2048q52 0 90 38t38 90z"
                ></path>
              </svg>
            </div>
            <div className="amex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--logos"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 256 256"
              >
                <defs>
                  <radialGradient
                    id="IconifyId181d372b5eabfbac322"
                    cx="16.609%"
                    cy="17.372%"
                    r="118.52%"
                    fx="16.609%"
                    fy="17.372%"
                  >
                    <stop offset="0%" stop-color="#88CDE7"></stop>
                    <stop offset="100%" stop-color="#2274AD"></stop>
                  </radialGradient>
                  <path
                    id="IconifyId181d372b5eabfbac323"
                    d="M0 0h254.694v160.344c.633.855 1.068 1.814 1.306 3.052v4.968c-.238 1.244-.673 2.327-1.306 3.24V256H0V0Z"
                  ></path>
                </defs>
                <g fill="none" fill-rule="evenodd">
                  <mask id="IconifyId181d372b5eabfbac324" fill="#fff">
                    <use href="#IconifyId181d372b5eabfbac323"></use>
                  </mask>
                  <path
                    fill="url(#IconifyId181d372b5eabfbac322)"
                    d="M0 256h256V0H0z"
                    mask="url(#IconifyId181d372b5eabfbac324)"
                  ></path>
                  <path
                    fill="#FFF"
                    d="m22.937 110.958l-4.899-11.895l-4.869 11.895h9.768Zm107.794-4.72c-.968.55-2.132.61-3.534.61h-8.69v-6.643h8.805c1.257 0 2.562.047 3.41.508c.913.456 1.493 1.381 1.493 2.652c0 1.317-.563 2.344-1.484 2.873Zm61.946 4.72l-4.928-11.895l-4.899 11.895h9.827Zm-115.472 12.9h-7.329l-.043-23.392l-10.355 23.392h-6.276l-10.41-23.444v23.444H28.248l-2.737-6.667H10.62l-2.763 6.667H.085l12.786-29.907h10.637l12.155 28.334V93.951h11.686l9.345 20.306l8.603-20.306h11.908v29.907Zm29.2 0H82.52V93.951h23.883v6.254H89.688v5.368h16.307v6.148l-16.307-.026v5.973h16.716v6.19Zm33.684-21.828c0 4.728-3.18 7.227-5.022 7.964c1.56.601 2.886 1.633 3.508 2.528c1.01 1.458 1.211 2.823 1.211 5.453v5.883h-7.213l-.022-3.76c0-1.778.17-4.37-1.16-5.802c-1.044-1.07-2.617-1.292-5.2-1.292h-7.683v10.854h-7.145V93.951h16.46c3.633 0 6.336.12 8.655 1.45c2.264 1.321 3.611 3.278 3.611 6.63Zm4.157 21.828h7.294V93.947h-7.294v29.911Zm91.921 0h-10.142l-13.557-22.425l.025 22.425H197.93l-2.789-6.667h-14.87l-2.673 6.667h-8.37c-3.487 0-7.895-.775-10.363-3.295c-2.541-2.554-3.825-5.977-3.825-11.43c0-4.434.78-8.484 3.85-11.686c2.315-2.387 5.926-3.496 10.859-3.496h6.91v6.404h-6.757c-2.613 0-4.1.4-5.525 1.786c-1.202 1.262-2.055 3.64-2.055 6.783c0 3.21.64 5.495 1.987 7.026c1.074 1.172 3.082 1.526 4.971 1.526h3.215l10.074-23.525h10.71l12.111 28.292V93.95h10.902l12.564 20.827V93.95h7.311v29.907ZM0 129.75h12.219l2.754-6.667h6.165l2.745 6.667h24.045v-5.09l2.15 5.107h12.46l2.141-5.171v5.154h59.746l-.03-10.91h1.156c.814.018 1.057.111 1.057 1.454v9.456h30.88v-2.536c2.494 1.338 6.378 2.536 11.46 2.536h13.007l2.775-6.667h6.174l2.75 6.667h25.025v-6.322l3.799 6.322h20.042V88.025h-19.842v4.941l-2.77-4.94H199.51v4.94l-2.55-4.94h-27.53c-4.613 0-8.676.634-11.941 2.433v-2.434h-18.976v2.434c-2.11-1.85-4.946-2.434-8.088-2.434H61.013l-4.677 10.79l-4.758-10.79H29.72v4.941l-2.426-4.94H8.654L0 107.845v21.904Zm254.705 22.07h-13.054c-1.3 0-2.166.051-2.865.533c-.75.477-1.066 1.224-1.066 2.174c0 1.109.64 1.876 1.59 2.209c.717.264 1.548.332 2.767.35l3.829.097c3.905.111 6.536.776 8.134 2.4c.269.24.46.525.665.755v-8.518Zm0 19.726c-1.756 2.55-5.137 3.833-9.724 3.833h-13.814v-6.429h13.771c1.343 0 2.307-.183 2.9-.742c.48-.439.848-1.117.848-1.94c0-.882-.367-1.581-.866-1.982c-.558-.473-1.296-.665-2.532-.682c-6.71-.209-15.088.209-15.088-9.252c0-4.335 2.767-8.901 10.245-8.901h14.26v-5.952H241.46c-3.999 0-6.894.946-8.961 2.456v-2.456h-19.582c-3.1 0-6.77.78-8.535 2.456l.026-2.456h-34.964v2.456c-2.784-2.008-7.465-2.456-9.66-2.456h-23.027v2.456c-2.213-2.14-7.081-2.456-10.079-2.456h-25.81l-5.896 6.412l-5.53-6.412H50.888v41.75h37.833l6.088-6.488l5.734 6.489l23.286.017v-9.819h2.307c3.074.043 6.749-.068 9.963-1.458v11.26h19.224v-10.884h.925c1.185 0 1.304.068 1.304 1.24v9.644h58.417c3.683 0 7.554-.95 9.72-2.656v2.656h18.533c3.858 0 7.606-.533 10.483-1.91v-7.794Zm-28.534-11.962c1.398 1.45 2.14 3.278 2.14 6.343c0 6.455-4.029 9.452-11.225 9.452H203.14v-6.429h13.882c1.373 0 2.323-.183 2.946-.742a2.63 2.63 0 0 0 .823-1.94c0-.882-.384-1.581-.874-1.982c-.55-.473-1.297-.665-2.537-.682c-6.706-.209-15.058.209-15.058-9.252c0-4.335 2.724-8.901 10.193-8.901h14.355v6.369h-13.097c-1.317 0-2.174.051-2.89.533c-.776.477-1.066 1.224-1.066 2.174c0 1.109.665 1.876 1.573 2.209c.733.264 1.526.332 2.758.35l3.854.097c3.906.111 6.545.776 8.169 2.4Zm-64.526-1.834c-.938.55-2.136.606-3.513.606h-8.693v-6.702h8.808c1.262 0 2.558.025 3.398.516c.93.503 1.484 1.424 1.484 2.715c0 1.267-.554 2.298-1.484 2.865Zm4.323 3.722c1.59.576 2.89 1.633 3.5 2.507c1.007 1.467 1.173 2.83 1.181 5.461v5.94h-7.162v-3.74c0-1.816.175-4.472-1.164-5.853c-1.032-1.1-2.63-1.343-5.231-1.343h-7.653v10.935h-7.175v-29.928h16.495c3.632 0 6.271.149 8.612 1.415c2.255 1.352 3.654 3.249 3.654 6.655c0 4.754-3.172 7.192-5.057 7.951Zm9.034-16.021h23.875v6.203h-16.75v5.414h16.332v6.11h-16.333v5.947l16.751.034v6.22h-23.875v-29.928Zm-48.227 13.8h-9.26v-7.597h9.337c2.58 0 4.366 1.027 4.366 3.666c0 2.58-1.701 3.931-4.443 3.931Zm-16.38 13.412L99.44 160.475l10.957-11.81v23.998Zm-28.342-3.538H64.475v-5.947H80.17v-6.11H64.475v-5.414h17.923l7.807 8.701l-8.152 8.77Zm56.835-13.805c0 8.284-6.182 10.015-12.45 10.015h-8.923v10.044h-13.877l-8.808-9.9l-9.149 9.9H57.368v-29.928H86.12l8.796 9.801l9.089-9.801h22.847c5.679 0 12.036 1.564 12.036 9.87Z"
                  ></path>
                  <path
                    fill="#2F9BCA"
                    d="M140.089 102.034c0 4.733-3.176 7.223-5.014 7.96c1.56.601 2.887 1.641 3.509 2.528c1.01 1.467 1.207 2.823 1.207 5.462v5.874h-7.21l-.03-3.756c0-1.782.18-4.374-1.155-5.806c-1.049-1.07-2.613-1.292-5.206-1.292h-7.674v10.854h-7.153V93.951h16.469c3.624 0 6.33.12 8.646 1.45c2.272 1.321 3.611 3.278 3.611 6.633"
                  ></path>
                  <path
                    fill="#2EA3D0"
                    d="M106.413 123.858H82.521V93.947h23.892v6.258H89.688v5.368h16.307v6.148l-16.307-.017v5.973h16.725"
                  ></path>
                  <path
                    fill="#55B2D8"
                    d="M77.205 123.858h-7.329l-.043-23.392l-10.347 23.392h-6.275l-10.42-23.435v23.435H28.253l-2.741-6.663H10.62l-2.754 6.663H.09l12.785-29.911h10.633l12.155 28.343V93.947h11.69l9.349 20.319l8.595-20.319h11.908"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M130.74 106.238c-.973.559-2.136.61-3.53.61h-8.694v-6.643h8.804c1.258 0 2.558.047 3.402.516c.921.448 1.497 1.373 1.497 2.648c0 1.313-.559 2.349-1.48 2.87m-107.798 4.719l-4.903-11.895l-4.869 11.895"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="mastercard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--logos"
                width="41.17"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 256 199"
              >
                <path d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342c-2.634 0-5.488.878-7.464 3.732c-1.536-2.415-3.731-3.732-7.024-3.732c-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488c3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488c3.074 0 4.61 1.976 4.61 5.488v11.635h5.05Zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683c1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098c-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463v-4.17Zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488c.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22Zm-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195c-5.268 0-8.78 2.634-8.78 6.805c0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195c0 1.536-1.756 2.634-4.83 2.634c-3.073 0-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634c6.147 0 9.66-2.853 9.66-6.805c0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975c0-1.537 1.536-2.415 3.951-2.415c2.635 0 5.269 1.097 6.586 1.756l1.976-3.732Zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488c.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22Zm-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976c3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975c-3.732 0-6.366-2.634-6.366-6.805c0-3.951 2.634-6.586 6.366-6.805c1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415c-6.806 0-11.196 4.61-11.196 10.976Zm42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976c0 6.366 4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61v-10.537Zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805Zm-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976c0 6.586 4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195c-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196Zm0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05 5.708-5.05Zm114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976c0 6.366 4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61v-10.537Zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805c3.732 0 6.366 2.854 6.366 6.805c0 3.732-2.634 6.805-6.366 6.805c-3.952-.22-6.366-3.073-6.366-6.805Zm-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976c0 6.366 4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61v-10.537Zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805Z"></path>
                <path
                  fill="#FF5F00"
                  d="M93.298 16.903h69.15v124.251h-69.15z"
                ></path>
                <path
                  fill="#EB001B"
                  d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0C35.343 0 0 35.343 0 79.029c0 43.685 35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904c-18.22-14.269-30.074-36.88-30.074-62.125Z"
                ></path>
                <path
                  fill="#F79E1B"
                  d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029c-18.44 0-35.343-6.366-48.734-16.904c18.44-14.488 30.075-36.88 30.075-62.125c0-25.245-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029Z"
                ></path>
              </svg>
            </div>
            <div className="visa">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--fontisto"
                width="48"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 36 24"
              >
                <path
                  fill="currentColor"
                  d="M33.6 24H2.4A2.4 2.4 0 0 1 0 21.6V2.4A2.4 2.4 0 0 1 2.4 0h31.2A2.4 2.4 0 0 1 36 2.4v19.2a2.4 2.4 0 0 1-2.4 2.4zm-15.76-9.238l-.359 2.25a6.84 6.84 0 0 0 2.903.531h-.011a5.167 5.167 0 0 0 3.275-.933l-.017.011a3.085 3.085 0 0 0 1.258-2.485v-.015v.001c0-1.1-.736-2.014-2.187-2.72a7.653 7.653 0 0 1-1.132-.672l.023.016a.754.754 0 0 1-.343-.592v-.002a.736.736 0 0 1 .379-.6l.004-.002a1.954 1.954 0 0 1 1.108-.257h-.006h.08l.077-.001c.644 0 1.255.139 1.806.388l-.028-.011l.234.125l.359-2.171a6.239 6.239 0 0 0-2.277-.422h-.049h.003a5.067 5.067 0 0 0-3.157.932l.016-.011a2.922 2.922 0 0 0-1.237 2.386v.005c-.01 1.058.752 1.972 2.266 2.72c.4.175.745.389 1.054.646l-.007-.006a.835.835 0 0 1 .297.608v.004c0 .319-.19.593-.464.716l-.005.002c-.3.158-.656.25-1.034.25h-.046h.002h-.075c-.857 0-1.669-.19-2.397-.53l.035.015l-.343-.172zm10.125 1.141h3.315q.08.343.313 1.5H34L31.906 7.372h-2a1.334 1.334 0 0 0-1.357.835l-.003.009l-3.84 9.187h2.72l.546-1.499zM14.891 7.372l-1.626 10.031h2.594l1.625-10.031zM4.922 9.419l2.11 7.968h2.734l4.075-10.015h-2.746l-2.534 6.844l-.266-1.391l-.904-4.609a1.042 1.042 0 0 0-1.177-.844l.006-.001H2.033l-.031.203c3.224.819 5.342 2.586 6.296 5.25A5.74 5.74 0 0 0 6.972 10.8l-.001-.001a6.103 6.103 0 0 0-2.007-1.368l-.04-.015zm25.937 4.421h-2.16q.219-.578 1.032-2.8l.046-.141l.16-.406c.066-.166.11-.302.14-.406l.188.859l.593 2.89z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-footer">
        <div className="footer-message  mb-2  font-serif">
          I am committed to keeping this site accessible to everyone.Feedback is
          welcome for new ways to improve this site's accessibility. If you are
          having issues navigating the site, please contact me at:
          prodan.septimiu@gmail.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
