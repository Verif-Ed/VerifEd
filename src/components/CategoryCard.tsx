import { Link } from "react-router-dom";
import suiIntro from "../../public/sui intro.webp";
import moveIntro from "../../public/intro_move.webp";
const CategoryCard = () => {
  return (
    <div className="card w-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title"> Featured Categories</h2>
        <div className="ui-card-default py-1  category-grid shadow-md flex items-end justify-end">
          <Link to={`/quiz/sui`}>
            <div className="flex relative ">
              <img
                className="w-full "
                src={suiIntro}
                alt={"dummy"}
                loading="lazy"
                height={230}
                // width={430}
              />

              <div className="absolute right-3 top-2 text-white p-1  ">
                <span>{"20"} MCQs</span>
              </div>
            </div>
          </Link>
          <Link to={`/quiz/move`}>
            <div className="flex relative ">
              <img
                className="w-full "
                src={moveIntro}
                alt={"dummy"}
                loading="lazy"
                height={230}
                // width={430}
              />

              <div className="absolute right-3 top-2 text-white p-1  ">
                <span>{"20"} MCQs</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
