import React, { useEffect } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import Feed from "./Feed";
import {
  selectRecommend,
  selectNewDisney,
  selectOriginal,
  selectTrending,
} from "../features/movie/movieSlice";

const Home = (props) => {
  const moviesRecommended = useSelector(selectRecommend);
  const moviesNewDisney = useSelector(selectNewDisney);
  const moviesOriginal = useSelector(selectOriginal);
  const moviesTrending = useSelector(selectTrending);

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = onSnapshot(
          collection(db, "movies"),
          (querySnapshot) => {
            let recommends = [];
            let newDisneys = [];
            let originals = [];
            let trendings = [];

            querySnapshot.forEach((doc) => {
              switch (doc.data().type) {
                case "recommend":
                  recommends = [...recommends, { id: doc.id, ...doc.data() }];
                  break;
                case "new":
                  newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
                  break;

                case "original":
                  originals = [...originals, { id: doc.id, ...doc.data() }];
                  break;

                case "trending":
                  trendings = [...trendings, { id: doc.id, ...doc.data() }];
                  break;

                default:
                  break;
              }
            });

            dispatch(
              setMovies({
                recommend: recommends,
                newDisney: newDisneys,
                original: originals,
                trending: trendings,
              })
            );
          }
        );

        // Clean up the subscription when the component unmounts
        return () => {
          snapshot();
        };
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Feed genre={"Recommended for You"} movies={moviesRecommended} />
      <Feed genre={"New to Disney+"} movies={moviesNewDisney} />
      <Feed genre={"Originals"} movies={moviesOriginal} />
      <Feed genre={"Trending"} movies={moviesTrending} />
    </Container>
  );
};

const Container = styled.main`
  display: block;
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    content: "";
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
