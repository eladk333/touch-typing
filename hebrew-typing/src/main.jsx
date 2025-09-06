import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles.css';

import RootLayout from "./layout/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import HomeRowLesson from "./pages/HomeRowLesson.jsx";

// tiny helper to show placeholder pages until you build them
const makePlaceholder = (title) => () =>
  <div style={{ padding: 24, fontSize: 18 }}>{`העמוד “${title}” יגיע בקרוב…`}</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,      // renders Sidebar + <Outlet/>
    children: [
      { index: true, element: <Home /> },

      // Lessons
      { path: "lessons/home-row",    element: <HomeRowLesson /> },
      { path: "lessons/top-row",     element: makePlaceholder("שורה עליונה")() },
      { path: "lessons/bottom-row",  element: makePlaceholder("שורה תחתונה")() },
      { path: "lessons/capitals",    element: makePlaceholder("אותיות רישיות")() },
      { path: "lessons/punctuation", element: makePlaceholder("סימני פיסוק")() },
      { path: "lessons/numbers",     element: makePlaceholder("מספרים")() },
      { path: "lessons/symbols",     element: makePlaceholder("סמלים")() },

      // Speed test (placeholder for now)
      { path: "speed-test", element: makePlaceholder("מבחן מהירות")() },

      // 404
      { path: "*", element: <div style={{ padding: 24 }}>העמוד לא נמצא</div> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
