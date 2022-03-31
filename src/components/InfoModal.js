import React, { useState } from "react";
import { Modal, Button, Group, Badge } from "@mantine/core";
import { FiEdit3 } from "react-icons/fi";
import Moment from "react-moment";
import MDEditor from "@uiw/react-md-editor";
import EditorWindow from "./EditorWindow";

const InfoModal = ({ todo, handleClose, editTask, theme, dateObj }) => {
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
        classNames={{
          modal: "modal-styles",
          title: "title-bold",
        }}
        withCloseButton={false}
        size="70%"
        opened="true"
        transition="fade"
        transitionDuration={600}
        onClose={handleClose}
      >
        <Group position="left">
          <h4>{todo.task}</h4>
          <Badge color="purple" variant="light">
            <Moment calendar="true">{dateObj}</Moment>
          </Badge>
        </Group>

        <Group>
          {todo.notes.length > 0 ? (
            <div data-color-mode="light">
              <div className="wmde-markdown-var"> </div>
              <MDEditor.Markdown source={todo.notes} />
            </div>
          ) : (
            "No notes to display"
          )}
        </Group>
        <Group position="right">
          <Button color="teal" variant="light" onClick={handleEditOpen}>
            <FiEdit3 size={20} />
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default InfoModal;
