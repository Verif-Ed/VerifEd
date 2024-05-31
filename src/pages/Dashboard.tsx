import Acheivements from "../components/Acheivements";
import CategoryCard from "../components/CategoryCard";
import UserProfile from "../components/UserProfile";

const Dashboard = () => {
  return (
    <div className=" flex h-screen  flex-col mb-8 w">
      <div className="flex justify-center items-center mt-9 h-full">
        <div className="w-4/5">
          <UserProfile />
        </div>
      </div>
      <div className="flex justify-around mt-6">
        <div className="w-[30%] justify-center flex h-[90%] items-center">
          <Acheivements />
        </div>
        <div className="w-[40%]">
          <CategoryCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
