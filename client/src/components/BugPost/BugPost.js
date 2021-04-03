import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBugPost } from "../../JS/actions/bugPostActions";
import "./BugPost.css";

const BugPost = ({ match }) => {
  const bugPost = useSelector((state) => state.bugPostReducer.bugPost);
  const { comments } = bugPost;

  const [text, settext] = useState("");
  const user = useSelector((state) => state.authReducer.user);
  const loadPost = useSelector((state) => state.bugPostReducer.loadPost);
  const dispatch = useDispatch();
  const makeComment = (id, text) => {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    axios
      .post(`/api/bugPost/comment/${id}`, { id, text }, options)
      .then((res) => dispatch(getBugPost(match.params.id)))
      .catch((err) => console.log(err));
    settext("");
  };
  useEffect(() => {
    dispatch(getBugPost(match.params.id));
  }, [dispatch, match.params.id]);

  const deleteComment = (id) => {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    axios
      .delete(`/api/bugPost/comment/${match.params.id}/${id}`, options)
      .then((res) => dispatch(getBugPost(match.params.id)))
      .catch((err) => console.log(err));
  };
  // console.log(bugPost.comments);
  return (
    <div>
      {!loadPost ? (
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">{bugPost.bugPostName}</h1>
          </div>
          <div className="card-body">
            <h3>Status : {bugPost.status}</h3>
            <h3>Importance : {bugPost.importance} priority</h3>

            <label>This bug will be solved by : {bugPost.debuggerName}</label>
            <br />
            <h5>{bugPost.bugPostContent}</h5>
            <div className="card-header">Comments</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(match.params.id, text);
                dispatch(getBugPost(match.params.id));
              }}
            >
              <input
                type="text"
                placeholder="add a comment"
                onChange={(e) => settext(e.target.value)}
                value={text}
                cols="100"
                className="form-control"
              />
            </form>
            <div>
              {comments &&
                comments.map((el) => {
                  return (
                    <h4 id="comment" key={el._id} className="comment">
                      <span>
                        {el.userName} {el.userSurname}
                      </span>
                      <div className="text">{el.text}</div>
                      {(el.userId === user && user._id) ||
                      (user && user.role === "admin") ? (
                        <button
                          className="btn btn-secondary"
                          onClick={() => deleteComment(el._id)}
                        >
                          delete
                        </button>
                      ) : null}
                    </h4>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </div>
  );
};

export default BugPost;
