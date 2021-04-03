import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBugPost, postBugPost } from "../../JS/actions/bugPostActions";
import { toggleFalse } from "../../JS/actions/bugPostActions";
import { getBugPost } from "../../JS/actions/bugPostActions";
import { getUsers } from "../../JS/actions/userActions";

const AddBugPost = ({ history }) => {
  const user = useSelector((state) => state.authReducer.user);
  const users = useSelector((state) => state.userReducer.userList);

  const bugPostReducer = useSelector((state) => state.bugPostReducer.bugPost);
  const edit = useSelector((state) => state.editReducer.edit);
  const [bugPost, setBugPost] = useState({
    bugPostName: "",
    bugPostContent: "",
    author: "",
    importance: "",
    progress: "",
    status: "",
    debuggerName: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    edit
      ? setBugPost(bugPostReducer)
      : setBugPost({
          bugPostName: "",
          bugPostContent: "",
          author: "",
          importance: "low",
          progress: "0",
          status: "Pending",
          debuggerName: "",
        });
  }, [edit, bugPostReducer, dispatch]);
  const handleBugPost = () => {
    if (!edit) {
      dispatch(
        postBugPost({
          ...bugPost,
          author: user._id,
          history,
        })
      );
    } else {
      dispatch(getBugPost());
      dispatch(editBugPost(bugPostReducer._id, bugPost, history));
      dispatch(toggleFalse());
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setBugPost({
      ...bugPost,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div className="pagebody">
        <div className="bodyAddBugPost">
          <div>
            <div>
              <h1>Adding Bug Post</h1>
            </div>
            <div>
              <label>
                Bug post name :{" "}
                <input
                  name="bugPostName"
                  value={bugPost.bugPostName}
                  type="text"
                  placeholder="type the bug post's name here"
                  onChange={handleChange}
                ></input>
              </label>
              <br />
              <label>
                Bug post content :{" "}
                <input
                  name="bugPostContent"
                  value={bugPost.bugPostContent}
                  placeholder="type your content here"
                  onChange={handleChange}
                />
              </label>
              {user.role === "admin" ? (
                <div>
                  <label>Status : </label>
                  <select
                    name="status"
                    value={bugPost.status}
                    onChange={handleChange}
                  >
                    <option>Pending...</option>
                    <option>Ongoing...</option>
                    <option>Completed</option>
                  </select>
                  <label>Progress : </label>
                  <input
                    name="progress"
                    value={bugPost.progress}
                    onChange={handleChange}
                  />
                  <label>Importance : </label>
                  <select
                    name="importance"
                    value={bugPost.importance}
                    onChange={handleChange}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                  <label>Assign Debugger : </label>
                  <select
                    name="debuggerName"
                    value={bugPost.debuggerName}
                    onChange={handleChange}
                  >
                    {users.map((el) => (
                      <option>
                        {el.firstName} {el.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              <div>
                <button onClick={handleBugPost}>
                  {edit ? "edit" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBugPost;
