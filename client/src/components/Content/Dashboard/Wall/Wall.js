import styled from "styled-components";
import { useDataContext } from "../../../../store/context";
import WallFilter from "./WallFilter";
import { useState } from "react";

import WallPost from "./WallPost/WallPost";
import WallNewPlaces from "./WallNewPlaces/WallNewPlaces";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import LoadingSpinner2 from "../../../UI/LoadingSpinner2";
import AutoRefresh from "./AutoRefresh";
import { useEffect } from "react";
import Button from "../../../UI/Button";

const POSTS_PEG_PAGE = 7;

export default function Wall() {
  const [filteredItems, setFilteredItems] = useState({
    like: true,
    comment: true,
    newPlace: true,
  });
  const [paginatedPosts, setPaginatedPosts] = useState();
  const [page, setPage] = useState(1);

  const { wallPosts } = useDataContext();

  useEffect(() => {
    if (wallPosts) setPaginatedPosts(wallPosts.slice(0, page * POSTS_PEG_PAGE));
  }, [wallPosts, page]);

  if (!wallPosts) return <LoadingSpinner />;

  return (
    <Div>
      <div className="posts__container">
        {/* <LoadingSpinner2 /> */}
        {!paginatedPosts && <LoadingSpinner2 />}
        {paginatedPosts && paginatedPosts.length === 0 && (
          <p className="noPostTitle">No wall posts</p>
        )}
        {paginatedPosts && paginatedPosts.length > 0 && (
          <>
            <WallFilter setFilteredItems={setFilteredItems} />
            {(filteredItems.like ||
              filteredItems.comment ||
              filteredItems.newPlace) && <AutoRefresh />}
            <div className="posts">
              {paginatedPosts
                .filter((post) => filteredItems[post.type])
                .map((post) => (
                  <WallPost
                    key={post._id}
                    type={post.type}
                    sourceUser={post.sourceUser}
                    place={post.place}
                    targetUser={post.targetUser}
                    createdAt={post.createdAt}
                    hide={!filteredItems[post.type]}
                  />
                ))}
              {(filteredItems.like ||
                filteredItems.comment ||
                filteredItems.newPlace) && (
                <div className="btnContainer">
                  <Button small onClick={() => setPage((prev) => prev + 1)}>
                    Load More
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="newPlaces__container">
        <WallNewPlaces />
      </div>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  gap: 2rem;

  padding: 2rem;

  height: 100%;
  width: 100%;

  overflow: hidden;

  .posts__container {
    height: 100%;
    flex-grow: 1;
    position: relative;

    overflow-x: none;

    display: flex;
    flex-direction: column;

    border-bottom-left-radius: var(--border-radius);

    .noPostTitle {
      color: var(--color-primary);
      font-size: 1.8rem;
      font-weight: bold;
      text-align: center;
    }
  }

  .posts {
    overflow-x: none;
    overflow-y: auto;
    align-self: center;

    max-width: 70rem;
    margin-bottom: 2rem;
  }

  .newPlaces__container {
    border-bottom-right-radius: var(--border-radius);
    overflow: hidden;
    width: 18rem;
    flex-shrink: 0;
  }

  .btnContainer {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: 1rem;
  }
`;
