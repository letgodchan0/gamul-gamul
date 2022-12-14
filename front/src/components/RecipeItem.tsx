import { Avatar, Box, ButtonBase, IconButton, styled } from "@mui/material";
import React, { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { RecipeInfo } from "../apis/responses/recipeInfo";

const ItemButton = styled(ButtonBase)(() => ({
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
  },
}));

type Direction = "row" | "column";

interface IProps {
  direction: Direction;
  recipeInfo: RecipeInfo;
  onDelete?: () => void;
  onClickItem: (id: number) => void;
}

export const RecipeItem: FC<IProps> = ({ direction, recipeInfo, onDelete, onClickItem }) => {
  const onMouseDownDelete = (e: any) => {
    e.stopPropagation();
  };
  const onClickDelete = (e: any) => {
    onDelete?.();
    e.stopPropagation();
  };
  const avatarSize = direction === "row" ? 42 : 60;
  return (
    <ItemButton
      style={{
        borderRadius: 10,
        padding: direction == "column" ? 15 : 0,
        width: direction === "row" ? "100%" : "auto",
        visibility: recipeInfo ? "visible" : "hidden",
      }}
      onClick={() => onClickItem(recipeInfo?.recipe_id || 0)}
    >
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={direction}
      >
        <Box position="relative" style={{ margin: direction === "column" ? 3 : 12 }}>
          <Avatar style={{ width: avatarSize, height: avatarSize }} src={recipeInfo?.image_path} />
          {onDelete && (
            <IconButton
              style={{ position: "absolute", right: -20, top: -15 }}
              color="inherit"
              onMouseDown={onMouseDownDelete}
              onClick={onClickDelete}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <p
          style={{
            height: "30px",
            fontSize: 12,
            fontWeight: "bold",
            margin: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {recipeInfo?.name || "??????"}
        </p>
        <Box flex={1} />
        {direction === "row" && (
          <p style={{ fontSize: 8, marginRight: "12px" }}>{recipeInfo?.desc || "??????"}</p>
        )}
      </Box>
    </ItemButton>
  );
};
