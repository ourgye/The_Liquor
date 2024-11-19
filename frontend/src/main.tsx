import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { lazy } from "react";

import { getLiquor, searchLiquor } from "./services/liquor.ts";
import { getLiquorBrand } from "./services/brand.ts";
import { store } from "@/store.ts";
import { Provider } from "react-redux";

// code spliting
import AdminOutlet from "./pages/admin/AdminOutlet.tsx";
// ======================== Admin Pages ========================
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminMain = lazy(() => import("./pages/admin/AdminMain.tsx"));
const AdminSearch = lazy(() => import("./pages/admin/AdminSearch.tsx"));
//  create pages
const CreateLiquor = lazy(() => import("./pages/admin/CreateLiquor.tsx"));
const CreateBrand = lazy(() => import("./pages/admin/CreateBrand.tsx"));
const CreateProducer = lazy(() => import("./pages/admin/CreateProducer.tsx"));
const CreateCardnews = lazy(() => import("./pages/admin/CreateCardnews.tsx"));

// ======================== User Pages ========================
const SearchMain = lazy(() => import("./pages/user/MainSearch.tsx"));
const SearchResult = lazy(() => import("./pages/user/SearchResult.tsx"));
const LiqourDetail = lazy(() => import("./pages/user/LiqourDetail.tsx"));
const CardnewsMain = lazy(() => import("./pages/user/CardNewsMain.tsx"));
const CardnewsDetail = lazy(() => import("./pages/user/CardNewsDetail.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: <AdminOutlet />,
        children: [
          { path: "login", element: <AdminLogin />, index: true },
          {
            path: "config",
            element: <AdminMain />,
            children: [
              {
                path: "liquor",
                index: true,
                element: <AdminSearch searchType="liquor" />,
              },
              {
                path: "brand",
                element: <AdminSearch searchType="brand" />,
              },
              {
                path: "producer",
                element: <AdminSearch searchType="producer" />,
              },
              {
                path: "cardnews",
                element: <AdminSearch searchType="cardnews" />,
              },
            ],
          },
          {
            path: "createliquor",
            element: <CreateLiquor />,
          },
          {
            path: "createbrand",
            element: <CreateBrand />,
          },
          {
            path: "createproducer",
            element: <CreateProducer />,
          },
          {
            path: "createcardnews",
            element: <CreateCardnews />,
          },
        ],
      },
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/liquor/:idx",
        id: "liquor",
        loader: async ({ request, params }) => {
          // const {liquorId, brandId} = location.state;
          const liquor = await getLiquor({ id: params.idx });
          const brand = await getLiquorBrand({ id: liquor.data.id }); // 브랜드 값으로 변경해야함

          return {
            liquor: liquor.data,
            brand: brand.data,
          };
        },
        element: <LiqourDetail />,
      },
      {
        path: "/cardnews",
        element: <CardnewsMain />,
      },
      {
        path: "/cardnews/:idx",
        element: <CardnewsDetail />,
      },
    ],
  },
  {
    path: "/",
    index: true,
    element: <SearchMain />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
