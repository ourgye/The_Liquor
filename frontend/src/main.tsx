import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { store } from "@/store.ts";
import { Provider } from "react-redux";

// code spliting
import AdminOutlet from "./pages/admin/AdminOutlet.tsx";
import AdminMain from "./pages/admin/search/main/AdminMain.tsx";
import { LiquorDetailBrandResponse, LiquorDetailResponse } from "./types";

// ======================== Admin Pages ========================
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminSearch = lazy(
  () => import("./pages/admin/search/result/AdminSearch.tsx")
);
//  create pages
const CreateLiquor = lazy(() => import("./pages/admin/create/liquor"));
const CreateBrand = lazy(() => import("./pages/admin/create/brand"));
const CreateProducer = lazy(() => import("./pages/admin/create/producer"));
const CreateCardnews = lazy(() => import("./pages/admin/create/cardnews"));

// ======================== User Pages ========================
const SearchMain = lazy(() => import("./pages/user"));
const SearchResult = lazy(() => import("./pages/user/liquor/SearchResult.tsx"));
const LiqourDetail = lazy(() => import("./pages/user/liquor/LiqourDetail.tsx"));
const CardnewsMain = lazy(
  () => import("./pages/user/cardnews/CardNewsMain.tsx")
);
const CardnewsDetail = lazy(
  () => import("./pages/user/cardnews/CardNewsDetail.tsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <AdminLogin /> },
      {
        path: "admin",
        element: <AdminOutlet />,
        children: [
          {
            element: <AdminMain />,
            children: [
              {
                path: "search/liquor",
                element: <AdminSearch searchType="liquor" />,
              },
              {
                path: "search/brand",
                element: <AdminSearch searchType="brand" />,
              },
              {
                path: "search/producer",
                element: <AdminSearch searchType="producer" />,
              },
              {
                path: "search/cardnews",
                element: <AdminSearch searchType="cardnews" />,
              },
              {
                index,
                element: <Navigate to={"search/liquor"} />,
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
        index: true,
        element: <SearchMain />,
      },
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/liquor/:idx",
        id: "liquor",
        loader: async ({ request, params }) => {
          // const liquor = await getLiquor(params.idx);
          // const brand = await getLiquorBrand(request.brandId); // 브랜드 값으로 변경해야함
          const liquor: LiquorDetailResponse = {
            id: "1",
            producer: "Chateau de Bordeaux",
            brand: "Bordeaux Red",
            classifications: "Red Wine",
            korean_name: "보르도 레드 와인",
            english_name: "Bordeaux Red Wine",
            count: "100",
            alcohol: 13.5,
            aged: "2 years",
            price: 45000,
            ibu: 10,
            is_domestic_sale: true,
            description:
              "A classic red wine from the Bordeaux region, aged for two years for a smooth, rich flavor.",
            updated_at: "2024-10-15T12:30:00Z",
            adv: "Enjoy with red meats or soft cheeses.",
            image_path: "https://picsum.photos/1000/1000",
          };
          const brand: LiquorDetailBrandResponse = {
            id: "2",
            name: "Chateau de Bordeaux",
            classification_name: "Wine",
            image_path: "https://picsum.photos/300/200",
          };
          return {
            liquor: liquor,
            brand: brand,
            // liquor: liquor.data,
            // brand: brand.data,
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
