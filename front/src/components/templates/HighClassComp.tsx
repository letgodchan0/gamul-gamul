import React, { FC, useState } from "react";
import { CardContainer } from "../CardContainer";
import { CarouselContainer } from "../CarouselContainer";
import { IngredientInfo } from "../../apis/responses/ingredientInfo";
import { HighClass } from "../../apis/responses/highClass";
import { HighClassItem } from "../HighClassItem";
import { IngredientItem } from "../IngredientItem";
import { useRouter } from "next/router";

interface IProps {
  highClassList: HighClass[];
  ingredientList: IngredientInfo[];
  rowSize?: number;
  gridSize?: number;
}

export const HighClassComp: FC<IProps> = ({
  highClassList,
  ingredientList,
  rowSize = 2,
  gridSize = 3,
}) => {
  const router = useRouter();
  const [highClassId, setHighClassId] = useState<number>(0);
  const onClickHighClassItem = (id: number) => {
    setHighClassId(id);
  };
  const onClickIngredientItem = (id: number) => {
    router.push(`/ingredient-info/${id}`);
  };
  const onClickBack = () => {
    setHighClassId(0);
  };
  return (
    <CardContainer
      title="종류별 상세 조회"
      onClickBack={highClassId !== 0 ? onClickBack : undefined}
    >
      {highClassId === 0 ? (
        <CarouselContainer
          showArrowBackground={true}
          itemList={highClassList}
          rowSize={rowSize}
          gridSize={gridSize}
          getItemComponent={(item) => (
            <HighClassItem
              highClass={item}
              onClick={() => onClickHighClassItem(item.high_class_id)}
            />
          )}
        />
      ) : (
        <CarouselContainer
          itemList={ingredientList.filter((v) => v.high_class_id === highClassId)}
          rowSize={rowSize}
          gridSize={gridSize}
          getItemComponent={(item) => (
            <IngredientItem
              direction="column"
              ingredientInfo={item}
              onClickItem={() => onClickIngredientItem(item.ingredient_id)}
            />
          )}
        />
      )}
    </CardContainer>
  );
};
