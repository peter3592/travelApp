import React from "react";
import { useState } from "react";
import fetchAPI from "../utils/fetchAPI";

export const DataContext = React.createContext();

export function DataProvider(props) {
  const [place, setPlace] = useState(null);
  const [topPlaces, setTopPlaces] = useState([]);
  const [recentPlaces, setRecentPlaces] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [wallPosts, setWallPosts] = useState(null);

  const reloadPlace = async () => {
    const { ok, data } = await fetchAPI(`api/v1/places/${place._id}`);

    if (ok) setPlace(data.place);
  };

  const reloadData = async () => {
    const { ok, data } = await fetchAPI("api/v1/places/reload-data");

    if (ok) {
      setTopPlaces(data.topPlaces);
      setRecentPlaces(data.recentPlaces);
      setWallPosts(data.wallPosts.reverse());
    }
  };

  // const reloadData = async () => {
  //   let res;

  //   // Reload Top Places
  //   res = await fetchAPI("api/v1/places/top-places");
  //   // res = await fetchAPI("api/v1/places/top-places", "POST", {
  //   //   username: null,
  //   // });

  //   if (res.ok) setTopPlaces(res.data.topPlaces);

  //   // Reload Recent Places
  //   res = await fetchAPI("api/v1/places/recent-places");

  //   if (res.ok) setRecentPlaces(res.data.recentPlaces);

  //   // Relaod Wall Posts
  //   res = await fetchAPI("api/v1/wallposts");

  //   if (res.ok) setWallPosts(res.data.wallPosts.reverse());
  // };

  const value = {
    place,
    setPlace,
    reloadPlace,
    //
    wallPosts,
    topPlaces,
    recentPlaces,
    // Refreshing Data
    autoRefresh,
    setAutoRefresh,
    reloadData,
    // Map Settings
    // mapLanguage,
    // setMapLanguage,
    // mapType,
    // setMapType,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
}
