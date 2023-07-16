'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "poster",
          email: "posterposted@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "elicie",
          email: "elicie.comet@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "msnn",
          email: "msnn001_1@outlook.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    const users = await queryInterface.sequelize.query(`SELECT id FROM users`);
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert(
      "posts",
      [
        {
          content: "Nature has always fascinated me.",
          UserId: userIds[0], 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Someone who loves classic fashion.",
          UserId: userIds[1], 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Protect Our Oceans.",
          UserId: userIds[2], 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Save the Planet!",
          UserId: userIds[2], 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const posts = await queryInterface.sequelize.query(`SELECT id FROM posts`);
    const postIds = posts[0].map(post => post.id);

    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content: "Inspiring! Let's work together!",
          UserId: userIds[0], 
          PostId: postIds[0], 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Love this message!",
          UserId: userIds[1], 
          PostId: postIds[0], 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Count me in!",
          UserId: userIds[2],
          PostId: postIds[1], 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});    
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("comments", null, {});
  }
};
