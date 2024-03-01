import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./ImageModal.css";

export default function ImageModal({ open, setOpen, images }) {
  const handleClose = () => setOpen(false);

  console.log(images);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="imgmodaldiv">
          {images?.map((i) => {
            return <img className="imgmodaldivimg" src={i.vUrl} />;
          })}
        </div>
      </Modal>
    </div>
  );
}
