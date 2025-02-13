import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import axios from "axios";

const Whiteboard = () => {
  const [comments, setComments] = useState([]);
  const [lines, setLines] = useState([]);
  const [newComment, setNewComment] = useState({ text: "", x: 0, y: 0 });

  useEffect(() => {
    // Fetch existing comments
    axios.get("http://localhost:5000/comments")
      .then(response => setComments(response.data))
      .catch(error => console.error("Error loading comments:", error));
  }, []);

  const handleCanvasClick = (e) => {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    setNewComment({ text: "", x: pointerPos.x, y: pointerPos.y });
  };

  const handleAddComment = () => {
    if (!newComment.text.trim()) return;

    axios.post("http://localhost:5000/comments", newComment)
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment({ text: "", x: 0, y: 0 });
      })
      .catch(error => console.error("Error saving comment:", error));
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleCanvasClick}
        style={{ background: "white" }}
      >
        <Layer>
          {comments.map((comment, index) => (
            <Text key={index} x={comment.x} y={comment.y} text={comment.text} fontSize={16} fill="black" />
          ))}
        </Layer>
      </Stage>

      {newComment.x !== 0 && (
        <div style={{ position: "absolute", top: newComment.y, left: newComment.x }}>
          <input
            type="text"
            value={newComment.text}
            onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
            placeholder="Add a comment"
          />
          <button onClick={handleAddComment}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Whiteboard;
