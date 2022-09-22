import { Box, Grid } from "@mui/material";
import { NextPage } from "next";
import { ApiClient } from "../src/apis/apiClient";
import { RecipeOrderType } from "../src/apis/interfaces/recipeApi";
import { IngredientInfo } from "../src/apis/responses/ingredientInfo";
import { Desktop } from "../src/components/Desktop";
import { Mobile } from "../src/components/Mobile";
import { Tablet } from "../src/components/Tablet";
import { IngredientListComp } from "../src/components/templates/IngredientListComp";
import { RecipeInfo } from "../src/apis/responses/recipeInfo";
import styles from "../styles/Page.module.css";
import { RecipeListComp } from "../src/components/templates/RecipeListComp";

interface IProps {
  basketIngredientList: IngredientInfo[];
  totalPrice: number;
  recipeListWithBasket: RecipeInfo[];
}

const BasketPage: NextPage<IProps> = ({
  basketIngredientList,
  totalPrice,
  recipeListWithBasket,
}) => {
  return (
    <Box>
      <Desktop>
        <Grid container className={styles.PageforDesktop} direction="row" alignItems="stretch">
          <Grid item xs position="relative">
            <IngredientListComp
              direction="row"
              scrollDirection="vertical"
              title="바구니"
              ingredientList={basketIngredientList}
              gridSize={4}
              totalPrice={totalPrice}
              style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
            />
          </Grid>
          <Grid item xs position="relative">
            <RecipeListComp
              scrollDirection="vertical"
              direction="row"
              title="요리법 with 바구니"
              recipeList={recipeListWithBasket}
              style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
            />
          </Grid>
        </Grid>
      </Desktop>
      <Tablet>
        <Box className={styles.PageforTablet}>
          <IngredientListComp
            title="바구니"
            ingredientList={basketIngredientList}
            rowSize={2}
            gridSize={6}
            totalPrice={totalPrice}
          />
          <RecipeListComp
            scrollDirection="vertical"
            direction="row"
            title="요리법 with 바구니"
            recipeList={recipeListWithBasket}
          />
        </Box>
      </Tablet>
      <Mobile>
        <Box className={styles.PageforMobile}>
          <IngredientListComp
            title="바구니"
            ingredientList={basketIngredientList}
            rowSize={1}
            totalPrice={totalPrice}
          />
          <RecipeListComp
            scrollDirection="vertical"
            direction="row"
            title="요리법 with 바구니"
            recipeList={recipeListWithBasket}
          />
        </Box>
      </Mobile>
    </Box>
  );
};

export default BasketPage;

export async function getServerSideProps() {
  const userName = "";
  const apiClient = ApiClient.getInstance();
  const basketIngredientList = await apiClient.getBasketIngredientList(userName);
  const totalPrice = basketIngredientList.reduce((p, c) => p + c.price, 0);
  const recipeListWithBasket = await apiClient.getRecipeWithBasketList(
    userName,
    RecipeOrderType.NAME_ASC,
    1,
    100
  );

  return {
    props: {
      basketIngredientList,
      totalPrice,
      recipeListWithBasket,
    },
  };
}
