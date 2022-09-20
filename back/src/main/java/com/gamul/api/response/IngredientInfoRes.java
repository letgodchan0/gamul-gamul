package com.gamul.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("IngredientInfoRes")
public class IngredientInfoRes {
    @JsonProperty("ingredient_id")
    int ingredient;

    String name;

    int price;

    String unit;

    int quantity;

    int volatility;

    boolean allergy;

    boolean favorite;

    boolean basket;

    @JsonProperty("high_class_id")
    int highClassId;

    @JsonProperty("high_class_name")
    String highClassName;
}