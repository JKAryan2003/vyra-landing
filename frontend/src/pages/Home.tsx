import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
// import BottomBar from "../components/BottomBar";
import SignupForm from "../components/SignUpForm";
import BottomBar from "../components/BottomBar";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <SignupForm />
        <BottomBar />
      </main>

      {/* <BottomBar /> */}
    </div>
  );
}

export default Home;