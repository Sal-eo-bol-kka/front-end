import { createBrowserRouter } from "react-router";
import AppShell from "./components/AppShell";
import RequireAuth from "./auth/RequireAuth";
import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import SimulationInput from "./pages/SimulationInput";
import ComparisonResult from "./pages/ComparisonResult";
import NeighborhoodRecommendation from "./pages/NeighborhoodRecommendation";
import SupportPolicyMatching from "./pages/SupportPolicyMatching";
import JobInsight from "./pages/JobInsight";
import AIAssistant from "./pages/AIAssistant";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    element: <AuthPage mode="login" />,
  },
  {
    path: "/signup",
    element: <AuthPage mode="signup" />,
  },
  {
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      {
        path: "/simulation",
        Component: SimulationInput,
      },
      {
        path: "/result",
        Component: ComparisonResult,
      },
      {
        path: "/neighborhood",
        Component: NeighborhoodRecommendation,
      },
      {
        path: "/policy",
        Component: SupportPolicyMatching,
      },
      {
        path: "/jobs",
        Component: JobInsight,
      },
      {
        path: "/assistant",
        Component: AIAssistant,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
    ],
  },
]);
