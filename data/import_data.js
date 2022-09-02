//~import module that generate fake data
// import { faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/en';
// connect to db - be where dotenv is configured
import 'dotenv/config';
import pg from 'pg';
const client = new pg.Pool({
  // connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false }
});

// Bcrypt
import bcrypt from 'bcrypt';
//fake data categories
import fakeDataCategories from './technoJson/technoJson.json' assert { type: 'json' };

//
const fakeData = {
  //^ VARIABLES

  users: [],
  articles: [],
  projects: [],
  goldenBookTickets: [],
  //
  roles: ['admin', 'user'],
  categories: fakeDataCategories,
  //
  articleHasCategory: [],
  projectHasCategory: [],
  //
  maxFakeNumber: 10,

  //~ colums by table
  userColumns: `"first_name", "last_name", "email", "password", "linkedin_url", "github_url", "instagram_url"`,
  articleColumns: `"title", "abstract", "content", "user_id"`,
  projectColumns: ` "title", "abstract", "content","picture","date", "user_id", "link"`,
  goldenBookTicketColumns: `"content", "user_id"`,
  categoryColumns: `"name", "logo"`,
  roleColumns: `"name"`,
  articleHasCategoryColumns: `"article_id", "category_id"`,
  projectHasCategoryColumns: `"project_id", "category_id"`,

  //^ INIT
  async init() {
    //~ Fake Role
    // fakeData.importDataRole();
    //~ Fake Category
    // this.importDataCategory();
    //~ Fake User
    // await this.generateRandomUsers();
    // this.importDataUser();
    //~ Fake Article
    // this.generateRandomArticles();
    // this.importDataArticle();
    //~ Fake Project
    // this.generateRandomProjects();
    // this.importDataProject();
    //~ Fake Golden Book Ticket
    // this.generateRandomGoldenBookTickets();
    // this.importDataGoldenBookTicket();
    //~ Fake Article Has Category
    // this.generateRandomArticles();
    // this.generateArticleHasCategory();
    // this.importDataArticleHasCategory(); //active generate article
    //~ Fake Project Has Category
    // this.generateRandomProjects();
    // this.generateProjectHasCategory();
    // this.importDataProjectHasCategory(); //active generate project
  },

  //^ METHODS

  //~ Random numbers

  randomFakeNumber() {
    const randomFakeNumber = Math.floor(Math.random() * fakeData.maxFakeNumber) + 1;
    return randomFakeNumber;
  },

  randomArticleId() {
    const randomArticleId = Math.floor(Math.random() * fakeData.articles.length) + 1;
    return randomArticleId;
  },

  randomProjectId() {
    const randomProjectId = Math.floor(Math.random() * fakeData.projects.length) + 1;
    return randomProjectId;
  },

  randomCategoryId() {
    const randomCategoryId = Math.floor(Math.random() * fakeData.categories.length) + 1;
    return randomCategoryId;
  },

  //~ Random Pwd with bcrypt
  async generateRandomPwd() {
    //~encrypt password
    let password = faker.internet.password(10);
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    return password;
  },

  //~ Random users
  async generateRandomUsers() {
    for (let counter = 0; counter < this.maxFakeNumber; counter++) {
      fakeData.users.push({
        first_name: faker.internet.userName(),
        last_name: faker.internet.userName(),
        email: faker.internet.email(),
        password: await fakeData.generateRandomPwd(),
        linkedin_url: faker.internet.url(),
        github_url: faker.internet.url(),
        instagram_url: faker.internet.url()
      });
    }
  },

  //~ Random articles
  generateRandomArticles() {
    for (let counter = 0; counter < fakeData.maxFakeNumber; counter++) {
      fakeData.articles.push({
        title: faker.lorem.sentence(5),
        abstract: faker.lorem.paragraphs(2),
        content: faker.lorem.paragraphs(10),
        user_id: fakeData.randomFakeNumber()
      });
    }
  },

  //~ Random Projects
  generateRandomProjects() {
    for (let counter = 0; counter < fakeData.maxFakeNumber; counter++) {
      fakeData.projects.push({
        title: faker.lorem.sentence(5),
        abstract: faker.lorem.paragraphs(2),
        content: faker.lorem.paragraphs(10),
        picture: faker.internet.url(),
        date: faker.date.between(),
        user_id: fakeData.randomFakeNumber(),
        link: faker.internet.url()
      });
    }
  },

  //~ Random goldenBookTickets
  generateRandomGoldenBookTickets() {
    for (let counter = 0; counter < fakeData.maxFakeNumber; counter++) {
      fakeData.goldenBookTickets.push({
        content: faker.lorem.paragraphs(6),
        user_id: fakeData.randomFakeNumber()
      });
    }
  },

  //~ Article has category
  generateArticleHasCategory() {
    for (let counter = 0; counter < fakeData.articles.length; counter++) {
      fakeData.articleHasCategory.push({
        article_id: fakeData.randomArticleId(),
        category_id: fakeData.randomCategoryId()
      });
    }
  },

  //~ Project has category
  generateProjectHasCategory() {
    for (let counter = 0; counter < fakeData.projects.length; counter++) {
      fakeData.projectHasCategory.push({
        project_id: fakeData.randomProjectId(),
        category_id: fakeData.randomCategoryId()
      });
    }
  },

  //~ Do Import Data User
  async importDataUser() {
    await client.connect();

    // console.time('Import data');
    const users = this.users;

    let query = `INSERT INTO "user"(${this.userColumns}) VALUES `;

    query += `(
                    '${users[0].first_name}',
                    '${users[0].last_name}',
                    '${users[0].email}',
                    '${users[0].password}',
                    '${users[0].linkedin_url}',
                    '${users[0].github_url}',
                    '${users[0].instagram_url}'
                )`;

    for (let counter = 1; counter < users.length; counter++) {
      query += `,('${users[counter].first_name}',
                        '${users[counter].last_name}',
                        '${users[counter].email}',
                        '${users[counter].password}',
                        '${users[counter].linkedin_url}',
                        '${users[counter].github_url}',
                        '${users[counter].instagram_url}'
                        )`;
    }

    query += ';';

    await client.query(query);
    console.log('IMPORT DATA USER => ok');

    // console.timeEnd('Import data');

    client.end();
  },

  //~ Do Import Data Article
  async importDataArticle() {
    await client.connect();

    // console.time('Import data');
    const articles = this.articles;

    let query = `INSERT INTO "article"(${this.articleColumns}) VALUES `;

    query += `(
                    '${articles[0].title}',
                    '${articles[0].abstract}',
                    '${articles[0].content}',
                    '${articles[0].user_id}'
                    
                    )`;

    for (let counter = 1; counter < articles.length; counter++) {
      query += `,(
                    '${articles[counter].title}',
                    '${articles[counter].abstract}',
                    '${articles[counter].content}',
                    '${articles[counter].user_id}'
                    )`;
    }

    query += ';';

    await client.query(query);
    console.log('IMPORT DATA ARTICLE => ok');

    // console.timeEnd('Import data');

    client.end();
  },
  //~ Do Import Data Project
  async importDataProject() {
    await client.connect();

    // console.time('Import data');
    const projects = this.projects;

    let query = `INSERT INTO "project"(${this.projectColumns}) VALUES `;

    query += `(
            '${projects[0].title}',
            '${projects[0].abstract}',
            '${projects[0].content}',
            '${projects[0].picture}',
            '${projects[0].date}',
            '${projects[0].user_id}',
            '${projects[0].link}'
                )`;

    for (let counter = 1; counter < projects.length; counter++) {
      query += `,(
                '${projects[counter].title}',
                '${projects[counter].abstract}',
                '${projects[counter].content}',
                '${projects[counter].picture}',
                '${projects[counter].date}',
                '${projects[counter].user_id}',
                '${projects[counter].link}'
                    )`;
    }

    query += ';';

    await client.query(query);
    console.log('IMPORT DATA PROJECT => ok');

    // console.timeEnd('Import data');

    client.end();
  },
  //~ Do Import Data Golden Book Ticket
  async importDataGoldenBookTicket() {
    await client.connect();

    // console.time('Import data');
    const goldenBookTickets = this.goldenBookTickets;

    let query = `INSERT INTO "gb_ticket"(${this.goldenBookTicketColumns}) VALUES `;

    query += `(
                    '${goldenBookTickets[0].content}',
                    '${goldenBookTickets[0].user_id}'
                )`;

    for (let counter = 1; counter < goldenBookTickets.length; counter++) {
      query += `,(
                    '${goldenBookTickets[counter].content}',
                    '${goldenBookTickets[counter].user_id}'
                )`;
    }

    query += ';';

    await client.query(query);
    console.log('IMPORT DATA GOLDEN BOOK TICKET => ok');
    // console.timeEnd('Import data');

    client.end();
  },


  //~ Do Import Data Role
  async importDataRole() {
    await client.connect();

    // console.time('Import data');
    const roles = this.roles;

    let query = `INSERT INTO "role"(${this.roleColumns}) VALUES `;

    query += `('${roles[0]}')`;

    for (let counter = 1; counter < roles.length; counter++) {
      query += `,('${roles[counter]}')`;
    }

    query += ';';

    await client.query(query);
    console.log('IMPORT DATA ROLE => ok');
    // console.timeEnd('Import data');

    client.end();
  },



  //~ Do Import Data category
  async importDataCategory() {
    await client.connect();

    // console.time('Import data');
    const categories = this.categories;

    let query = `INSERT INTO "category"(${this.categoryColumns}) VALUES `;

    query += `('${categories[0].name}',
                    '${categories[0].logo}')`;

    for (let counter = 1; counter < categories.length; counter++) {
      query += `,('${categories[counter].name}',
            '${categories[counter].logo}')`;
    }
    // for (let counter = 1; counter < 332; counter++) {
    //     if (counter !== 164) {
    //         query += `,('${categories[counter].name}')`;
    //     }
    // }

    query += ';';

    await client.query(query);
    console.log('IMPORT DATA CATEGORY => ok');

    // console.timeEnd('Import data');

    client.end();
  },

  //~ Do Import Data article has category
  async importDataArticleHasCategory() {
    await client.connect();

    // console.time('Import data');
    const articleHasCategory = this.articleHasCategory;

    let query = `INSERT INTO "article_has_category"(${this.articleHasCategoryColumns}) VALUES `;

    query += `(
                    '${articleHasCategory[0].article_id}',
                    '${articleHasCategory[0].category_id}'
                    )`;

    for (let counter = 1; counter < articleHasCategory.length; counter++) {
      query += `,(
                        '${articleHasCategory[counter].article_id}',
                        '${articleHasCategory[counter].category_id}'
                    )`;
    }

    query += ';';

    await client.query(query);
    console.log('IMPORT DATA ARTICLE HAS CATEGORY => ok');
    // console.timeEnd('Import data');

    client.end();
  },
  //~ Do Import Data Project has category
  async importDataProjectHasCategory() {
    await client.connect();

    // console.time('Import data');
    const projectHasCategory = this.projectHasCategory;

    let query = `INSERT INTO "project_has_category"(${this.projectHasCategoryColumns}) VALUES `;

    query += `(
                    '${projectHasCategory[0].project_id}',
                    '${projectHasCategory[0].category_id}'
                )`;

    for (let counter = 1; counter < projectHasCategory.length; counter++) {
      query += `,(
                        '${projectHasCategory[counter].project_id}',
                        '${projectHasCategory[counter].category_id}'
                    )`;
    }

    query += ';';

    await client.query(query);
    console.log('IMPORT DATA PROJECT HAS CATEGORY => ok');

    // console.timeEnd('Import data');

    client.end();
  }
};

fakeData.init();
