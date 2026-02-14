import { useEffect } from "react";
import DI from "../../../di/DiModule";
import { useDashboardStore } from "./DashboardStore";

const DashboardPage = () => {
  const { actions } = DI.resolve("DashboardController");
  const { message, isLoading, error } = useDashboardStore();

  useEffect(() => {
    actions.loadMessage();
  }, []);

  if (isLoading) {
    return (
      <div className="main-container">
        <div className="content-layout">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-container">
        <div className="content-layout">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="content-layout">
        <h1>{message}</h1>
        <p>This is a dummy screen. Replace with real admin features.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
