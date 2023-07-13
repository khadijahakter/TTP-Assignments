'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('recipes', [{
      title: 'Chipotle-Citrus Marinated Chicken Tacos',
      description: 'These chipotle-citrus chicken tacos don’t get any easier than marinating chicken breasts and grilling the chicken, then assembling with fresh diced onion and cilantro on top of mini tortillas.',
      ingredients: '2 limes, 1 orange, 1/4 cup olive oil, 1 chipotle pepper in adobo, 3 cloves garlic, 1 teaspoon salt',
      instructions: 'Drain pasta. Toss pasta with bruschetta, top with cooked chicken, and serve.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Air Fryer Turtle Cheesecake',
      description: 'Did you know that you can use your air fryer to make turtle cheesecake? The flavors of chocolate, caramel, toasted pecans, and creamy cheesecake are a perfect match.',
      ingredients: '1 tablespoon sugar, 1/3 cup sugar, 1 pinch salt, 2 large eggs',
      instructions: 'Set air fryer to 300 degrees F (150 degrees C).',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Bruschetta Chicken Pasta',
      description: 'If you like a good, rustic bruschetta...you are gonna love this pasta dish with pan-seared chicken. The freshness of the tomatoes, basil, and garlic will leave your family wanting more!',
      ingredients: '1 teaspoon salt, 1 cup italian salad dressing, 1 teaspoon garlic powder',
      instructions: 'Step 1: Remove chicken from the skillet. Set aside to cool slightly, then slice into bite-sized pieces.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Skillet Chicken Pasta',
      description: 'This chicken pasta skillet meal is a tasteful combination of vegetables, chicken, and pasta prepared in a cast iron skillet. My family eats tons of this stuff.',
      ingredients: '1 pinch salt, 1 cup sliced mushrooms, 1 chopped red onion, 1 chopped green bell pepper',
      instructions: 'Step 1:Toss chicken and vegetables with tomato sauce and hot pasta. Serve sprinkled with Parmesan cheese.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('recipes', null, {});
  }
};