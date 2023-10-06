import MainLayout from "../layouts/MainLayout";
import MusicPlayerLayout from "../layouts/MusicPlayerLayout";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import LibraryPage from "../pages/Library";
import Login from "../pages/Login";
import SearchPage from "../pages/Search";

const routes: TRoutes[] = [
    {
        path: '/',
        component: <MainLayout />,
        route: [
            {
                path: 'login',
                component: <Login />,
            },
            {
                path: '/',
                component: <MusicPlayerLayout />,
                route: [
                    {
                        path: '/',
                        component: <Home />, 
                    },
                    {
                        path: 'search',
                        component: <SearchPage />,
                    },
                    {
                        path: 'library',
                        component: <LibraryPage />,
                    },
                ]
            },
        ]
    },
    {
        path: 'auth',
        component: <Auth />,
    },
]

export default routes