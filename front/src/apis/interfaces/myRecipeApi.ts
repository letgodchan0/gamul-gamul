import { MyRecipeDetailInfo } from "../responses/myRecipeDetailInfo";
import { MyRecipeInfo } from "../responses/myRecipeInfo";
import { MyRecipeIngredientInfo } from "../responses/myRecipeIngredientInfo";

export interface MyRecipeApi {
  /**
   * 나만의 요리법 등록
   * @param userName 유저 ID
   * @param myRecipeName 나만의 요리법 이름
   * @param image_data_url 사용자가 업로드한 나만의요리법 사진 base64 기반 스트링
   * @param ingredientList 요리법에 들어가는 식재료 ID와 단량 리스트
   */
postMyRecipe(
    userName: string,
    image_data_url: string, 
    myRecipeName: string,
    ingredientList: MyRecipeIngredientInfo[]
  ): Promise<void>;
  /**
   * 나만의 요리법 편집
   * @param userName 유저 ID
   * @param myRecipeId 나만의 요리법 ID
   * @param image_data_url 사용자가 업로드한 나만의요리법 사진 base64 기반 스트링
   * @param myRecipeName 나만의 요리법 이름
   * @param ingredientList 요리법에 들어가는 식재료 ID와 단량 리스트
   */
  updateMyRecipe(
    userName: string,
    myRecipeId: number,
    image_data_url: string, 
    myRecipeName: string,
    ingredientList: MyRecipeIngredientInfo[]
  ): Promise<void>;
  /**
   * 나만의 요리법 목록 조회
   * @param userName 유저 ID
   */
  getMyRecipeList(userName: string): Promise<MyRecipeInfo[]>;
  /**
   * 나만의 요리법 상세 정보 조회
   * @param userName 유저 ID
   * @param myRecipeId 나만의 요리법 ID
   */
  getMyRecipeDetailInfo(userName: string, myRecipeId: number): Promise<MyRecipeDetailInfo>;
  /**
   * 나만의 요리법 식재료 조회
   * @param userName 유저 ID
   * @param myRecipeId 나만의 요리법 ID
   */
  getMyRecipeIngredientList(userName: string, myRecipeId: number): Promise<MyRecipeIngredientInfo[]>;
  /**
   * 나만의 요리법 삭제
   * @param userName 유저 ID
   * @param myRecipeId 나만의 요리법 ID
   */
  deleteMyRecipe(userName: string, myRecipeId: number): Promise<void>;
}
