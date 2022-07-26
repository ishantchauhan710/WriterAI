import React, { useEffect, useRef } from "react";

export const ProjectMenuDialog = ({
  open,
  setOpen,
  pos,
  setPos,
  setShowDeleteDialog,
}) => {
  const handleMenuClick = () => {
    handleClose();
  };

  const handleClose = () => {
    setPos({});
    setOpen(false);
  };

  const componentRef = useRef();

  let click = 0;

  // Whenever user clicks outside the popup menu, we close the menu
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current;
        if (ref.style.display == "block" && !ref.contains(e.target)) {
          click = click + 1;
          if (click > 1) {
            setOpen(false);
            click = 0;
          }
        }
      }
    }
  }, []);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
    handleMenuClick();
  };

  return (
    <div
      ref={componentRef}
      style={{
        display: open === true ? "block" : "none",
        left: pos.pageX,
        top: pos.pageY,
      }}
      className="home-page__popup-menu__data"
      id="popupMenu"
    >
      <a onClick={() => handleMenuClick()} href="#">
        Share
      </a>
      <a onClick={() => handleMenuClick()} href="#">
        Revoke Access
      </a>
      <a onClick={() => handleDeleteClick()} href="#">
        Delete
      </a>
      <a onClick={() => handleMenuClick()} href="#">
        Close
      </a>
    </div>
  );
};
