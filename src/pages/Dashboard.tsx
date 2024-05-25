import CategoryCard from "../components/CategoryCard";
import UserProfile from "../components/UserProfile";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex justify-center items-center mt-9">
        <div className="w-4/5">
          <UserProfile />
        </div>
      </div>
      <div className="flex justify-around mt-6">
        <div>
          <CategoryCard />
        </div>
        <div>
          <CategoryCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
