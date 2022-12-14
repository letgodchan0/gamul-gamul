package com.gamul.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PriceTransitionInfoRes")
public class PriceTransitionInfoRes {
    @JsonProperty("before_price")
    int beforePrice;

    int price;

    SaleInfoRes wholesales;

    SaleInfoRes retailsales;

    // 어제 물가 변동
    double pastvol;
    // 오늘 물가 변동
    double todayvol;


}
