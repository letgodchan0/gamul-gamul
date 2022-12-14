import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { SearchResult } from "../../apis/responses/searchResult";
import { ApiClient } from "../../apis/apiClient";
import { IngredientListComp } from "./IngredientListComp";
import { RecipeListComp } from "./RecipeListComp";
import { useRouter } from "next/router";

interface IProps {
  searchKeyword: string;
  onCloseSearch: () => void;
}

export const SearchResultComp: FC<IProps> = ({ searchKeyword, onCloseSearch }) => {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<SearchResult | undefined>();
  useEffect(() => {
    async function search(searchKeyword: string) {
      const apiClient = ApiClient.getInstance();
      const data = await apiClient.search(searchKeyword);
      setSearchResult(data);
    }
    search(searchKeyword);
  }, [searchKeyword]);

  return (
    <Box overflow="auto" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      {searchResult?.ingredient_list && (
        <IngredientListComp
          type="row"
          ingredientList={searchResult.ingredient_list}
          onClickItem={(id) => {
            onCloseSearch();
            router.push(`/ingredient-info/${id}`);
          }}
        />
      )}
      {searchResult?.recipe_list && (
        <RecipeListComp
          type="row"
          recipeList={searchResult.recipe_list}
          onClickItem={(id) => {
            onCloseSearch();
            router.push(`/recipe-info/${id}`);
          }}
        />
      )}
    </Box>
  );
};
