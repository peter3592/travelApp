import { useState, useEffect } from "react";
import { useDataContext, useUIContext } from "../../store/context";
import WallFilter from "./WallFilter";
import WallPost from "./WallPost/WallPost";
import WallNewPlaces from "./WallNewPlaces/WallNewPlaces";
import AutoRefresh from "./AutoRefresh";
import {
  Button,
  LoadingDataSpinner,
  LoadingPageSpinner,
} from "../../components/UI";
import { Container } from "./WallPage.styled";
import { useWallPosts } from "../../api/hooks/useWallPosts";

export function WallPage() {
  const [filteredItems, setFilteredItems] = useState({
    like: true,
    comment: true,
    newPlace: true,
  });
  const { wallPages, setWallPages } = useDataContext();
  const { breakpoints } = useUIContext();
  const { wallPosts, refetch } = useWallPosts(wallPages);

  useEffect(() => {
    refetch();
  }, [wallPages]);

  const loadMoreClickHandler = () => setWallPages((prev) => prev + 1);

  if (!wallPosts) return <LoadingPageSpinner />;

  const filterActive =
    filteredItems.like || filteredItems.comment || filteredItems.newPlace;

  return (
    <Container>
      <div className="posts__container">
        {!wallPosts && <LoadingDataSpinner />}
        {wallPosts && wallPosts.length === 0 && (
          <p className="noPostTitle">No wall posts</p>
        )}
        {wallPosts && wallPosts.length > 0 && (
          <>
            <WallFilter setFilteredItems={setFilteredItems} />
            {(filteredItems.like ||
              filteredItems.comment ||
              filteredItems.newPlace) && <AutoRefresh />}
            <div className="posts">
              {wallPosts
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
              {filterActive && (
                <div className="btnContainer">
                  <Button small onClick={loadMoreClickHandler}>
                    Load More
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {!breakpoints.maxWidth700 && (
        <div className="newPlaces__container">
          <WallNewPlaces />
        </div>
      )}
    </Container>
  );
}
