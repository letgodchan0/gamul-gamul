import { HighClass } from "../responses/highClass";
import { IngredientDetailInfo } from "../responses/ingredientDetailInfo";
import { IngredientInfo } from "../responses/ingredientInfo";
import { OfflineMartInfo } from "../responses/offlineMartInfo";
import { RecipeDetailInfo } from "../responses/recipeDetailInfo";
import { RecipeInfo } from "../responses/recipeInfo";
import { RecipeOrderInfo } from "../responses/recipeOrderInfo";
import { YoutubeInfo } from "../responses/youtubeInfo";
import { SearchResult } from "../responses/searchResult";
import { MyRecipeInfo } from "../responses/myRecipeInfo";
import { MyRecipeDetailInfo } from "../responses/myRecipeDetailInfo";
import { MyRecipeIngredientInfo } from "../responses/myRecipeIngredientInfo";
import { LimitPriceNoticeInfo } from "../responses/limitPriceNoticeInfo";

export const getIngredientList: IngredientInfo[] = Array.from({ length: 100 }, (_, i) => i).map(
  (it) => ({
    ingredient_id: it + 1,
    name: `사과 ${it + 1}`,
    price: Math.ceil(10000 * Math.random()),
    unit: "kg",
    quantity: 1,
    volatility: Math.ceil(100 * Math.random() * (Math.random() > 0.5 ? 1 : -1)),
    allergy: Math.random() > 0.5,
    bookmark: Math.random() > 0.5,
    basket: Math.random() > 0.5,
  })
);

export const getBookmarkIngredientList: IngredientInfo[] = Array.from(
  { length: 79 },
  (_, i) => i
).map((it) => ({
  ingredient_id: 1,
  name: `사과 ${it + 1}`,
  price: Math.ceil(10000 * Math.random()),
  unit: "kg",
  quantity: 1,
  volatility: Math.ceil(100 * Math.random() * (Math.random() > 0.5 ? 1 : -1)),
  allergy: Math.random() > 0.5,
  bookmark: true,
  basket: Math.random() > 0.5,
}));

export const getIngredientDetailInfo: IngredientDetailInfo = {
  ingredient_info: {
    ingredient_id: 5,
    name: "빵또아",
    price: 2000,
    unit: "개",
    quantity: 1,
    volatility: 100,
    allergy: false,
    bookmark: true,
    basket: false,
  },
  views: 25040,
  price_transition_info: {
    before_price: 1000,
    price: 2000,
    wholesales: {
      daily: [
        {
          date: "2022-09-12",
          price: 100,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 200,
          unit: "개",
          quantity: 1,
        },
      ],
      monthly: [
        {
          date: "2022-08-13",
          price: 100,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 200,
          unit: "개",
          quantity: 1,
        },
      ],
      yearly: [
        {
          date: "2021-09-13",
          price: 100,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 200,
          unit: "개",
          quantity: 1,
        },
      ],
    },
    retailsales: {
      daily: [
        {
          date: "2022-09-12",
          price: 1000,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 2000,
          unit: "개",
          quantity: 1,
        },
      ],
      monthly: [
        {
          date: "2022-08-13",
          price: 1000,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 2000,
          unit: "개",
          quantity: 1,
        },
      ],
      yearly: [
        {
          date: "2021-09-13",
          price: 1000,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 2000,
          unit: "개",
          quantity: 1,
        },
      ],
    },
  },
  online_mart_info: [
    {
      image_path: "https://img.danawa.com/cmpny_info/images/ED910_logo.gif",
      name: "인터파크",
      price: 2020,
      url: "https://shopping.interpark.com/product/productInfo.do?prdNo=8519195204&dispNo=016001&bizCd=P01415&utm_medium=affiliate&utm_source=danawa&utm_campaign=shop_20211015_danawa_p01415_cps&utm_content=conversion_47",
    },
    {
      image_path: "https://img.danawa.com/cmpny_info/images/TH201_logo.gif",
      name: "11번가",
      price: 2080,
      url: "https://www.11st.co.kr/products/4564092401?service_id=pcdn&utm_term=&utm_campaign=%B4%D9%B3%AA%BF%CDpc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B4%D9%B3%AA%BF%CD_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3",
    },
    {
      image_path: "https://img.danawa.com/cmpny_info/images/EE128_logo.gif",
      name: "G마켓",
      price: 2130,
      url: "http://item.gmarket.co.kr/DetailView/Item.asp?goodscode=2475349781&GoodsSale=Y&jaehuid=200002657&service_id=pcdn",
    },
  ],
};

export const getIngredientHighClassList: HighClass[] = [
  {
    high_class_id: 1,
    name: "곡식류",
  },
  {
    high_class_id: 2,
    name: "과일류",
  },
  {
    high_class_id: 3,
    name: "정육",
  },
  {
    high_class_id: 4,
    name: "과자류",
  },
  {
    high_class_id: 5,
    name: "빙과류",
  },
  {
    high_class_id: 6,
    name: "베이커리류",
  },
  {
    high_class_id: 7,
    name: "몰류",
  },
  {
    high_class_id: 8,
    name: "삼류",
  },
];

export const getOfflineMartList: OfflineMartInfo[] = [
  {
    name: "자유시장",
    price: 1000,
    latitude: 37.4834,
    longitude: 126.7804,
  },
  {
    name: "이마트",
    price: 1000,
    latitude: 37.4842,
    longitude: 126.7823,
  },
];

export const getBasketIngredientList: IngredientInfo[] = [
  {
    ingredient_id: 1,
    name: "보리",
    price: 2500,
    unit: "kg",
    quantity: 1,
    volatility: 20,
    allergy: false,
    bookmark: true,
    basket: true,
  },
  {
    ingredient_id: 2,
    name: "고구마",
    price: 1000,
    unit: "kg",
    quantity: 1,
    volatility: -20,
    allergy: false,
    bookmark: true,
    basket: true,
  },
  {
    ingredient_id: 3,
    name: "고추",
    price: 2000,
    unit: "kg",
    quantity: 1,
    volatility: -80,
    allergy: false,
    bookmark: true,
    basket: true,
  },
  {
    ingredient_id: 4,
    name: "초코파이",
    price: 2000,
    unit: "kg",
    quantity: 1,
    volatility: 0,
    allergy: false,
    bookmark: true,
    basket: true,
  },
  {
    ingredient_id: 5,
    name: "빵또아",
    price: 2000,
    unit: "kg",
    quantity: 1,
    volatility: 60,
    allergy: false,
    bookmark: true,
    basket: true,
  },
];

export const getRecipeList: RecipeInfo[] = Array.from({length: 88}, (_, i) => i).map((it) => ({
  recipe_id: it + 1,
  image_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
  name: `가지무침 ${it + 1}`,
  desc: "맛있는 가지무침~~~~~",
  bookmark: true,
}));

export const getRecipeDetailInfo: RecipeDetailInfo = {
  recipe_info: {
    recipe_id: 1,
    image_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    name: "가지무침",
    desc: "맛있는 가지무침~~~~~",
    bookmark: true,
  },
  ingredient_list: [
    {
      ingredient_id: 1,
      name: "사과",
      price: 1000,
      unit: "kg",
      quantity: 1,
      volatility: 20,
      allergy: false,
      bookmark: false,
      basket: false,
    },
    {
      ingredient_id: 2,
      name: "가지",
      price: 1500,
      unit: "kg",
      quantity: 1,
      volatility: 20,
      allergy: true,
      bookmark: false,
      basket: false,
    },
  ],
  extra_ingredient_list: ["간장", "소금", "참기름"],
  youtube_list: [
    {
      thumbnail_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
      name: "맛있는 가지무침 무작정 따라하기",
      channel_name: "가지무침장인",
      view: 10000000,
      date: "3일 전",
      url: "https://www.youtube.com/watch?v=Ujjdn2wMIew&list=PLZKTXPmaJk8Lx3TqPlcEAzTL8zcpBz7NP&index=1",
    },
  ],
};

export const getRecipeOrderList: RecipeOrderInfo[] = [
  {
    image_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    desc: "가지를 맛있게 손질하기",
  },
  {
    image_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    desc: "가지를 맛있게 볶기",
  },
  {
    image_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    desc: "가지를 맛있게 쳐다보기",
  },
  {
    image_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    desc: "가지를 냠냠 먹기",
  },
];

export const getPopularYoutubeList: YoutubeInfo[] = [
  {
    thumbnail_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    name: "맛있는 가지무침 무작정 따라하기1",
    channel_name: "가지무침장인",
    view: 10000000,
    date: "3일 전",
    url: "https://www.youtube.com/watch?v=Ujjdn2wMIew&list=PLZKTXPmaJk8Lx3TqPlcEAzTL8zcpBz7NP&index=1",
  },
  {
    thumbnail_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    name: "맛있는 가지무침 무작정 따라하기2",
    channel_name: "가지무침장인",
    view: 10000000,
    date: "3일 전",
    url: "https://www.youtube.com/watch?v=Ujjdn2wMIew&list=PLZKTXPmaJk8Lx3TqPlcEAzTL8zcpBz7NP&index=1",
  },
  {
    thumbnail_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    name: "맛있는 가지무침 무작정 따라하기3",
    channel_name: "가지무침장인",
    view: 10000000,
    date: "3일 전",
    url: "https://www.youtube.com/watch?v=Ujjdn2wMIew&list=PLZKTXPmaJk8Lx3TqPlcEAzTL8zcpBz7NP&index=1",
  },
  {
    thumbnail_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    name: "맛있는 가지무침 무작정 따라하기4",
    channel_name: "가지무침장인",
    view: 10000000,
    date: "3일 전",
    url: "https://www.youtube.com/watch?v=Ujjdn2wMIew&list=PLZKTXPmaJk8Lx3TqPlcEAzTL8zcpBz7NP&index=1",
  },
];

export const search: SearchResult = {
  ingredient_list: getIngredientList,
  recipe_list: getRecipeList,
};

export const getMyRecipeList: MyRecipeInfo[] = [
  {
    my_recipe_id: 1,
    image_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    name: "콩나물 무침",
  },
  {
    my_recipe_id: 2,
    image_path: "https://i.ytimg.com/vi/6aZjI0hgEN0/maxresdefault.jpg",
    name: "도토리묵사발",
  },
];

export const getMyRecipeDetailInfo: MyRecipeDetailInfo = {
  total_price: 38000,
  ingredient_list: getIngredientList,
  price_transition_info: {
    before_price: 1000,
    price: 2000,
    wholesales: {
      daily: [
        {
          date: "2022-09-12",
          price: 100,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 200,
          unit: "개",
          quantity: 1,
        },
      ],
      monthly: [
        {
          date: "2022-08-13",
          price: 100,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 200,
          unit: "개",
          quantity: 1,
        },
      ],
      yearly: [
        {
          date: "2021-09-13",
          price: 100,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 200,
          unit: "개",
          quantity: 1,
        },
      ],
    },
    retailsales: {
      daily: [
        {
          date: "2022-09-12",
          price: 1000,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 2000,
          unit: "개",
          quantity: 1,
        },
      ],
      monthly: [
        {
          date: "2022-08-13",
          price: 1000,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 2000,
          unit: "개",
          quantity: 1,
        },
      ],
      yearly: [
        {
          date: "2021-09-13",
          price: 1000,
          unit: "개",
          quantity: 1,
        },
        {
          date: "2022-09-13",
          price: 2000,
          unit: "개",
          quantity: 1,
        },
      ],
    },
  },
};

export const getMyRecipeIngredientList: MyRecipeIngredientInfo[] = [
  { ingredient_id: 1, quantity: 0.5 },
  { ingredient_id: 2, quantity: 1 },
  { ingredient_id: 3, quantity: 2 },
];

export const getAllergyIngredientList: number[] = [1, 2, 3];

export const getLimitPriceList: LimitPriceNoticeInfo[] = [
  {
    ingredient_id: 1,
    upper_limit_price: 2000,
    lower_limit_price: 800,
  },
  {
    ingredient_id: 2,
    upper_limit_price: 7000,
    lower_limit_price: 80,
  },
  {
    ingredient_id: 3,
    upper_limit_price: 20000,
    lower_limit_price: 8,
  },
];