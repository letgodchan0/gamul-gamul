package com.gamul.db.repository;

import com.gamul.db.entity.RecipeOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeOrderRepository extends JpaRepository<RecipeOrder, Long> {
    Optional<List<RecipeOrder>> findAllByRecipeId(Long recipeId);
}
