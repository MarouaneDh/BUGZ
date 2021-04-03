import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBugPosts } from "../../JS/actions/bugPostActions";

const CompletedBugPosts = () => {
  const bugPostList = useSelector((state) => state.bugPostReducer.bugPostList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBugPosts());
  }, [dispatch]);
  const loadBugPosts = useSelector(
    (state) => state.bugPostReducer.loadBugPosts
  );
  return (
    <div>
      {loadBugPosts ? (
        <div class="spinner-border text-primary" role="status"></div>
      ) : (
        bugPostList.map((el) =>
          el.status === "Completed" ? (
            <Link to={{ pathname: `bugPost/${el._id}` }} key={el._id}>
              <div className="card">
                <div className="card-header ">
                  <h2>
                    "{el.bugPostName}" has been {el.status}
                  </h2>
                </div>
                <div class="progress">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${el.progress}%` }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {el.progress}%
                  </div>
                </div>
              </div>
            </Link>
          ) : null
        )
      )}
    </div>
  );
};

export default CompletedBugPosts;
