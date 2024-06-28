import ProtectedRoutes from "./ui/ProtectedRoutes";
import { useAuth } from "./context/Auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
// pages
import Login from "./pages/shared/LogIn";
import SignUp from "./pages/shared/SignUp";
import NotFound from "./ui/NotFound";
import HandymanProfile from "./features/handyman/Profile/HandymanProfile";
import Search from "./pages/client/Search";
import Favorites from "./pages/client/Favorites";
import FavoriteList from "./pages/client/FavoriteList";
import Settings from "./features/shared/settings/Settings";
import AccountSettings from "./features/shared/settings/Account";
import UpdatePassword from "./features/shared/settings/UpdatePassword";
import UpdateWorkLocations from "./features/shared/settings/UpdateWorkLocations";
import UpdateContacts from "./features/shared/settings/UpdateContacts";
import { Portfolio } from "./features/handyman/Profile/portfolio/Portfolio";
import HandymanHome from "./features/handyman/Home/HandymanHome";
import { WorkHistory } from "./features/handyman/Profile/workHistory/WorkHistory";
import ClientProfile from "./features/client/profile/ClientProfile";
import NewJobs from "./features/handyman/newJobs/NewJobs";
import NewJob from "./features/handyman/newJobs/NewJob";
import PendedJobs from "./features/handyman/pendedJobs/PendedJobs";
import PendedJob from "./features/handyman/pendedJobs/PendedJob";
import JobOfferWizard from "./features/client/AddJobOffer/JobOfferWizard";
import JobOfferReplies from "./features/client/jobOffers/jobOfferReplies";
import JobOffer from "./features/client/jobOffers/jobOffer";
import ActiveJob from "./features/handyman/activeJobs/ActiveJob";
import ActiveJobs from "./features/handyman/activeJobs/ActiveJobs";
import DoneJobs from "./features/handyman/doneJobs/DoneJobs";
import DoneJob from "./features/handyman/doneJobs/DoneJob";
import useGetAllCrafts from "./features/shared/crafts/useGetAllCrafts";
import JobOffers from "./features/client/jobOffers/JobOffers";
import PublicHome from "./pages/shared/PublicHome";
import ClientHome from "./pages/client/ClientHome";
import ClientActiveJobs from "./features/client/ActiveJobs/ClietnActiveJobs";
import ClientActiveJob from "./features/client/ActiveJobs/ClientActiveJob";
import ClientRating from "./features/client/Rating/ClientRating";
import ForgetPasswordPage from "./pages/shared/ForgetPasswordPage";
import ForgotPasswordEmailForm from "./features/shared/Authentication/ForgotPasswordEmailForm";
import ForgotPasswordNewPasswordForm from "./features/shared/Authentication/ForgotPasswordNewPasswordForm";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import NotificationIcon from "./icons/NotificationIcon";
const pusherApiKey = "a152a3c731c935589cac";
function App() {
  const { crafts } = useGetAllCrafts();
  const { role, isAuth, id } = useAuth();
  useEffect(() => {
    if (!id || !role) return;
    Pusher.logToConsole = true;
    var pusher = new Pusher(pusherApiKey, {
      cluster: "ap1",
    });
    const channelName = `${id}${role == "client" ? "Client" : role == "handyman" ? "Craftsman" : ""}Notify`;
    var channel = pusher.subscribe(channelName);
    channel.bind(channelName, function (data) {
      toast.success(JSON.stringify(data), {
        icon: <NotificationIcon />,
      });
    });
  }, [id, role]);
  const publicRoutes = (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgetPasswordPage />}>
        <Route index element={<ForgotPasswordEmailForm />} />
        <Route
          path="reset-password"
          element={<ForgotPasswordNewPasswordForm />}
        />
      </Route>
    </>
  );
  const ClientRoutes = (
    <>
      <Route
        path="client/*"
        element={<ProtectedRoutes allowedRole={["client"]} />}
      >
        <Route index element={<ClientHome />} />
        <Route path="home" element={<ClientHome />} />
        <Route path="search" element={<Search />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="favorites/:listId" element={<FavoriteList />} />
        <Route path={`client/:id/settings`} element={<Settings />}>
          <Route index element={<Navigate to={"update-account"} replace />} />
          <Route path="update-account" element={<AccountSettings />} />
          <Route path="update-password" element={<UpdatePassword />} />
        </Route>
        <Route path="job-offer">
          <Route path="add" element={<JobOfferWizard />} />
          <Route path=":id" element={<JobOffer />} />
          <Route path=":id/replies" element={<JobOfferReplies />} />
        </Route>
        <Route path="job-offers" element={<JobOffers />} />
        <Route path="jobs">
          <Route path="active" element={<ClientActiveJobs />} />
        </Route>
        <Route path="job">
          <Route path="active/:id" element={<ClientActiveJob />} />
        </Route>
      </Route>
    </>
  );
  const handymanRoutes = (
    <>
      <Route
        path="handyman/*"
        element={<ProtectedRoutes allowedRole={["handyman"]} />}
      >
        <Route index element={<Navigate to={"home"} replace />} />
        <Route path="home" element={<HandymanHome />} />
        <Route path="jobs">
          <Route path="new" element={<NewJobs />} />
          <Route path="pended" element={<PendedJobs />} />
          <Route path="active" element={<ActiveJobs />} />
          <Route path="done" element={<DoneJobs />} />
        </Route>
        <Route path="job">
          <Route path="new/:id" element={<NewJob />} />
          <Route path="pended/:id" element={<PendedJob />} />
          <Route path="active/:id" element={<ActiveJob />} />
          <Route path="done/:id" element={<DoneJob />} />
        </Route>
      </Route>
    </>
  );
  const sharedRoutes = (
    <Route element={<ProtectedRoutes allowedRole={["client", "handyman"]} />}>
      <Route path="handyman/:id" element={<HandymanProfile />}>
        <Route index element={<Navigate to="portfolio" replace />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="work_history" element={<WorkHistory />} />
      </Route>
      <Route path="client/:id" element={<ClientProfile />}>
        <Route index element={<Navigate to="update-account" replace />} />
        <Route path="update-account" element={<AccountSettings />} />
        <Route path="update-password" element={<UpdatePassword />} />
      </Route>
      <Route path="settings" element={<Settings />}>
        <Route index element={<Navigate to="update-account" replace />} />
        <Route path="update-account" element={<AccountSettings />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="update-work-locations" element={<UpdateWorkLocations />} />
        <Route path="update-contacts" element={<UpdateContacts />} />
      </Route>
      <Route path="client/rating/:id" element={<ClientRating />} />
    </Route>
  );
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
        <Route
          index
          element={isAuth ? <Navigate to={`/${role}`} /> : <PublicHome />}
        />
        <Route element={<AppLayout />}>
          {ClientRoutes}
          {handymanRoutes}
          {sharedRoutes}
          <Route path="home" element={<ClientHome />}></Route>
        </Route>
        <Route
          path="*"
          element={
            <div className="h-screen">
              <NotFound message={"هذه الصفحه ليست موجوده"} />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
