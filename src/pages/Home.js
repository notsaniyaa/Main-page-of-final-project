import { useEffect } from "react";
import { auth } from "../firebase";
import useUserRole from "../hooks/useUserRole";
import HomeGridVirtualized from "../components/HomeGridVirtualized";

function Home() {
  const { role } = useUserRole();

  useEffect(() => {
    const user = auth.currentUser;
    console.log("Current user:", user);
    console.log("User role:", role);
  }, [role]);

  return (
    <div>
      <HomeGridVirtualized disableVirtualization={false} />
    </div>
  );
}

export default Home;
