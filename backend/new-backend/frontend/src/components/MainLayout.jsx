import Navbar from "./Navbar";
import Page from "./Page";

function MainLayout({user}) {
  return (
    <>
      <Navbar />
      <Page user={user}/>
    </>
  );
}

export default MainLayout;
