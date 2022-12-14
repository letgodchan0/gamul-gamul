import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ApiClient } from "../src/apis/apiClient";
import { IngredientOrderType } from "../src/apis/interfaces/ingredientApi";
import { getCookie } from "../src/utils/cookie";
import { IngredientInfo } from "../src/apis/responses/ingredientInfo";
import { Box, IconButton, Stack } from "@mui/material";
import { IngredientItem } from "../src/components/IngredientItem";
import { BackHeader } from "../src/components/BackHeader";
import { Mobile } from "../src/components/Mobile";
import { DebounceInput } from "react-debounce-input";
import SearchIcon from "@mui/icons-material/Search";
import searchStyles from "../styles/SearchHeaderBar.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/router";
import { Tablet } from "../src/components/Tablet";
import { Desktop } from "../src/components/Desktop";
import styles from "../styles/Page.module.css";
import { Page } from '../src/components/Page';

interface IProps {
  ingredientList: IngredientInfo[];
}

const AllergyRegisterPage: NextPage<IProps> = ({ ingredientList }) => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchedIngredientList, setSearchedIngredientList] = useState<IngredientInfo[]>([]);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  useEffect(() => {
    ApiClient.getInstance()
      .getAllergyIngredientList(getCookie("userName"))
      .then((data) => setSelectedList(data));
  }, []);
  useEffect(() => {
    setSearchedIngredientList(ingredientList.filter((v) => v.name.includes(searchKeyword)));
  }, [ingredientList, searchKeyword]);
  const onClickDelete = (id: number) => {
    setSelectedList((prev) => {
      const idx = prev.findIndex((v) => v === id);
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };
  const onClickItem = (id: number) => {
    if (selectedList.find((v) => v === id)) {
      onClickDelete(id);
    } else {
      setSelectedList((prev) => [...prev, id]);
    }
  };
  const onClickSave = () => {
    ApiClient.getInstance()
      .putAllergy(getCookie("userName"), selectedList)
      .then(() => router.back());
  };

  const Comp = (hideBackHeader: boolean, navBarWidth?: String) => (
    <Box bgcolor="white" minHeight="100vh">
      <Box
        position="fixed"
        width={`calc(100% - ${navBarWidth || "0px"})`}
        bgcolor="white"
        zIndex="10"
      >
        {!hideBackHeader && (
          <BackHeader
            backgroundColor="white"
            text="????????? ?????? ??????"
            end={
              <IconButton onClick={onClickSave}>
                <CheckIcon />
              </IconButton>
            }
          />
        )}
        {hideBackHeader && (
          <Box display="flex" flexDirection="row" justifyContent="end">
            <IconButton onClick={onClickSave}>
              <CheckIcon />
            </IconButton>
          </Box>
        )}
        <Box paddingTop={hideBackHeader ? "0" : "50px"}>
          <Stack
            direction="row"
            style={{
              overflowX: "auto",
            }}
          >
            {selectedList.map((v) => (
              <Box minWidth="95px" key={v}>
                <IngredientItem
                  direction="column"
                  ingredientInfo={ingredientList.find((it) => it.ingredient_id === v)!}
                  onClickItem={() => onClickDelete(v)}
                  onDelete={() => onClickDelete(v)}
                />
              </Box>
            ))}
          </Stack>

          <Box height="40px" paddingX="15px">
            <Box
              maxWidth="500px"
              height="40px"
              borderRadius="20px"
              display="flex"
              bgcolor="#f5f5f5"
              alignItems="center"
              paddingX="10px"
              marginTop="10px"
            >
              <DebounceInput
                className={searchStyles.input}
                forceNotifyByEnter={true}
                forceNotifyOnBlur={true}
                value={searchKeyword}
                onChange={(e: any) => setSearchKeyword(e.target.value)}
                debounceTimeout={300}
                placeholder="????????? ??????"
                style={{
                  backgroundColor: "inherit",
                }}
              />
              <SearchIcon color="success" style={{ width: "20px", height: "20px" }} />
            </Box>
          </Box>

          <p style={{ fontSize: "16px", fontWeight: "bold", margin: "15px", color: "#A1A1AA" }}>
            ?????????
          </p>
        </Box>
      </Box>

      <Stack
        direction="column"
        paddingTop={selectedList.length === 0 ? "160px" : "320px"}
        paddingBottom="60px"
      >
        {searchedIngredientList.length !== 0 ? (
          <>
            {searchedIngredientList.map((v) => (
              <Stack direction="row" key={v.ingredient_id}>
                <IngredientItem
                  direction="row"
                  ingredientInfo={v}
                  onClickItem={() => onClickItem(v.ingredient_id)}
                  tail={
                    selectedList.find((it) => it === v.ingredient_id) ? (
                      <CheckCircleIcon color="success" style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <Box
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "20px",
                          borderColor: "#D9D9D9",
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      />
                    )
                  }
                />
              </Stack>
            ))}
          </>
        ) : (
          <p style={{ fontSize: "14px", fontWeight: "bold", margin: "15px", marginTop: "30px" }}>
            ?????? ????????? ?????????.
          </p>
        )}
      </Stack>
    </Box>
  );

  return (
    <Page>
      <Desktop>
        <Box className={styles.PageforDesktop}>{Comp(true, "250px")}</Box>
      </Desktop>
      <Tablet>
        <Box className={styles.PageforTablet}>{Comp(true, "150px")}</Box>
      </Tablet>
      <Mobile>{Comp(false)}</Mobile>
    </Page>
  );
};

export default AllergyRegisterPage;

export async function getStaticProps() {
  const apiClient = ApiClient.getInstance();
  const ingredientList = await apiClient.getIngredientList(IngredientOrderType.NAME_ASC);

  return {
    props: {
      ingredientList,
    },
  };
}
