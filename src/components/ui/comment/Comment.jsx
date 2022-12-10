import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../configs/firebase-configs";
import { userStore } from "../../../store/user-store";
import Button from "../button/Button";

const Comment = () => {
  const { user } = userStore((state) => state);
  const [comment, setComment] = useState(null);
  const pid = user && useParams().id;

  const handleComment = () => {
    if (comment !== "<p><br></p>") {
      const d = new Date();
      const uid = user.id;
      const userRef = doc(collection(db, "users"), uid);
      const productRef = doc(collection(db, "products"), pid);
      const createAt = Timestamp.fromDate(d);

      const data = {
        comment,
        createAt,
        pid,
        uid,
        userRef,
        productRef,
      };

      addDoc(collection(db, "comments"), data).then(() => {
        setComment("");
        toast.success("Bình luận thành công");
      });
    } else {
      console.log(comment);
    }
  };

  return (
    <>
      {user && (
        <div className="mt-12">
          <JoditEditor
            onChange={(content) => setComment(content)}
            value={comment}
          ></JoditEditor>
          <Button type="secondary" onClick={handleComment}>
            Send Comment
          </Button>
        </div>
      )}
    </>
  );
};

export const CommentShow = () => {
  const pid = useParams().id;
  const { user } = userStore((state) => state);
  const [comments, setComments] = useState([]);
  const commentRef = query(collection(db, "comments"), where("pid", "==", pid));

  useEffect(() => {
    onSnapshot(commentRef, (res) => {
      let temp = [];

      res.docs.length > 0 &&
        res.docs.map((doc) =>
          temp.push({ id: doc.id, data: { ...doc.data() } })
        );
      setComments(temp);
    });
  }, [pid]);

  const CommentItem = ({ id, comment }) => {
    const contentRef = useRef(null);
    const [currentUser, setCurrentUser] = useState({});
    const [update, setUpdate] = useState(false);
    const [commentUpdate, setCommentUpdate] = useState(comment.comment);

    useEffect(() => {
      if (!update) {
        contentRef.current.textContent = "";
        contentRef.current.insertAdjacentHTML(
          "beforeend",
          comment.comment || commentUpdate
        );
      }

      getDoc(comment.userRef).then((res) =>
        setCurrentUser({ id: res.id, ...res.data() })
      );
    }, [comment.comment, commentUpdate]);

    const handleRemoveComment = () => {
      const deleteRef = doc(collection(db, "comments"), id);

      deleteDoc(deleteRef).then(() => {
        toast.success("Xóa bình luận thành công");
      });
    };
    const handleUpdateComment = () => {
      if (update) {
        const data = comment;
        data.comment = commentUpdate;
        const updateRef = doc(collection(db, "comments"), id);
        updateDoc(updateRef, data).then(() => {
          toast.success("Update success");
          setUpdate(false);
        });
      } else {
        setUpdate(true);
      }
    };

    return (
      <div>
        <div className="flex gap-4">
          <div className="rounded-lg w-[70px] h-[70px] bg-gray-400 overflow-hidden flex-shrink-0">
            {currentUser && (
              <img
                src={currentUser.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-bold text-black">
                  {currentUser?.fullname}
                </span>
                <span className="text-gray-dark text-sm font-bold">
                  {comment.createAt.toDate().toDateString()}
                </span>
              </div>
              {user?.id === comment.uid && (
                <>
                  <button
                    className=" items-center justify-center w-10 h-10 text-white bg-red-500 rounded-full cursor-pointer hidden md:flex ml-16"
                    onClick={handleRemoveComment}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  {!update && (
                    <button
                      className=" items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full cursor-pointer hidden md:flex"
                      onClick={handleUpdateComment}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>
            {!update && (
              <span className="text-gray-dark" ref={contentRef}></span>
            )}
            {update && (
              <>
                <JoditEditor
                  onChange={(content) => setCommentUpdate(content)}
                  value={comment.comment}
                ></JoditEditor>
                <Button type="primary" onClick={handleUpdateComment}>
                  Update comment
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {user?.id === comment.uid && (
            <>
              <button
                className="btn btn-error text-white btn-circle duration-300"
                onClick={handleRemoveComment}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              {!update && (
                <button
                  className="btn btn-primary btn-circle"
                  onClick={handleUpdateComment}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-12">
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment.data}
            id={comment.id}
          />
        ))}
    </div>
  );
};

export default Comment;
