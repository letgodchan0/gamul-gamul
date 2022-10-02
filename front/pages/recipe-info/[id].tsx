import { NextPage } from "next";
import { useRouter } from "next/router";
import { ApiClient } from "../../src/apis/apiClient";
import { RecipeDetailInfo } from "../../src/apis/responses/recipeDetailInfo";
import { Desktop } from "../../src/components/Desktop";
import { Mobile } from "../../src/components/Mobile";
import { Tablet } from "../../src/components/Tablet";
import { BackHeader } from "../../src/components/BackHeader";
import { InfoTitle } from "../../src/components/InfoTitle";
import { Box } from "@mui/system";
import styles from "../../styles/Page.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { ButtonOutlined } from "../../src/components/button/ButtonOutlined";
import { IngredientListComp } from "../../src/components/templates/IngredientListComp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CardContainer } from "../../src/components/CardContainer";
import { YoutubeRecipeListComp } from "../../src/components/templates/YoutubeRecipeListComp";
import { Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { saveRecentSearchLocalStorage } from "../../src/utils/localStorageUtil";

interface IProps {
  recipeDetailInfo: RecipeDetailInfo;
  totalPrice: number;
}

const RecipeInfoPage: NextPage<IProps> = ({
  recipeDetailInfo: { recipe_info, extra_ingredient_list, ingredient_list, youtube_list },
  totalPrice,
}) => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    saveRecentSearchLocalStorage("recipe", recipe_info.recipe_id, recipe_info.name);
  }, [recipe_info.recipe_id, recipe_info.name]);

  const onClickBookmark = () => {};
  const onClickStartCook = () => {
    router.push(`/recipe-detail/${id}`);
  };
  const onClickPutBasket = () => {};
  return (
    <Box>
      <Desktop>
        <Box className={styles.PageforDesktop}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>
              <InfoTitle
                name={recipe_info.name}
                bookmark={recipe_info.bookmark}
                onClickBookmark={onClickBookmark}
                views={recipe_info.views}
                imagePath={recipe_info.image_path}
                isExternalImage={true}
              />
            </Grid>
            <Grid item xs={4} display="flex" flexDirection="column" alignItems="stretch">
              <ButtonOutlined
                text="요리법 시작하기"
                icon={<PlayCircleIcon />}
                onClick={onClickStartCook}
                style={{
                  marginTop: "10px",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              />
              <ButtonOutlined
                text="재료 모두 담기"
                icon={<ShoppingCartIcon />}
                onClick={onClickPutBasket}
                style={{
                  marginTop: "20px",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: "10px" }}>
            <Grid item xs={8}>
              <IngredientListComp
                title="식재료"
                ingredientList={ingredient_list}
                rowSize={2}
                gridSize={5}
                totalPrice={totalPrice}
              />
              <CardContainer title="기타 재료">
                <p style={{ fontSize: 14, marginLeft: 10 }}>
                  {extra_ingredient_list.reduce((p, c) => (p === "" ? c : `${p}, ${c}`), "")}
                </p>
              </CardContainer>
            </Grid>
            <Grid item xs={4}>
              <YoutubeRecipeListComp youtubeInfoList={youtube_list} />
            </Grid>
          </Grid>
        </Box>
      </Desktop>
      <Tablet>
        <Box className={styles.PageforTablet}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>
              <InfoTitle
                name={recipe_info.name}
                bookmark={recipe_info.bookmark}
                onClickBookmark={onClickBookmark}
                views={recipe_info.views}
                imagePath={recipe_info.image_path}
                isExternalImage={true}
              />
            </Grid>
            <Grid item xs={4} display="flex" flexDirection="column" alignItems="stretch">
              <ButtonOutlined
                text="요리법 시작하기"
                icon={<PlayCircleIcon />}
                onClick={onClickStartCook}
                style={{
                  marginTop: "10px",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              />
              <ButtonOutlined
                text="재료 모두 담기"
                icon={<ShoppingCartIcon />}
                onClick={onClickPutBasket}
                style={{
                  marginTop: "20px",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              />
            </Grid>
          </Grid>
          <Box marginTop="10px">
            <IngredientListComp
              title="식재료"
              ingredientList={ingredient_list}
              rowSize={2}
              gridSize={5}
              totalPrice={totalPrice}
            />
            <CardContainer title="기타 재료">
              <p style={{ fontSize: 14, marginLeft: 10 }}>
                {extra_ingredient_list.reduce((p, c) => (p === "" ? c : `${p}, ${c}`), "")}
              </p>
            </CardContainer>
            <YoutubeRecipeListComp youtubeInfoList={youtube_list} gridSize={2} />
          </Box>
        </Box>
      </Tablet>
      <Mobile>
        <BackHeader />
        <Box
          className={styles.PageforMobile}
          display="flex"
          flexDirection="column"
          alignItems="stretch"
        >
          <InfoTitle
            name={recipe_info.name}
            bookmark={recipe_info.bookmark}
            onClickBookmark={onClickBookmark}
            views={recipe_info.views}
            imagePath={recipe_info.image_path}
            isExternalImage={true}
          />
          <ButtonOutlined
            text="요리법 시작하기"
            icon={<PlayCircleIcon />}
            onClick={onClickStartCook}
            style={{
              marginTop: "20px",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          />
          <IngredientListComp
            title="식재료"
            ingredientList={ingredient_list}
            rowSize={2}
            gridSize={3}
            totalPrice={totalPrice}
          />
          <ButtonOutlined
            text="재료 모두 담기"
            icon={<ShoppingCartIcon />}
            onClick={onClickPutBasket}
            style={{
              marginLeft: "15px",
              marginRight: "15px",
            }}
          />
          <CardContainer title="기타 재료">
            <p style={{ fontSize: 14, marginLeft: 10 }}>
              {extra_ingredient_list.reduce((p, c) => (p === "" ? c : `${p}, ${c}`), "")}
            </p>
          </CardContainer>
          <YoutubeRecipeListComp youtubeInfoList={youtube_list} />
        </Box>
      </Mobile>
    </Box>
  );
};

export default RecipeInfoPage;

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const apiClient = ApiClient.getInstance();
  const recipeDetailInfo = await apiClient.getRecipeDetailInfo(+id);
  const totalPrice = recipeDetailInfo.ingredient_list.reduce((p, c) => p + c.price, 0);

  return {
    props: {
      recipeDetailInfo,
      totalPrice,
    },
  };
}