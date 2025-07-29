import FollowUs from '../components/home/FollowUs';
import HomeCarousel from '../components/home/HomeCarousel';
import HomeNav from '../components/home/HomeNav';
import Presentation from '../components/home/Presentation';

export default function Home() {
  return (
    <>
      <HomeCarousel />
      <HomeNav />
      <Presentation />
      <FollowUs />
    </>
  );
}
