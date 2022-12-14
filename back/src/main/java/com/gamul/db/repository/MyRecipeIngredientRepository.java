package com.gamul.db.repository;

import com.gamul.db.entity.MyRecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface MyRecipeIngredientRepository extends JpaRepository<MyRecipeIngredient, Long> {
    Optional<List<MyRecipeIngredient>> findAllByMyRecipeId(Long myRecipeId);
    @Transactional
    void deleteAllByMyRecipeId(Long MyRecipeId);
}
