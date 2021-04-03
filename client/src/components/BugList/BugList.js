import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getBugPost,
  getBugPosts,
  toggleTrue,
} from "../../JS/actions/bugPostActions";
import Pagination from "../Pagination/Pagination";
import "./BugList.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const BugList = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const total = useSelector((state) => state.bugPostReducer.total);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const bugPostList = useSelector((state) => state.bugPostReducer.bugPostList);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const loadBugPosts = useSelector(
    (state) => state.bugPostReducer.loadBugPosts
  );
  const a = Number(pageNumber) + 1;
  const b = Number(pageNumber) - 1;
  useEffect(() => {
    dispatch(getBugPosts(pageNumber, 5));
  }, [dispatch, pageNumber]);

  return (
    <div>
      <h1>Bug list page</h1>
      {loadBugPosts ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div>
          {isAuth ? (
            <div>
              {bugPostList.map((el) => (
                <div className="bugPost" key={el._id}>
                  <div className="card">
                    <div className="card-header bg-secondary" key={el._id}>
                      <h4>{el.bugPostName}</h4>
                      <Link to={{ pathname: `/edit/${el._id}` }}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            dispatch(getBugPost(el._id));
                            dispatch(toggleTrue());
                          }}
                        >
                          EDIT
                        </button>
                      </Link>
                    </div>
                    <Link to={{ pathname: `/bugPost/${el._id}` }}>
                      <div className="card-body">
                        {el.importance === "Low" ? (
                          <span className="btn btn-secondary">
                            Priority : {el.importance}
                          </span>
                        ) : el.importance === "Medium" ? (
                          <span className="btn btn-warning">
                            Priority : {el.importance}
                          </span>
                        ) : (
                          <span className="btn btn-danger">
                            Priority : {el.importance}
                          </span>
                        )}
                        {el.progress === 100 ? (
                          <div class="progress">
                            <div
                              class="progress-bar-striped progress-bar-animated bg-success"
                              role="progressbar"
                              style={{ width: `${el.progress}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {el.progress}%
                            </div>
                          </div>
                        ) : el.progress <= 10 ? (
                          <div class="progress">
                            <div
                              class="progress-bar-striped progress-bar-animated bg-danger"
                              role="progressbar"
                              style={{ width: `${el.progress}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {el.progress}%
                            </div>
                          </div>
                        ) : (
                          <div class="progress">
                            <div
                              class="progress-bar-striped progress-bar-animated bg-primary"
                              role="progressbar"
                              style={{ width: `${el.progress}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {el.progress}%
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>

                  {user._id === el.author || user.role === "admin" ? (
                    <Link to={{ pathname: `/edit/${el._id}` }}></Link>
                  ) : (
                    <Link to={{ pathname: `/bugPost/${el._id}` }}>
                      <div className="bugPost" key={el._id}>
                        <p>{el.bugPostName}</p>
                        <div class="progress"></div>
                        <p>{el.importance}</p>
                        <p>{el.status}</p>
                      </div>
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          style={{ width: `${el.progress}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {el.progress}%
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
              <Link to={{ pathname: "/addBugPost" }}>
                <button className="btn btn-primary">Add Post</button>
              </Link>
            </div>
          ) : null}
        </div>
      )}
      <div className="pagination">
        <a className="page-link" href={`/bugList/page/${b}`}>
          Previous
        </a>
        <Pagination total={total} />
        <a className="page-link" href={`/bugList/page/${a}`}>
          next
        </a>
      </div>
    </div>
  );
};

export default BugList;
