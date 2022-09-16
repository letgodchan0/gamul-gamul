package com.gamul.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RecipeDetailReq")
public class RecipeDetailReq {
    @JsonProperty("recipe_id")
    int recipeId;
}
