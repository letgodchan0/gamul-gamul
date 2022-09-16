package com.gamul.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MyRecipeIngredientReq")
public class MyRecipeIngredientReq {
    @JsonProperty("user_name")
    @ApiModelProperty(name="유저 ID", example="your_Id")
    String userName;

    @JsonProperty("my_recipe_id")
    int myRecipeId;
}
