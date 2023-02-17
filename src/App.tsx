import "./tailwind.css";
import { useState } from "react";
import MyPage from "./pages/MyPage";
import Review from "./pages/Review";
import Main from "./pages/Main";
import "./tailwind.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import ErrorPage from "./pages/ErrorPage";
// import First from "./components/First";
// import Second from "./pages/Second";
import Total from "./pages/Total"
import MyReview from "./pages/MyReview";
import TotalReview from "./pages/TotalReview";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks/configureStore.hook";
import { fetchMarkets } from "./store/modules/market";
import { firestore } from "./api/firebase";
import { setData } from "./store/modules/review";
import EditReview from "./pages/EditReview";

function App() {
  // const dispatch = useAppDispatch();
  // const dispatchFun = async () => {
  //   try {
  //     const markets = await dispatch(fetchMarkets()).unwrap();
  //     console.log(markets);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   dispatchFun();
  // }, []);

  const dispatch = useAppDispatch()

  const [getReviews, setGetReviews] = useState<Array<any>>()

  useEffect(() => {
      const reviewList = firestore.collection("review")
      const totalData : any = [];
      reviewList.get().then((docs) => {
          docs.forEach((doc) => {
              if(doc.exists) {
                  totalData.push(doc.data())
              }
          })
          totalData !== getReviews 
              ? setGetReviews(totalData)
              : null
      })
  }, [])

  useEffect(() => {
    getReviews !== undefined 
        ? dispatch(setData(getReviews)) 
        : null
  }, getReviews)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/review" element={<Review />}></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/detail" element={<Detail />}></Route>
          <Route path="/errorPage" element={<ErrorPage />}></Route>
          <Route path="/review/my" element={<MyReview />}></Route>
          <Route path="/second" element={<Second />}></Route>
          <Route path="/total" element={<Total />}></Route>
          <Route path="/review/:title" element={<Review />}></Route>
          <Route path="review/total" element={<TotalReview />}></Route>
          <Route path="review/edit/:title" element={<EditReview />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
