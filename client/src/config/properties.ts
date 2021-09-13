export default {
  baseURL: process.env.BASE_URL || "https://store.leehov.in/api",
  imgURL:
    process.env.IMG_URL || "https://store.leehov.in/api/images/",
  demo: {
    email: process.env.DEMO_EMAIL || "test@test.test",
    password: process.env.DEMO_PW || "test@test.test",
  },
};
