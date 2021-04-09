import React, {Suspense, lazy} from "react";
import { Switch, Route } from "react-router-dom";
import * as ROUTEPATHS from "./RoutePaths";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
// lazy loading
const Home = lazy(() => import("../Pages/Home/Home"));
const Footer = lazy(() => import("../Components/Footer/Footer"));
const AuthPage = lazy(() =>  import("../Pages/AuthPage/AuthPage"));
const ContentList = lazy(() => import("../Pages/Browse/List/List"));
const Profiles = lazy(() => import("../Pages/Profiles/Profiles"));
const WatchNFavs = lazy(() =>  import("../Pages/WatchNFavs/WatchNFavs"));
// ----------  //

const Routes = () => {
    return (
        <Switch>
            <Suspense fallback={ <LoadingScreen />}>
                <Route exact path={ROUTEPATHS.HOME}>
                    <Home />
                    <Footer />
                </Route>
                <Route path={ROUTEPATHS.AUTH}>
                    <AuthPage />
                </Route>
                <Route exact path={ROUTEPATHS.BROWSE}>
                   <ContentList />
                </Route>
                <Route exact path={ROUTEPATHS.PROFILES}>
                    <Profiles />
                </Route>
                <Route exact name="watch list and favorites" path={`${ROUTEPATHS.WATCHNFAVS}/:type`}>
                    <WatchNFavs />
                    <Footer />
                </Route>
            </Suspense>
        </Switch>
    )
}
export default Routes;