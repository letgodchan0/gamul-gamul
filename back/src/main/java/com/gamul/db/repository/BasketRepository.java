package com.gamul.db.repository;

import com.gamul.db.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BasketRepository extends JpaRepository<Basket, Long> {
    Optional<Basket> findByIngredientId(Long ingredientId);
    List<Basket> findAllByUserId(Long userId);

    Basket findByUserIdAndIngredientId(Long userId, Long ingredientId);
    Boolean existsByUserIdAndIngredientId(Long userId, Long ingredientId);

}
