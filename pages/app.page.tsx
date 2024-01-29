import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // This code will run on the client side after the initial render
    router.push("/");
  }, []); // The empty dependency array ensures that this effect runs only once

  return "";
};

export default Home;