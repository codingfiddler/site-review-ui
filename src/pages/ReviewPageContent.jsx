import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Collapse,
  TextField,
  Button,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import commentsData from "./commentsData.json";
import { pink, deepOrange } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Rating } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import PageSummary from "./PageSummary";
import christine from "./christine.jpg";
import { NavLink } from "react-router-dom";
import axios from "axios";

// TODO: Tags? Checklist?
// TODO: Filter by tags?
// TODO: Add average rating
// TODO: Edit comments
// FIXME: Comments on comment threads go out of order, make sure to sort by date when we get the real data from API

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    // height: 48,
    padding: "0 30px",
    marginLeft: "5px",
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

export default function ReviewPageContent({ match }) {
  const classes = useStyles();
  const [openThread, setOpenThread] = React.useState({}); // React Hooks: set state without having to create classes for components
  // const [openThreadFor, setOpenThreadFor] = React.useState(""); // Remember which comment thread to set thread open for!
  const [newCommentThread, setNewCommentThread] = React.useState("");
  const [newComment, setNewComment] = React.useState({});
  const [allCommentThreads, setAllCommentThreads] = React.useState([]);
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const currentUserId = 1; // You can only delete comments made by the current user
  const [averageRating, setAverageRating] = React.useState(0);
  const [totalPerRating, setTotalPerRating] = React.useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
    0: 0,
  });
  const [response, setResponse] = React.useState([]);

  // First time aggregating ratings
  useEffect(() => {
    console.log("useEffect");
    fetchComments();
    let totalRating = 0;
    let totalUsers = 0;
    let newTotalPerRating = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
      0: 0,
    };
    allCommentThreads.map((commentThread) => {
      // console.log(commentThread);
      totalRating += commentThread.rating;
      totalUsers += 1;
      newTotalPerRating[commentThread.rating] =
        newTotalPerRating[commentThread.rating] + 1;
    });
    setAverageRating(totalRating / totalUsers);
    setTotalPerRating({ ...newTotalPerRating });
  }, []);

  const fetchComments = async () => {
    console.log("fetchComments");
    const response = await axios.get(
      "https://api.sitereview.fiddlingphotographer.com/pages/"
    );
    console.log("RESPONSE");
    console.log(response);
    setResponse(response);
    const myPageInfo = response.data.filter(
      (pageInfo) =>
        pageInfo.pageURL === decodeURIComponent(match.params.pageUrl)
    )[0];
    if (myPageInfo) {
      const arrayOfComments = myPageInfo.comments;
      console.log(arrayOfComments);
      setAllCommentThreads(arrayOfComments);
    }
  };

  const pushComments = async () => {
    console.log("pushComments");
    if (response && response.data) {
      const updatedPageInfo = response.data.filter(
        (pageInfo) =>
          pageInfo.pageURL === decodeURIComponent(match.params.pageUrl)
      )[0];
      updatedPageInfo.comments = [...allCommentThreads]; // Updated page object
      console.log("UPDATED PAGE INFO");
      console.log(updatedPageInfo);
      await axios
        .post("https://api.sitereview.fiddlingphotographer.com/pages/", {
          ...updatedPageInfo,
          comments: [...updatedPageInfo.comments],
        })
        .then(function (res) {
          console.log("POST RESPONSE DATA");
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // Anytime a new comment is added
  useEffect(() => {
    let totalRating = 0;
    let totalUsers = 0;
    let newTotalPerRating = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
      0: 0,
    };
    allCommentThreads.map((commentThread) => {
      totalRating += commentThread.rating;
      totalUsers += 1;
      newTotalPerRating[commentThread.rating] =
        newTotalPerRating[commentThread.rating] + 1;
    });
    setAverageRating(totalRating / totalUsers);
    setTotalPerRating({ ...newTotalPerRating });
    // Push when data is ready
    if (allCommentThreads) {
      pushComments();
    }
  }, [allCommentThreads]);

  /**
   * Opens a comment thread for user to view comments in that thread
   * @param {string} commentThreadId
   */
  const handleOpenThread = (commentThreadId) => {
    setOpenThread({
      ...openThread,
      [commentThreadId]: !openThread[commentThreadId],
    });
  };

  /**
   * Adds a new comment to the current thread
   * @param {string} commentThreadId
   * @param {string} comment
   */
  const handleAddCommentToThread = (commentThreadId, comment) => {
    // Error checking
    if (comment === "") {
      alert("Empty comment alert! Please try again.");
      return;
    }
    // 1. Create new comment (not a comment thread)
    const newCommentObject = {
      userId: 1,
      commentId: parseInt(Math.random() * 1000).toString(), // To keep things consistent, all ids are strings!
      comment: comment,
      date: "2020-07-07",
    };
    // TODO: Finalize on a structure for comment threads
    // Structure of a comment thread:
    // 1. Comment thread (object, identified by threadId)
    // 2. Thread (list)
    // 3. Comment (object, identified by commentId)
    const currentCommentThread = allCommentThreads.filter((commentThread) => {
      // console.log("COMMENT THREAD");
      // console.log(commentThread);
      // console.log("COMMENT THREAD ID");
      // console.log(commentThreadId);
      // console.log(parseInt("728") === 728);
      // console.log(parseInt(commentThread.commentThreadId));
      // console.log(parseInt(commentThreadId));
      // console.log(
      //   parseInt(commentThread.commentThreadId) === parseInt(commentThreadId)
      // );
      return (
        parseInt(commentThread.commentThreadId) === parseInt(commentThreadId)
      );
    })[0];
    // console.log(allCommentThreads);
    // console.log(currentCommentThread);
    // console.log(commentThreadId);
    const currentThread = currentCommentThread.thread;
    const newThread = {
      ...currentThread,
      [newCommentObject.commentId]: newCommentObject,
    };
    const newCommentThread = { ...currentCommentThread, thread: newThread };
    // console.log(newCommentThread);
    setAllCommentThreads(
      allCommentThreads.map((commentThread) => {
        if (
          parseInt(commentThread.commentThreadId) === parseInt(commentThreadId)
        ) {
          return newCommentThread;
        } else {
          return commentThread;
        }
      })
    );
    setNewComment({ ...newComment, [commentThreadId]: "" });
  };

  /**
   * Creates a new comment thread
   * @param {*} e
   */
  const handleAddCommentThread = (e) => {
    console.log(newCommentThread);
    console.log("handleAddCommentThread");
    if (newCommentThread === "") {
      alert(
        "Empty comment! Please make sure you type out your comment before selecting add."
      );
      return;
    }
    const newCommentThreadObject = {
      userId: 1, // Default for now, once we add the backend we will have to change this to the currently authorized user
      comment: newCommentThread,
      rating: rating, // Default for now
      date: "2020-07-07",
      thread: [],
      commentThreadId: parseInt(Math.random() * 1000).toString(),
      openThread: false,
    };
    setAllCommentThreads([...allCommentThreads, newCommentThreadObject]);
    setNewCommentThread("");
    setRating(0);
    let totalRating = 0;
    let totalUsers = 0;
    let newTotalPerRating = { ...totalPerRating };
    allCommentThreads.map((commentThread) => {
      totalRating += commentThread.rating;
      totalUsers += 1;
      newTotalPerRating[commentThread.rating] =
        newTotalPerRating[commentThread.rating] + 1;
    });
    setAverageRating(totalRating / totalUsers);
    setTotalPerRating({ ...newTotalPerRating });
  };

  // TODO: Add JSDoc comment
  const handleDeleteCommentThread = (deleteThisCommentThreadId) => {
    const keepTheseCommentThreads = [];
    for (const commentThread in allCommentThreads) {
      // for...in loops through the keys (not values)
      const commentThreadId = commentThread.commentThreadId;
      if (commentThreadId !== deleteThisCommentThreadId) {
        keepTheseCommentThreads.push(commentThread);
      }
    }
    setAllCommentThreads(keepTheseCommentThreads);
  };

  // TODO: Add JSDoc comment
  const handleDeleteComment = (commentThreadId, deleteThisCommentId) => {
    const keepTheseComments = {};
    const currentCommentThread = allCommentThreads.filter(
      (commentThread) => commentThread.commentThreadId === commentThreadId
    )[0];
    for (const commentId in currentCommentThread.thread) {
      if (commentId !== deleteThisCommentId) {
        keepTheseComments[commentId] = currentCommentThread.thread[commentId];
      }
    }
    const newCurrentCommentThread = {
      ...currentCommentThread,
      thread: keepTheseComments,
    };
    const newAllCommentThreads = [
      ...allCommentThreads,
      newCurrentCommentThread,
    ];
    setAllCommentThreads(newAllCommentThreads);
  };
  console.log("ReviewPageContent");
  console.log(match.params);
  console.log(decodeURIComponent(match.params.pageUrl));
  return (
    <div style={{ textAlign: "center", height: "80vh", padding: "0% 10% 50%" }}>
      <h1 style={{ padding: "0px 20px" }}>Review Page Content</h1>
      <h2>{match.params.pageName}</h2>
      <PageSummary
        averageRating={averageRating}
        totalPerRating={totalPerRating}
        totalViews={
          commentsData[match.params.pageName]
            ? commentsData[match.params.pageName].totalViews
            : 0
        }
      />
      <NavLink
        style={{
          backgroundColor: "#fff1f3",
          textDecoration: "none",
          padding: "15px",
          borderRadius: "5px",
          color: "black",
          fontWeight: "700",
          boxShadow: "0.5px 0.5px 5px #c5c5c5",
        }}
        to="/pages"
      >
        Back to Pages Table
      </NavLink>
      <h2 style={{ textAlign: "left" }}>Your Page</h2>
      <iframe
        src={decodeURIComponent(match.params.pageUrl)}
        width="100%"
        height="85%"
        frameborder="0"
        allowfullscreen
        sandbox
      >
        <p>
          <a href="https://developer.mozilla.org/en-US/docs/Glossary">
            Fallback link for browsers that don't support iframes
          </a>
        </p>
      </iframe>
      <List>
        {allCommentThreads.map((commentThread) => {
          let collapseComponentListItems = Object.values(
            commentThread.thread
          ).map((comment) => (
            <ListItem className={classes.nested}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={comment.comment}
                secondary={"@" + comment.userId}
              />
              {currentUserId === comment.userId && (
                <DeleteIcon
                  onClick={(event) =>
                    handleDeleteComment(
                      commentThread.commentThreadId,
                      comment.commentId
                    )
                  }
                />
              )}
            </ListItem>
          ));

          return (
            <React.Fragment>
              <ListItem
                button
                onClick={(e) => handleOpenThread(commentThread.commentThreadId)}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={commentThread.comment}
                  secondary={"@" + commentThread.userId}
                />
                <StyledRating
                  name="customized-color"
                  defaultValue={parseInt(
                    allCommentThreads.filter(
                      (currentCommentThread) =>
                        currentCommentThread.commentThreadId ===
                        commentThread.commentThreadId
                    )[0].rating
                  )}
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  readOnly
                  style={{ marginRight: "5px" }}
                />
                {currentUserId === commentThread.userId && (
                  <DeleteIcon
                    onClick={(event) =>
                      handleDeleteCommentThread(commentThread.commentThreadId)
                    }
                  />
                )}
                {openThread[commentThread.commentThreadId] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              {openThread[commentThread.commentThreadId] &&
                collapseComponentListItems.length > 0 && (
                  // Note to self: Collapse component will not show unless it is non-empty
                  <Collapse in={openThread[commentThread.commentThreadId]}>
                    {collapseComponentListItems && (
                      <List>{collapseComponentListItems}</List>
                    )}
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <TextField
                        label="What are your thoughts?"
                        variant="outlined"
                        style={{ width: "90%" }}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            [commentThread.commentThreadId]: e.target.value,
                          })
                        }
                        value={newComment[commentThread.commentThreadId]}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddCommentToThread(
                              commentThread.commentThreadId,
                              newComment[commentThread.commentThreadId]
                            );
                          }
                        }}
                      />
                      <Button
                        className={classes.root}
                        onClick={(e) =>
                          handleAddCommentToThread(
                            commentThread.commentThreadId,
                            newComment[commentThread.commentThreadId]
                          )
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </Collapse>
                )}
              {openThread[commentThread.commentThreadId] &&
                collapseComponentListItems.length === 0 && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <TextField
                      label="What are your thoughts?"
                      variant="outlined"
                      style={{ width: "90%" }}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          [commentThread.commentThreadId]: e.target.value,
                        })
                      }
                      value={newComment[commentThread.commentThreadId]}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddCommentToThread(
                            commentThread.commentThreadId,
                            newComment[commentThread.commentThreadId]
                          );
                        }
                      }}
                    />
                    <Button
                      className={classes.root}
                      onClick={(e) =>
                        handleAddCommentToThread(
                          commentThread.commentThreadId,
                          newComment[commentThread.commentThreadId]
                        )
                      }
                    >
                      Add
                    </Button>
                  </div>
                )}
            </React.Fragment>
          );
        })}
      </List>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ textAlign: "left" }}>Add a comment</h2>
        <div style={{ display: "flex" }}>
          <TextField
            label="Add a review..."
            variant="outlined"
            fullWidth
            multiline
            onChange={(e) => setNewCommentThread(e.target.value)}
            value={newCommentThread}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddCommentThread(e);
              }
            }}
          />
          <Button
            variant="contained"
            onClick={(e) => handleAddCommentThread(e)}
            size="large"
            className={classes.root}
          >
            Add
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          <StyledRating
            name="customized-color"
            precision={1}
            value={rating}
            icon={<FavoriteIcon fontSize="inherit" />}
            size="large"
            onChange={(e, newValue) => setRating(newValue)}
            onChangeActive={(event, newHover) => setHover(newHover)}
            style={{ margin: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
