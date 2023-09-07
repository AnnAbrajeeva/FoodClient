export type Recipe = {
    cookingMinutes: number;
    id: number;
    title: string,
    image: string,
    nutrition: {
        nutrients: [
            {
                name: string,
                amount: number,
            },
        ]
        ingredients: Ingredient[];
    },
}

export type Ingredient = {
    name: string;
}