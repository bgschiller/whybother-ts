module.exports = {
  title: "whyBother.ts",
  description:
    "TypeScript is a great tool. But if you're not convinced, it can seem like a lot of work. Why bother?",
  themeConfig: {
    logo: "/assets/ts-logo.png",
    navbar: false,
    sidebar: [
      "/",
      {
        title: "Money for Nothing",
        children: [
          ["/money-for-nothing/", "Introduction"],
          "/money-for-nothing/wrong-argument-order/",
          "/money-for-nothing/forgetting-to-await/"
        ]
      },
      "exhaustiveness-checking/",
      {
        title: "Okay, I'm Convinced",
        children: [
          "/okay-im-convinced/",
          "/okay-im-convinced/generic-functions/"
        ]
      }
    ],
    repo: "bgschiller/whybother-ts",
    editLinks: true
  },
  markdown: { lineNumbers: true }
};
