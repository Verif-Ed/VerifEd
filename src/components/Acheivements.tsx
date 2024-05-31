import alien from "../../public/Alien Face.svg";
const Acheivements = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Acheivements</h2>
        <div className="w-10 h-10">
          <img src={alien} alt="Your SVG description" />
        </div>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">More badges are coming</button>
        </div>
      </div>
    </div>
  );
};

export default Acheivements;
