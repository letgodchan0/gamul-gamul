import { NextPage } from "next";
import { useRouter } from "next/router";
import { ApiClient } from "../../src/apis/apiClient";
import { getCookie } from "../../src/utils/cookie";
import { IngredientInfo } from "../../src/apis/responses/ingredientInfo";
import { PriceTransitionInfo } from "../../src/apis/responses/priceTransitionInfo";
import { Desktop } from "../../src/components/Desktop";
import { Tablet } from "../../src/components/Tablet";
import { Mobile } from "../../src/components/Mobile";
import { Avatar, Box, IconButton } from "@mui/material";
import styles from "../../styles/Page.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { IngredientListComp } from "../../src/components/templates/IngredientListComp";
import IngredientPriceGraph from "../../src/components/IngredientPriceGraph";
import { ButtonFill } from "../../src/components/button/ButtonFill";
import { BackHeader } from "../../src/components/BackHeader";
import { useEffect, useState } from "react";
import { CardContainer } from "../../src/components/CardContainer";
import { MyIngredientPriceComp } from '../../src/components/templates/MyIngredientPriceComp';
import { MyRecipeDetailInfo } from '../../src/apis/responses/myRecipeDetailInfo';
import { Page } from '../../src/components/Page';

interface IProps {
  blackList: number[];
}

const MyRecipeInfoPage: NextPage<IProps> = ({ blackList }) => {
  const router = useRouter();
  const { id } = router.query;
  const apiClient = ApiClient.getInstance();
  const [graph, setGraph] = useState(true);
  const [myRecipeDetailInfo, setMyRecipeDetailInfo] = useState<MyRecipeDetailInfo>({
    ingredient_list: [],
    image_path: "",
    name: "",
    price_transition_info: {
      before_price: 0,
      pastvol: 0,
      price: 0,
      todayvol: 0,
      retailsales: {
        daily: [],
        monthly: [],
        yearly: [],
      },
      wholesales: {
        daily: [],
        monthly: [],
        yearly: [],
      },
    },
    total_price: 0,
  });

  useEffect(() => {
    ApiClient.getInstance()
      .getMyRecipeDetailInfo(getCookie("userName"), Number(id))
      .then((data) => setMyRecipeDetailInfo(data));
      console.log("????????? ??????");
  }, []);

  useEffect(() => {
    console.log("????????? ?????? : "+ graph);
  }, [graph]);

  useEffect(() => {
    myRecipeDetailInfo.ingredient_list.forEach((v) => {
      console.log(v.ingredient_id);
      if (blackList.includes(Number(v.ingredient_id))) {
        console.log("??????");
        setGraph(false);
      }
    });
  }, [myRecipeDetailInfo, blackList]);

  const modifyRecipe = () => {
    router.push({
      pathname: "/register-my-recipe",
      query: { id: id },
    });
  };

  const deleteRecipe = async () => {
    // ????????? ????????? ?????? api ??????
    apiClient.deleteMyRecipe(getCookie("userName"), Number(id));
    router.push("/my-recipe");
  };

  return (
    <Page>
      <Desktop>
        <Box className={styles.PageforDesktop}>
          <Box sx={{ display: "flex", margin: "10px 10px 0px 20px" }}>
            <Avatar
              src={myRecipeDetailInfo.image_path}
              alt="????????????????????????"
              sx={{ width: "60px", height: "60px" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              <h3>{myRecipeDetailInfo.name}</h3>
            </Box>
            <IconButton onClick={modifyRecipe}>
              <EditIcon color="secondary" />
            </IconButton>
          </Box>
          <IngredientListComp
            ingredientList={myRecipeDetailInfo.ingredient_list}
            totalPrice={myRecipeDetailInfo.total_price}
            rowSize={2}
            gridSize={5}
            itemTitle={(v) => v && `${v.name} (${v.my_quantity}${v.unit})`}
            />
          <MyIngredientPriceComp
            inputWidth="98%"
            inputHeight={500}
            priceTransitionInfo={myRecipeDetailInfo.price_transition_info}
            graph={graph}
          />
          <Box sx={{ display: "flex", justifyContent: "center", padding: "15px" }}>
            <ButtonFill
              onClick={deleteRecipe}
              text="????????? ????????? ??????"
              height="50px"
              width="350px"
              maxWidth="350px"
              fontSize="13px"
              disabled={false}
            />
          </Box>
        </Box>
      </Desktop>
      <Tablet className={styles.PageforTablet}>
        <Box sx={{ display: "flex", margin: "10px 10px 0px 20px" }}>
          <Avatar
            src={myRecipeDetailInfo.image_path}
            alt="????????????????????????"
            sx={{ width: "60px", height: "60px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <h3>{myRecipeDetailInfo.name}</h3>
          </Box>
          <IconButton onClick={modifyRecipe}>
            <EditIcon color="secondary" />
          </IconButton>
        </Box>
        <IngredientListComp
          ingredientList={myRecipeDetailInfo.ingredient_list}
          totalPrice={myRecipeDetailInfo.total_price}
          rowSize={2}
          gridSize={5}
          itemTitle={(v) => v && `${v.name} (${v.my_quantity}${v.unit})`}
        />
       <MyIngredientPriceComp
            inputWidth="98%"
            inputHeight={500}
            priceTransitionInfo={myRecipeDetailInfo.price_transition_info}
            graph={graph}
          />
        <Box sx={{ display: "flex", justifyContent: "center", padding: "15px" }}>
          <ButtonFill
            onClick={deleteRecipe}
            text="????????? ????????? ??????"
            height="50px"
            width="350px"
            maxWidth="350px"
            fontSize="13px"
            disabled={false}
          />
        </Box>
      </Tablet>
      <Mobile>
        <BackHeader />
        <Box sx={{ display: "flex" }} className={styles.PageforMobile}>
          <Avatar
            src={myRecipeDetailInfo.image_path}
            alt="????????????????????????"
            sx={{ width: "60px", height: "60px", marginLeft: "15px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginLeft: "20px",
            }}
          >
            <h3>{myRecipeDetailInfo.name}</h3>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <IconButton onClick={modifyRecipe}>
                <EditIcon color="secondary" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <IngredientListComp
          ingredientList={myRecipeDetailInfo.ingredient_list}
          totalPrice={myRecipeDetailInfo.total_price}
          itemTitle={(v) => v && `${v.name} (${v.my_quantity}${v.unit})`}
        />
        <MyIngredientPriceComp
            inputWidth="98%"
            inputHeight={400}
            priceTransitionInfo={myRecipeDetailInfo.price_transition_info}
            graph={graph}
          />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "75px",
          }}
        >
          <ButtonFill
            onClick={deleteRecipe}
            text="????????? ????????? ??????"
            height="50px"
            width="350px"
            maxWidth="350px"
            fontSize="13px"
            disabled={false}
          />
        </Box>
      </Mobile>
    </Page>
  );
};

export default MyRecipeInfoPage;

export const getServerSideProps = async () => {
  const apiClient = ApiClient.getInstance();
  // const blackList = await apiClient.getBlackList();
  const blackList: number[] = [];

  return {
    props: {
      blackList,
    },
  };
};
