import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import EditorWindow from "./EditorWindow";

const InfoModal = ({ todo, handleClose, editTask, theme }) => {
  const [editingMode, setEditingMode] = useState(false);

  const handleEditOpen = () => {
    setEditingMode(true);
  };

  const handleEditClose = () => {
    setEditingMode(false);
  };

  return (
    <div className="modal-styles">
      {editingMode ? (
        <EditorWindow
          todo={todo}
          editTask={editTask}
          handleEditClose={handleEditClose}
          theme={theme}
        />
      ) : null}
      <Modal
        bg="primary"
        className="modal-styles"
        size="xl"
        show="true"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{todo.task}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {todo.notes.length > 0 ? (
            <div data-color-mode={theme === true ? "dark" : "light"}>
              <div className="wmde-markdown-var"> </div>
              <MDEditor.Markdown source={todo.notes} />
            </div>
          ) : (
            "No notes displayed"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleEditOpen}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InfoModal;
