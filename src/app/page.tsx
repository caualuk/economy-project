import SideBar from "@/src/components/SideBar/SideBar";
import MainContainer from "@/src/components/MainContainer/MainContainer";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <MainContainer />
    </div>
  );
}
