import '../styles/home.css';
import '../styles/app.css';
import Booking from "../components/Booking";
import Navigation from '../components/Navigation';

function Home() {
  return (
    <>
      <Navigation />
      <div className="Home view">
        <Booking/>
      </div>
    </>
  );
}

export default Home;
