import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import BugList from "./components/BugList/BugList";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useEffect } from "react";
import { getAuthUser } from "./JS/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import AddBugPost from "./components/AddBugPost/AddBugPost";
import BugPost from "./components/BugPost/BugPost";
import CompletedBugPosts from "./components/CompletedBugPosts/CompletedBugPosts";
// import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./Chat/Chat";
import ContactsProvider from "./Chat/contexts/ContactsProdiver";
function App() {
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthUser());
  });
  const chat = (
    <ContactsProvider>
      {isAuth ? <Chat id={user._id} /> : null}
    </ContactsProvider>
  );
  return (
    <div className="App">
      <Navbar />
      <div className="d-flex" style={{ height: "100vh" }}>
        {isAuth ? chat : null}
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/bugList/page/:pageNumber" component={BugList} />
          <Route path="/completedBugPosts" component={CompletedBugPosts} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/bugPost/:id" component={BugPost} />
          <PrivateRoute
            path={["/addBugPost", "/edit/:id"]}
            component={AddBugPost}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
