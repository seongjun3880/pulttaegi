import React, { useState, useEffect, useRef } from "react";
import { Location } from "../../data/location";
import markerdata from "../../data/markerData";
import currentIco from "../../assets/icons/current_ico.png";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks/configureStore.hook";
import market, { fetchMarkets } from "../../store/modules/market";
import { DrawMarker } from "./DrawMarker";
import MoveCurrent from "./MoveCurrent";
import kakaomap, { kakaomapSlice, setMap } from "../../store/modules/kakaomap";
import { useDispatch } from "react-redux";
import CurrentMarker from "./CurrentMarker";
import SearchMap from "../search/SearchMap";
import { addMarker } from "./DrawMarker";
import { Link, useLocation, useNavigate } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
} // kakao 전역객체
const Map = () => {
  const adrlocation = useLocation();
  const marketTitle = adrlocation.state?.marketTitle;
  const marketAddress = adrlocation.state?.marketAddress;
  const kakaomaps = useAppSelector((state) => state.kakaomap);

  const dispatch = useDispatch();

  const location: any = Location();
  const [map, setMap] = useState<any>({});
  useEffect(() => {
    if (!location) {
      return;
    } else {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        level: 5,
      };
      const kakaomap = new window.kakao.maps.Map(container, options);
      setMap(kakaomap);
    }

    // DrawMarker(location, map);
  }, [location]);

  useEffect(() => {
    if (!location) {
      return;
    } else {
      dispatch(kakaomapSlice.actions.setMap({ map }));

      dispatch(kakaomapSlice.actions.setLatLng({ location }));
    }
  });
  CurrentMarker();
  DrawMarker();
  // if (marketAddress == undefined) {
  //   return;
  // } else
  SearchMap(map);
  return (
    <>
      {/* 초기 맵 */}
      <div id="map" className="w-screen h-screen" />;{/* 현재위치 이동 버튼 */}
      <MoveCurrent></MoveCurrent>
    </>
  );
};

export default Map;
