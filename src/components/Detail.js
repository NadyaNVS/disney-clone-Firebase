import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    try {
      const movieDocRef = doc(db, "movies", id);
      onSnapshot(movieDocRef, (doc) => {
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          console.log("No such document in Firebase");
        }
      });
    } catch (error) {
      console.log("Error getting document:", error.message);
    }
  }, [id]);
  return (
    <Container>
      <Background>
        <img src={detailData.backgroundImg} alt={detailData.title} />
      </Background>
      <ImageTitle>
        <img src={detailData.titleImg} alt={detailData.title} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="Play button" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="Play button" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span></span>
            <span></span>
          </AddList>
          <GroupWatch>
            <div>
              <img src="/images/group-icon.png" alt="Group watch." />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  min-height: calc(100% - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  opacity: 0.8;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 0 auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    display: block;
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 24px 0;
  min-height: 56px;
`;

const Player = styled.button`
  display: flex;
  font-size: 15px;
  margin: 0 22px 0px 0px;
  padding: 0 24px;
  height: 56px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  letter-spacing: 1.8px;
  align-text: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 22px;
    font-size: 12px;
    margin: 0 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddList = styled.div`
  display: flex;
  margin-right: 16px;
  height: 44px;
  width: 44px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid rgb(249, 249, 249);
  cursor: pointer;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }

    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const GroupWatch = styled.div`
  display: flex;
  margin-right: 16px;
  height: 44px;
  width: 44px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid rgb(249, 249, 249);
  cursor: pointer;

  img {
    display: block;
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
