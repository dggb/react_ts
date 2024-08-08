import Router from "@/routers/router";
import Header from "@/components/Layouts/header";
import React, { useEffect } from "react";

const App: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    console.log(document.domain);
    console.log(token);
  }, []);

  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};

export default App;
