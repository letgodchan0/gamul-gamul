import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "./url";
import { AuthApi } from "./interfaces/authApi";
import { IngredientApi, IngredientOrderType } from "./interfaces/ingredientApi";
import { RecipeApi, RecipeOrderType } from "./interfaces/recipeApi";
import { SearchApi } from "./interfaces/searchApi";
import { MyRecipeApi } from "./interfaces/myRecipeApi";
import { MyInfoApi } from "./interfaces/myInfoApi";
import { HighClass } from "./responses/highClass";
import { IngredientDetailInfo } from "./responses/ingredientDetailInfo";
import { IngredientInfo } from "./responses/ingredientInfo";
import { OfflineMartInfo } from "./responses/offlineMartInfo";
import { RecipeDetailInfo } from "./responses/recipeDetailInfo";
import { RecipeInfo } from "./responses/recipeInfo";
import { RecipeOrderInfo } from "./responses/recipeOrderInfo";
import { YoutubeInfo } from "./responses/youtubeInfo";
import { SearchResult } from "./responses/searchResult";
import { MyRecipeDetailInfo } from "./responses/myRecipeDetailInfo";
import { MyRecipeInfo } from "./responses/myRecipeInfo";
import { MyRecipeIngredientInfo } from "./responses/myRecipeIngredientInfo";
import { LimitPriceNoticeInfo } from "./responses/limitPriceNoticeInfo";
import { LoginRes } from "./responses/loginRes";
import * as Dummy from "./dummy/dummyApi";
import { getCookie, setCookie } from "../utils/cookie";
import { NotificationInfo } from "./responses/notificationInfo";
import { getNotificationItemList } from "./dummy/dummyApi";

const delay = 0;

export class ApiClient
  implements AuthApi, IngredientApi, RecipeApi, SearchApi, MyRecipeApi, MyInfoApi
{
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }
  postRecipeView(recipeId: number): Promise<void> {
    return this.axiosInstance.request({
      method: "post",
      url: `/recipes/${recipeId}`,
    });
  }
  postIngredientView(ingredientId: number): Promise<void> {
    return this.axiosInstance.request({
      method: "post",
      url: `/ingredients/${ingredientId}`,
    });
  }
  async getNotificationInfoList(userName: string): Promise<NotificationInfo[]> {
    return (
      await this.axiosInstance.request({
        method: "post",
        url: "/user/notice/list",
        data: { user_name: userName },
      })
    ).data;
  }
  postSubscription(userName: string, subscription: String): Promise<void> {
    return this.axiosInstance.request({
      method: "post",
      url: "/user/notice/regist",
      data: { user_name: userName, subscription },
    });
  }
  async register(userName: string, password: string): Promise<void> {
    return this.axiosInstance.request({
      method: "post",
      url: `/users/register`,
      data: { user_name: userName, password },
    });
  }
  async checkId(userName: string): Promise<void> {
    return this.axiosInstance.request({
      method: "get",
      url: `/users/check/${userName}`,
    });
  }
  async login(userName: string, password: string): Promise<LoginRes> {
    return (
      await this.axiosInstance.request({
        method: "post",
        url: `/auth/login`,
        data: { user_name: userName, password },
      })
    ).data;
  }
  async withdrawal(userName: string): Promise<void> {
    return this.axiosInstance.request({
      method: "delete",
      url: `/users/${userName}`,
    });
  }
  async getIngredientList(
    orderType: IngredientOrderType,
    highClassId: number = 0
  ): Promise<IngredientInfo[]> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getIngredientList), delay));
  }
  async getBookmarkIngredientList(userName: string): Promise<IngredientInfo[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(Dummy.getBookmarkIngredientList), delay)
    );
  }
  async getIngredientDetailInfo(ingredientId: number): Promise<IngredientDetailInfo> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(Dummy.getIngredientDetailInfo), delay)
    );
  }
  async getIngredientHighClassList(): Promise<HighClass[]> {
    return (
      await this.axiosInstance.request({
        method: "get",
        url: `/ingredients/high-class`,
      })
    ).data;
  }
  async putBookmarkIngredient(userName: string, ingredientId: number): Promise<void> {
    return this.axiosInstance.request({
      method: "put",
      url: `/ingredients/bookmark/${userName}/${ingredientId}`,
    });
  }
  async putBasketIngredient(userName: string, ingredientId: number): Promise<void> {
    return this.axiosInstance.request({
      method: "put",
      url: `/ingredients/basket/${userName}/${ingredientId}`,
    });
  }
  async getOfflineMartList(
    ingredientId: number,
    southWestLatitude: number,
    southWestLongitude: number,
    northEastLatitude: number,
    northEastLongitude: number,
    latitude: number,
    longitude: number
  ): Promise<OfflineMartInfo[]> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getOfflineMartList), delay));
  }
  async getOfflineMartDetailInfo(storeId: number): Promise<IngredientInfo[]> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getIngredientList), delay));
  }
  async getBasketIngredientList(userName: string): Promise<IngredientInfo[]> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getIngredientList), delay));
  }
  async getRecipeList(
    orderType: RecipeOrderType,
    page: number,
    size: number
  ): Promise<RecipeInfo[]> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getRecipeList), delay));
  }
  async getRecipeWithBasketList(
    userName: string,
    orderType: RecipeOrderType,
    page: number,
    size: number
  ): Promise<RecipeInfo[]> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getRecipeList), delay));
  }
  async getBookmarkRecipeList(userName: string): Promise<RecipeInfo[]> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getRecipeList), delay));
  }
  async getRecipeDetailInfo(recipeId: number): Promise<RecipeDetailInfo> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getRecipeDetailInfo), delay));
  }
  async putBookmarkRecipe(userName: string, recipeId: number): Promise<void> {
    return this.axiosInstance.request({
      method: "put",
      url: `/recipes/bookmark/${userName}/${recipeId}`,
    });
  }
  async getRecipeOrderList(recipeId: number): Promise<RecipeOrderInfo[]> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getRecipeOrderList), delay));
  }
  async putBasketAllRecipeIngredient(userName: string, recipeId: number): Promise<void> {
    return this.axiosInstance.request({
      method: "put",
      url: `/recipes/${userName}/${recipeId}`,
    });
  }
  async getPopularYoutubeList(): Promise<YoutubeInfo[]> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getPopularYoutubeList), delay));
  }
  async search(keyword: string): Promise<SearchResult> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.search(keyword)), delay));
  }
  async postMyRecipe(
    userName: string,
    imageDataUrl: string,
    myRecipeName: string,
    ingredientList: MyRecipeIngredientInfo[]
  ): Promise<void> {
    return this.axiosInstance.request({
      method: "post",
      url: "/recipes/my",
      data: {
        user_name: userName,
        image_data_url: imageDataUrl,
        my_recipe_name: myRecipeName,
        ingredient_list: ingredientList,
      },
    });
  }
  async updateMyRecipe(
    userName: string,
    myRecipeId: number,
    imageDataUrl: string,
    myRecipeName: string,
    ingredientList: MyRecipeIngredientInfo[]
  ): Promise<void> {
    return this.axiosInstance.request({
      method: "put",
      url: "/recipes/my",
      data: {
        user_name: userName,
        image_data_url: imageDataUrl,
        my_recipe_name: myRecipeName,
        ingredient_list: ingredientList,
      },
    });
  }
  async getMyRecipeList(userName: string): Promise<MyRecipeInfo[]> {
    return (
      await this.axiosInstance.request({
        method: "get",
        url: `/recipes/my/${userName}`,
      })
    ).data;
  }
  async getMyRecipeDetailInfo(userName: string, myRecipeId: number): Promise<MyRecipeDetailInfo> {
    return new Promise((resolve) => setTimeout(() => resolve(Dummy.getMyRecipeDetailInfo), delay));
  }
  async getMyRecipeIngredientList(
    userName: string,
    myRecipeId: number
  ): Promise<MyRecipeIngredientInfo[]> {
    return await this.axiosInstance.request({
      method: "get",
      url: `/recipes/my/ingredients/${userName}/${myRecipeId}`,
    });
  }
  async deleteMyRecipe(userName: string, myRecipeId: number): Promise<void> {
    return this.axiosInstance.request({
      method: "delete",
      url: `/recipes/my/${userName}/${myRecipeId}`,
    });
  }
  async putAllergy(userName: string, ingredientIdList: number[]): Promise<void> {
    return this.axiosInstance.request({
      method: "post",
      url: "/user/allergy",
      data: {
        user_name: userName,
        ingredient_list: ingredientIdList,
      },
    });
  }
  async getAllergyIngredientList(userName: string): Promise<number[]> {
    return (
      await this.axiosInstance.request({
        method: "get",
        url: `/user/allergy/${userName}`,
      })
    ).data;
  }
  async postLimitPriceNotice(
    userName: string,
    limitPriceNoticeInfoList: LimitPriceNoticeInfo[]
  ): Promise<void> {
    return this.axiosInstance.request({
      method: "post",
      url: `/user/notice`,
      data: {
        user_name: userName,
        ingredient_list: limitPriceNoticeInfoList,
      },
    });
  }
  async getLimitPriceList(userName: string): Promise<LimitPriceNoticeInfo[]> {
    return (
      await this.axiosInstance.request({
        method: "get",
        url: `/user/notice/${userName}`,
      })
    ).data;
  }

  static getInstance(): ApiClient {
    return this.instance || (this.instance = new this());
  }

  registerToken(newToken: string) {
    this.axiosInstance = this.createAxiosInstance(newToken);
  }

  logout() {
    this.axiosInstance = this.createAxiosInstance();
  }

  private createAxiosInstance = (token?: string) => {
    const headers: any = {
      "content-type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${getCookie(token)}`;

      // } else if (localStorage.getItem("token")) {
      // headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    return axios.create({
      baseURL: API_BASE_URL,
      timeout: 1000,
      headers,
    });
  };
}
