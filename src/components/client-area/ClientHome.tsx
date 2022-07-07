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
    </div>
  );
};

export default ClientHome;
