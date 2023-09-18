import { useEffect } from "react";
import Container from "components/Container";
import RecipesStore from "store/RecipesStore";
import { useLocalStore } from "utils/useLocalStore";
import RecipesWrapper from "./components/RecipesWrapper";

const FavoriteRecipes = () => {
    const recipesStore = useLocalStore(() => new RecipesStore());
    useEffect(() => {
        recipesStore.getFavoriteRecipesList()
    }, []) 
    return (
        <Container>
        <RecipesWrapper />
        </Container>
    )
}

export default FavoriteRecipes;