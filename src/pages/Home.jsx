
import "./Home.scss";
import NewsList from "../components/NewsList";

const Home = () => {
  return (
    <div className="home">
      <div className="home__intro"></div>
      <div className="wrapper">
        <NewsList />  
      </div>
    </div>
  );
};

export default Home;
