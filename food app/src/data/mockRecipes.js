export const MOCK_RECIPES = [
  {
    id: 716429,
    title: "Pasta with Garlic, Tomatoes & Fresh Basil",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=800&q=80",
    readyInMinutes: 25,
    servings: 4,
    pricePerServing: 2.85,
    healthScore: 88,
    vegetarian: true,
    vegan: true,
    glutenFree: false,
    dairyFree: true,
    veryHealthy: true,
    cheap: true,
    cuisines: ["Italian", "Mediterranean"],
    dishTypes: ["main course", "dinner", "pasta"],
    summary: "A quick, fragrant Italian pasta dish bursting with cherry tomatoes, roasted garlic, extra virgin olive oil, and sweet basil leaves.",
    extendedIngredients: [
      { id: 1, name: "Spaghetti / Linguine", amount: 400, unit: "g", usAmount: 14, usUnit: "oz", image: "spaghetti.jpg" },
      { id: 2, name: "Cherry Tomatoes", amount: 300, unit: "g", usAmount: 2, usUnit: "cups", image: "cherry-tomatoes.png" },
      { id: 3, name: "Fresh Garlic Cloves", amount: 4, unit: "cloves", usAmount: 4, usUnit: "cloves", image: "garlic.png" },
      { id: 4, name: "Extra Virgin Olive Oil", amount: 45, unit: "ml", usAmount: 3, usUnit: "tbsp", image: "olive-oil.jpg" },
      { id: 5, name: "Fresh Basil Leaves", amount: 30, unit: "g", usAmount: 1, usUnit: "cup", image: "basil.jpg" },
      { id: 6, name: "Crushed Red Pepper Flakes", amount: 2, unit: "g", usAmount: 0.5, usUnit: "tsp", image: "red-pepper-flakes.jpg" },
      { id: 7, name: "Sea Salt & Black Pepper", amount: 5, unit: "g", usAmount: 1, usUnit: "tsp", image: "salt-and-pepper.jpg" }
    ],
    analyzedInstructions: [
      {
        name: "",
        steps: [
          { number: 1, step: "Bring a large pot of salted water to a rolling boil. Add spaghetti and cook until al dente (approx. 9-10 minutes)." },
          { number: 2, step: "Heat extra virgin olive oil in a wide skillet over medium-low heat. Add thinly sliced garlic and red pepper flakes; sauté for 2 minutes until golden and fragrant." },
          { number: 3, step: "Add halved cherry tomatoes to the skillet. Cook for 5-6 minutes until the tomatoes soften and burst, releasing their sweet juices." },
          { number: 4, step: "Reserve 1/2 cup of pasta cooking water, then drain the spaghetti." },
          { number: 5, step: "Toss pasta directly into the skillet with tomatoes. Add pasta water as needed to create a silky sauce. Stir in torn fresh basil." },
          { number: 6, step: "Season with fresh black pepper and serve hot immediately." }
        ]
      }
    ],
    nutrition: {
      calories: 420,
      protein: "14g",
      carbs: "68g",
      fat: "11g",
      fiber: "5g"
    },
    equipment: ["Large Pot", "Colander", "Skillet / Pan", "Chef Knife"]
  },
  {
    id: 715538,
    title: "Gourmet Avocado & Poached Egg Toast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    readyInMinutes: 15,
    servings: 2,
    pricePerServing: 3.40,
    healthScore: 92,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: true,
    veryHealthy: true,
    cheap: false,
    cuisines: ["American", "Brunch"],
    dishTypes: ["breakfast", "brunch", "snack"],
    summary: "Creamy smashed avocado seasoned with lime and chili flakes on toasted sourdough, topped with runny poached eggs and microgreens.",
    extendedIngredients: [
      { id: 10, name: "Ripe Hass Avocados", amount: 2, unit: "whole", usAmount: 2, usUnit: "whole", image: "avocado.jpg" },
      { id: 11, name: "Artisanal Sourdough Bread", amount: 4, unit: "slices", usAmount: 4, usUnit: "slices", image: "sourdough.jpg" },
      { id: 12, name: "Fresh Organic Eggs", amount: 4, unit: "large", usAmount: 4, usUnit: "large", image: "egg.png" },
      { id: 13, name: "Fresh Lime Juice", amount: 15, unit: "ml", usAmount: 1, usUnit: "tbsp", image: "lime-juice.png" },
      { id: 14, name: "Everything Bagel Seasoning", amount: 5, unit: "g", usAmount: 1, usUnit: "tsp", image: "seasoning.jpg" },
      { id: 15, name: "Microgreens / Radish Sprouts", amount: 20, unit: "g", usAmount: 0.5, usUnit: "cup", image: "microgreens.jpg" }
    ],
    analyzedInstructions: [
      {
        name: "",
        steps: [
          { number: 1, step: "Toast sourdough bread slices until thick, golden, and crispy." },
          { number: 2, step: "In a bowl, mash ripe avocado flesh with fresh lime juice, sea salt, and black pepper using a fork until chunky." },
          { number: 3, step: "Bring a saucepan of water to a gentle simmer with 1 tbsp vinegar. Create a vortex and drop eggs one by one; poach for 3 minutes until whites are set and yolks remain runny." },
          { number: 4, step: "Spread smashed avocado generously over warm sourdough toast." },
          { number: 5, step: "Top with poached eggs, everything seasoning, microgreens, and a drizzle of olive oil." }
        ]
      }
    ],
    nutrition: {
      calories: 380,
      protein: "16g",
      carbs: "34g",
      fat: "22g",
      fiber: "9g"
    },
    equipment: ["Saucepan", "Toaster", "Mixing Bowl", "Slotted Spoon"]
  },
  {
    id: 644387,
    title: "Teriyaki Tofu & Veggie Power Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    readyInMinutes: 30,
    servings: 2,
    pricePerServing: 4.10,
    healthScore: 96,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    veryHealthy: true,
    cheap: false,
    cuisines: ["Asian", "Japanese"],
    dishTypes: ["lunch", "dinner", "salad"],
    summary: "Crispy pan-seared glazed tofu with steamed edamame, shredded carrots, cucumber ribbons, and fluffy jasmine rice.",
    extendedIngredients: [
      { id: 20, name: "Extra Firm Tofu", amount: 350, unit: "g", usAmount: 12, usUnit: "oz", image: "tofu.jpg" },
      { id: 21, name: "Jasmine Rice", amount: 200, unit: "g", usAmount: 1, usUnit: "cup", image: "rice.jpg" },
      { id: 22, name: "Gluten-Free Teriyaki Sauce", amount: 60, unit: "ml", usAmount: 4, usUnit: "tbsp", image: "teriyaki.jpg" },
      { id: 23, name: "Shelled Edamame", amount: 150, unit: "g", usAmount: 1, usUnit: "cup", image: "edamame.jpg" },
      { id: 24, name: "Shredded Carrots & Cucumber", amount: 100, unit: "g", usAmount: 1, usUnit: "cup", image: "carrots.jpg" },
      { id: 25, name: "Sesame Seeds & Green Onions", amount: 10, unit: "g", usAmount: 2, usUnit: "tsp", image: "sesame-seeds.jpg" }
    ],
    analyzedInstructions: [
      {
        name: "",
        steps: [
          { number: 1, step: "Rinse jasmine rice thoroughly. Cook with 1.5 cups water until tender and fluffy (15 mins)." },
          { number: 2, step: "Press excess moisture out of tofu with paper towels. Cut into bite-sized 1-inch cubes." },
          { number: 3, step: "Heat sesame oil in a non-stick skillet. Sear tofu cubes until golden and crunchy on all sides (8 mins)." },
          { number: 4, step: "Pour teriyaki sauce over the tofu; let glaze bubble and coat cubes completely for 2 mins." },
          { number: 5, step: "Assemble bowls: place rice at the base, arrange teriyaki tofu, edamame, carrots, and cucumber ribbons." },
          { number: 6, step: "Garnish with toasted sesame seeds and sliced scallions." }
        ]
      }
    ],
    nutrition: {
      calories: 490,
      protein: "24g",
      carbs: "62g",
      fat: "14g",
      fiber: "8g"
    },
    equipment: ["Rice Cooker / Pot", "Skillet", "Tofu Press", "Vegetable Peeler"]
  },
  
  {
    id: 782585,
    title: "Classic Mediterranean Greek Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    readyInMinutes: 12,
    servings: 4,
    pricePerServing: 2.90,
    healthScore: 85,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    veryHealthy: true,
    cheap: true,
    cuisines: ["Greek", "Mediterranean"],
    dishTypes: ["salad", "side dish", "appetizer"],
    summary: "Crisp English cucumbers, vine-ripe tomatoes, Kalamata olives, thinly sliced red onion, and creamy block feta tossed in oregano dressing.",
    extendedIngredients: [
      { id: 30, name: "English Cucumber", amount: 2, unit: "large", usAmount: 2, usUnit: "large", image: "cucumber.jpg" },
      { id: 31, name: "Ripe Roma Tomatoes", amount: 4, unit: "medium", usAmount: 4, usUnit: "medium", image: "tomatoes.png" },
      { id: 32, name: "Block Feta Cheese", amount: 200, unit: "g", usAmount: 7, usUnit: "oz", image: "feta.jpg" },
      { id: 33, name: "Pitted Kalamata Olives", amount: 100, unit: "g", usAmount: 0.75, usUnit: "cup", image: "olives.jpg" },
      { id: 34, name: "Red Onion", amount: 0.5, unit: "medium", usAmount: 0.5, usUnit: "medium", image: "red-onion.jpg" },
      { id: 35, name: "Greek Dried Oregano & Olive Oil", amount: 30, unit: "ml", usAmount: 2, usUnit: "tbsp", image: "oregano.jpg" }
    ],
    analyzedInstructions: [
      {
        name: "",
        steps: [
          { number: 1, step: "Chop cucumbers and tomatoes into thick rustic bite-sized chunks." },
          { number: 2, step: "Thinly slice red onion into translucent half-moons." },
          { number: 3, step: "In a salad bowl, combine cucumbers, tomatoes, red onion, and Kalamata olives." },
          { number: 4, step: "Drizzle generously with extra virgin olive oil and red wine vinegar." },
          { number: 5, step: "Place a thick slice of feta cheese right on top, sprinkle with dried oregano and fresh black pepper." }
        ]
      }
    ],
    nutrition: {
      calories: 270,
      protein: "8g",
      carbs: "12g",
      fat: "21g",
      fiber: "3g"
    },
    equipment: ["Large Salad Bowl", "Cutting Board", "Salad Tongs"]
  },
  {
    id: 638067,
    title: "Artisanal Wood-Fired Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    readyInMinutes: 35,
    servings: 3,
    pricePerServing: 3.80,
    healthScore: 70,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: true,
    cuisines: ["Italian"],
    dishTypes: ["main course", "dinner"],
    summary: "Crispy homemade sourdough pizza crust topped with San Marzano tomato sauce, fresh buffalo mozzarella, and fragrant aromatic basil.",
    extendedIngredients: [
      { id: 40, name: "Pizza Dough Ball", amount: 450, unit: "g", usAmount: 1, usUnit: "lb", image: "pizza-dough.jpg" },
      { id: 41, name: "San Marzano Tomato Sauce", amount: 200, unit: "g", usAmount: 0.75, usUnit: "cup", image: "tomato-sauce.jpg" },
      { id: 42, name: "Fresh Fresh Mozzarella", amount: 220, unit: "g", usAmount: 8, usUnit: "oz", image: "mozzarella.jpg" },
      { id: 43, name: "Fresh Basil Leaves", amount: 20, unit: "g", usAmount: 0.5, usUnit: "cup", image: "basil.jpg" },
      { id: 44, name: "Extra Virgin Olive Oil", amount: 15, unit: "ml", usAmount: 1, usUnit: "tbsp", image: "olive-oil.jpg" }
    ],
    analyzedInstructions: [
      {
        name: "",
        steps: [
          { number: 1, step: "Preheat oven with pizza steel/stone to maximum temperature (260°C / 500°F) for at least 45 minutes." },
          { number: 2, step: "Stretch pizza dough on a floured surface into a 12-inch circle with raised edges." },
          { number: 3, step: "Spread San Marzano tomato sauce thinly over the dough." },
          { number: 4, step: "Tear fresh mozzarella ball into chunks and scatter over sauce." },
          { number: 5, step: "Bake on hot stone for 8-10 minutes until crust is blistered and cheese is melted and bubbling." },
          { number: 6, step: "Top with fresh basil leaves and a swirl of olive oil immediately upon removing from oven." }
        ]
      }
    ],
    nutrition: {
      calories: 510,
      protein: "22g",
      carbs: "64g",
      fat: "18g",
      fiber: "4g"
    },
    equipment: ["Pizza Stone / Steel", "Pizza Peel", "Rolling Pin / Hands"]
  },
  {
    id: 660306,
    title: "Creamy Wild Mushroom & Thyme Risotto",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    readyInMinutes: 40,
    servings: 4,
    pricePerServing: 4.50,
    healthScore: 78,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    cuisines: ["Italian"],
    dishTypes: ["main course", "dinner"],
    summary: "Silky Arborio rice slow-cooked in rich vegetable broth with sautéed cremini & shiitake mushrooms, parmesan, and thyme.",
    extendedIngredients: [
      { id: 50, name: "Arborio Risotto Rice", amount: 300, unit: "g", usAmount: 1.5, usUnit: "cups", image: "arborio.jpg" },
      { id: 51, name: "Assorted Wild Mushrooms", amount: 400, unit: "g", usAmount: 14, usUnit: "oz", image: "mushrooms.jpg" },
      { id: 52, name: "Warm Vegetable Broth", amount: 1000, unit: "ml", usAmount: 4, usUnit: "cups", image: "broth.jpg" },
      { id: 53, name: "Dry White Wine", amount: 120, unit: "ml", usAmount: 0.5, usUnit: "cup", image: "white-wine.jpg" },
      { id: 54, name: "Aged Parmigiano Reggiano", amount: 80, unit: "g", usAmount: 1, usUnit: "cup", image: "parmesan.jpg" },
      { id: 55, name: "Unsalted Butter & Thyme", amount: 40, unit: "g", usAmount: 3, usUnit: "tbsp", image: "butter.jpg" }
    ],
    analyzedInstructions: [
      {
        name: "",
        steps: [
          { number: 1, step: "Sauté sliced wild mushrooms in 1 tbsp butter over high heat until browned (6 mins); set aside." },
          { number: 2, step: "In a Dutch oven, soften finely minced shallots and garlic in remaining butter." },
          { number: 3, step: "Add Arborio rice; toast grains for 2 minutes until translucent at edges." },
          { number: 4, step: "Pour in dry white wine and stir until completely absorbed." },
          { number: 5, step: "Ladle warm vegetable broth 1 cup at a time, stirring constantly until rice absorbs liquid before adding the next ladle (approx. 20 mins)." },
          { number: 6, step: "Fold in sautéed mushrooms, grated parmesan, and fresh thyme. Season with salt and pepper to taste." }
        ]
      }
    ],
    nutrition: {
      calories: 460,
      protein: "14g",
      carbs: "62g",
      fat: "15g",
      fiber: "4g"
    },
    equipment: ["Dutch Oven", "Ladle", "Wooden Spoon", "Cheese Grater"]
  }
];
