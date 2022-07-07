import { Link } from "react-router-dom";
interface ClientHomeProps {}

const ClientHome: React.FC<ClientHomeProps> = () => {
  return (
    <div className="container-home ">
      <section className="hero-section-contianer text-white flex justify-center items-center ">
        <div className="hero-titles-container text-center flex flex-col gap-7 ">
          <div className="hero-titles__first-title tracking-widest">
            OUT EVERYWHERE
          </div>
          <h1 className="hero-titles__second-second-title text-4xl">
            JACKPOT JUICER
          </h1>
        </div>
      </section>

      <section className="current-album-preorders">
        <div className="current-album-preorders__title">
          JACKPOT JUICER PREORDERS
        </div>
        <div className="current-album-preorders__pruduct-list"></div>
        <div className="current-album-preorders__action-link">
          <div className="button-lik-show-all-merch">SHOP ALL MERCH</div>
        </div>
      </section>
    </div>
  );
};

export default ClientHome;
