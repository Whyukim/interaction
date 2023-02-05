import loadable from "@loadable/component";

const BasicLayout = loadable(() => import("../layouts/BasicLayout"));
const Index = loadable(() => import("../pages"));
const Particle = loadable(() => import("../pages/particle"));
const Error404 = loadable(() => import("../pages/errors/Error404"));

export default {
  path: "/",
  element: <BasicLayout />,
  children: [
    { index: true, element: <Index /> },
    { path: "particle", element: <Particle /> },
  ],
  errorElement: <Error404 />,
};
