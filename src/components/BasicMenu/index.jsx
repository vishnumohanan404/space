import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useDispatch } from "react-redux";

export default function BasicMenu({ children, elements, post, deletePost }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ boxShadow: "none" }}>
      <Options
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <IoEllipsisHorizontal />
      </Options>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        elevation={1}
      >
        {/* <MenuItem onClick={deletePost(post)}>Edit {post.postContent}</MenuItem> */}
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(deletePost(post._id));
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

const Options = styled.div`
  padding: 1rem;
  border-radius: 50%;
  line-height: 50%;
  transition: background-color 0.2s ease;
  cursor: pointer;
  :hover {
    background: #f2f2f2;
  }
`;
