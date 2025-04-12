import './App.css';
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Home from "./home/Home"
import Stage1 from "./interview/Select/Stage1"
import Stage2 from './interview/Select/Stage2';
import Stage3 from './interview/Select/Stage3';
import QuestionCount from './interview/QuestionCount/QuestionCount';
import Tutorial from './interview/Tutorial/Tutorial';
import Question from './interview/Question/Question';
import Answer from './interview/Answer/Answer';
import Feedback from './interview/Feedback/Feedback';
import Result from './interview/Result/Result';
import Mypage from './mypage/Mypage';
import KakaoRedirectPage from './kakao/KakaoRedirect';
import Loading from './loading/Loading';
import Community from './community/Community';
import PostDetail from './community/PostDetail';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/home" />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/kakao/redirect",
      element: <KakaoRedirectPage />,
    },
    {
      path: "/interview/stage1",
      element: <Stage1 />,
    },
    {
      path: "/interview/stage2",
      element: <Stage2 />,
    },
    {
      path: "/interview/stage3",
      element: <Stage3 />,
    },
    {
      path: "/questioncount",
      element: <QuestionCount />,
    },
    {
      path: "/tutorial",
      element: <Tutorial />,
    },
    {
      path: "/question",
      element: <Question />,
    },
    {
      path: "/answer",
      element: <Answer />,
    },
    {
      path: "/feedback",
      element: <Feedback />,
    },
    {
      path: "/result",
      element: <Result />,
    },
    {
      path: "/mypage",
      element: <Mypage />,
    },
    {
      path: "/loading",
      element: <Loading />,
    },
    {
      path: "/community",
      element: <Community />,
    },
    {
      path: "/post",
      element: <PostDetail />,
    },
    // 모든 경로가 잘못된 경우 /home으로 리디렉션
    {
      path: "*",
      element: <Navigate to="/home" />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
      v7_fetcherPersist: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
