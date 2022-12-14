import { Box, IconButton, Tooltip } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getCookie } from "../utils/cookie";
import { useRouter } from "next/router";
import { Stack } from "@mui/system";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface IProps {
  name: string;
  bookmark: boolean;
  onClickBookmark: () => void;
  views: number;
  imagePath: string;
  basket?: boolean;
  onClickBasket?: () => void;
  isExternalImage?: boolean;
  allergy?: boolean;
}

export const InfoTitle: FC<IProps> = ({
  name,
  bookmark,
  onClickBookmark,
  views,
  imagePath,
  basket = false,
  onClickBasket,
  isExternalImage = false,
  allergy = false,
}) => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [basketed, setBasketed] = useState<boolean>(false);

  useEffect(() => {
    setBookmarked(bookmark);
    setBasketed(basket);
  }, [basket, bookmark]);

  return (
    <Box px={2}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Image
          width="64"
          height="64"
          src={imagePath}
          alt={name}
          style={{ borderRadius: 32 }}
          unoptimized={isExternalImage}
        />
        <Box p={1} />
        <Stack direction="row" alignItems="center">
          <p style={{ fontSize: 22, fontWeight: "bold", marginRight: "3px" }}>{name}</p>
          {allergy && (
            <Tooltip title="알러지 주의!">
              <WarningAmberIcon style={{ color: "#fd9f28" }} />
            </Tooltip>
          )}
        </Stack>

        <Box flex="1" />
        <IconButton
          style={{ color: bookmarked ? "red" : "#A1A1AA" }}
          onClick={() => {
            if (!getCookie("userName")) {
              router.push("/login");
              return;
            }
            onClickBookmark();
            setBookmarked((prev) => !prev);
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>
      <Box p={0.5} />
      <Box display="flex" flexDirection="row" alignItems="center" marginTop="10px">
        <p style={{ fontSize: 16, fontWeight: "bold" }}>
          오늘 {views.toLocaleString()}명의 사용자가 이 품목을 확인했어요!
        </p>
        {onClickBasket && (
          <>
            <Box flex="1" />
            <IconButton
              style={{ color: basketed ? "#4411AA" : "#A1A1AA" }}
              onClick={() => {
                if (!getCookie("userName")) {
                  router.push("/login");
                  return;
                }
                onClickBasket();
                setBasketed((prev) => !prev);
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};
