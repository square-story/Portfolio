import { Icons } from "@/components/icons";
import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaGithub, FaAws, FaFigma } from "react-icons/fa";
import { SiNextdotjs, SiExpress, SiMongodb, SiJavascript, SiTypescript, SiTailwindcss, SiRedux, SiReactquery, SiShadcnui, SiFramer, SiReacthookform, SiZod, SiJsonwebtokens, SiCloudinary, SiMongoose, SiEjs, SiAxios, SiHtml5, SiCss3, SiRedis, SiPostgresql, SiFirebase, SiVercel, SiPostman, SiGithubactions, SiPeerlist } from "react-icons/si";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Sadik",
  initials: "Sadik",
  url: "https://sadik-mu.vercel.app/",
  location: "Kerala, India",
  locationLink: "https://www.google.com/maps/place/Kerala/@10.5387213,73.4951504,7z/data=!3m1!4b1!4m6!3m5!1s0x3b0812ffd49cf55b:0x64bd90fbed387c99!8m2!3d10.1631526!4d76.6412712!16zL20vMGJ5aDhq?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
  description:
    "MERN Stack Developer | Builds Scalable Web Apps | Obsessed with Clean Code & Seamless UX | #1PercentBetterEveryday",
  summary:
    "MERN stack developer with a background in accounting, now focused on building clean, scalable web apps with strong user experience. Started from spreadsheets, grew through self-driven learning, and now crafting real-world solutions with code. Passionate about continuous improvement and delivering value through technology.",
  avatarUrl: "/me.jpg",
  skills: [
    { name: "React.js", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "JavaScript (ES6+)", icon: <SiJavascript /> },
    { name: "Typescript", icon: <SiTypescript /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "github actions", icon: <SiGithubactions /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "Redux Toolkit", icon: <SiRedux /> },
    { name: "React Query", icon: <SiReactquery /> },
    { name: "ShadCN", icon: <SiShadcnui /> },
    { name: "Motion (Framer Motion)", icon: <SiFramer /> },
    { name: "React-hookform", icon: <SiReacthookform /> },
    { name: "Zod (TypeScript-first schema)", icon: <SiZod /> },
    { name: "JWT Authentication", icon: <SiJsonwebtokens /> },
    { name: "Cloudinary", icon: <SiCloudinary /> },
    { name: "Mongoose", icon: <SiMongoose /> },
    { name: "EJS", icon: <SiEjs /> },
    { name: "Axios", icon: <SiAxios /> },
    { name: "HTML5", icon: <SiHtml5 /> },
    { name: "CSS3", icon: <SiCss3 /> },
    { name: "Redis", icon: <SiRedis /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "Firebase", icon: <SiFirebase /> },
    { name: "Vercel", icon: <SiVercel /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "GitHub", icon: <FaGithub /> },
    { name: "Git", icon: <FaGitAlt /> },
    { name: "AWS", icon: <FaAws /> },
    { name: "Figma", icon: <FaFigma /> },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "sadik.build@gmail.com",
    tel: "+91 90488-34867",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/square-story",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sadikkp/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/SadikBuilds",
        icon: Icons.x,
        navbar: true,
        username: "SadikBuilds",
      },
      email: {
        name: "Send Email",
        url: "https://mail.google.com/mail/u/0/?fs=1&to=sadik.build@gmail.com&su=FROM_PORTFOLIO&body=BODY&tf=cm",
        icon: Icons.email,

        navbar: true,
      },
      peerlist: {
        name: "Peerlist",
        url: "https://peerlist.io/sadikkp",
        icon: SiPeerlist,
        navbar: true,
      }
    },
  },

  work: [
    {
      company: "New Quality Supermarket",
      badges: [],
      href: "https://g.co/kgs/ET8uNCn",
      location: "OnSite",
      title: "Senior Accountant",
      logoUrl: "/newQuality.jpg",
      start: "Febuary 2021",
      end: "September 2023",
      description:
        "Communicated with suppliers to reconcile invoice payments • Managed financial records and performed accounting tasks for a supermarket • Successfully managed bank reconciliation, TDS and GST process",
    },
  ],
  education: [
    {
      school: "Brototype",
      href: "https://www.brototype.com/",
      degree: "Full-stack development program",
      logoUrl: "/brototype_logo.jpeg",
      start: "March 2024",
      end: "Present",
    },
    {
      school: "University of Calicut",
      href: "https://uoc.ac.in/",
      degree: "B.Com in Computer Applications",
      logoUrl: "/CalicutUniversity.png",
      start: "2017",
      end: "2021",
    },
    {
      school: "Kerala's higher secondary (Plus Two)",
      href: "https://schools.org.in/malappuram/32051101010/gvhss-chettiyankinar.html",
      degree: "Computer Commerce",
      logoUrl: "/Gvhss.jpeg",
      start: "2015",
      end: "2017",
    },
  ],
  projects: [
    {
      title: "Inspecto",
      href: "https://github.com/square-story/Inspecto",
      dates: "Jan 2025 - Mar 2025",
      active: true,
      description:
        "A web application that simplifies vehicle inspections by connecting users with verified inspectors. ",
      technologies: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "Typescript",
        "Mongoose",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Vite",
      ],
      links: [
        {
          type: "Website",
          href: "https://inspecto-flax.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/square-story/Inspecto",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/chrome_BU150hXWkI.png",
    },
    {
      title: "Anime Avatar Generator",
      href: "https://anime-avatar-generator.vercel.app/",
      dates: "June 2024 - Present",
      active: false,
      description:
        "Designed, developed and maintain the Anime profile photo creation platform",
      technologies: [
        "React.js",
        "JavaScript",
        "TailwindCSS",
        "UI Verse",
        "Vite",
      ],
      links: [
        {
          type: "Website",
          href: "https://anime-avatar-generator.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/square-story/animeDP",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/chrome_siSfTHoPAb.png",
    },
    {
      title: "Yet another user management system (YAUMS)",
      href: "https://github.com/square-story/UserManagmentSystem-using-React.JS-and-Express.JS",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source user and admin platform for managing data",
      technologies: [
        "React.js",
        "JavaScript",
        "Express.js",
        "MongoDB",
        "TailwindCSS",
        "Mongoose",
        "Node.js",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/square-story/UserManagmentSystem-using-React.JS-and-Express.JS",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/userManagment.png",
    },
    {
      title: "Zay E-commerce",
      href: "https://github.com/square-story/Zay-Ecommerce",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "a comprehensive e-commerce platform includes various features such as product management, cart operations, order tracking, payment integrations, and more.",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "EJS",
        "AJAX",
        "JavaScript",
        "HTML",
        "Bootstrap",
        "CSS",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/square-story/Zay-Ecommerce",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/Zay.png",
    },
  ],
  // hackathons: [
  //   {
  //     title: "Hack Western 5",
  //     dates: "November 23rd - 25th, 2018",
  //     location: "London, Ontario",
  //     description:
  //       "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
  //     links: [],
  //   },
  //   {
  //     title: "Hack The North",
  //     dates: "September 14th - 16th, 2018",
  //     location: "Waterloo, Ontario",
  //     description:
  //       "Developed a mobile application which delivers university campus wide events in real time to all students.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
  //     links: [],
  //   },
  //   {
  //     title: "FirstNet Public Safety Hackathon",
  //     dates: "March 23rd - 24th, 2018",
  //     location: "San Francisco, California",
  //     description:
  //       "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
  //     icon: "public",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
  //     links: [],
  //   },
  //   {
  //     title: "DeveloperWeek Hackathon",
  //     dates: "February 3rd - 4th, 2018",
  //     location: "San Francisco, California",
  //     description:
  //       "Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg",
  //     links: [
  //       {
  //         title: "Github",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/cryptotrends/cryptotrends",
  //       },
  //     ],
  //   },
  //   {
  //     title: "HackDavis",
  //     dates: "January 20th - 21st, 2018",
  //     location: "Davis, California",
  //     description:
  //       "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
  //     win: "Best Data Hack",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
  //     links: [
  //       {
  //         title: "Devpost",
  //         icon: <Icons.globe className="h-4 w-4" />,
  //         href: "https://devpost.com/software/my6footprint",
  //       },
  //       {
  //         title: "ML",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/Wallet6/my6footprint-machine-learning",
  //       },
  //       {
  //         title: "iOS",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/Wallet6/CarbonWallet",
  //       },
  //       {
  //         title: "Server",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/Wallet6/wallet6-server",
  //       },
  //     ],
  //   },
  //   {
  //     title: "ETH Waterloo",
  //     dates: "October 13th - 15th, 2017",
  //     location: "Waterloo, Ontario",
  //     description:
  //       "Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png",
  //     links: [
  //       {
  //         title: "Organization",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/ethdocnet",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Hack The North",
  //     dates: "September 15th - 17th, 2017",
  //     location: "Waterloo, Ontario",
  //     description:
  //       "Developed a virtual reality application allowing users to see themselves in third person.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
  //     links: [
  //       {
  //         title: "Streamer Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/justinmichaud/htn2017",
  //       },
  //       {
  //         title: "Client Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/dillionverma/RTSPClient",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Hack The 6ix",
  //     dates: "August 26th - 27th, 2017",
  //     location: "Toronto, Ontario",
  //     description:
  //       "Developed an open platform for people shipping items to same place to combine shipping costs and save money.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
  //     links: [
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/ShareShip/ShareShip",
  //       },
  //       {
  //         title: "Site",
  //         icon: <Icons.globe className="h-4 w-4" />,
  //         href: "https://share-ship.herokuapp.com/",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Stupid Hack Toronto",
  //     dates: "July 23rd, 2017",
  //     location: "Toronto, Ontario",
  //     description:
  //       "Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png",
  //     links: [
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/nsagirlfriend/nsagirlfriend",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Global AI Hackathon - Toronto",
  //     dates: "June 23rd - 25th, 2017",
  //     location: "Toronto, Ontario",
  //     description:
  //       "Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg",
  //     win: "1st Place Winner",
  //     links: [
  //       {
  //         title: "Article",
  //         icon: <Icons.globe className="h-4 w-4" />,
  //         href: "https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/",
  //       },
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/TinySamosas/",
  //       },
  //     ],
  //   },
  //   {
  //     title: "McGill AI for Social Innovation Hackathon",
  //     dates: "June 17th - 18th, 2017",
  //     location: "Montreal, Quebec",
  //     description:
  //       "Developed realtime facial microexpression analyzer using AI",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg",
  //     links: [],
  //   },
  //   {
  //     title: "Open Source Circular Economy Days Hackathon",
  //     dates: "June 10th, 2017",
  //     location: "Toronto, Ontario",
  //     description:
  //       "Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg",
  //     win: "1st Place Winner",
  //     links: [
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/dillionverma/genecis",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Make School's Student App Competition 2017",
  //     dates: "May 19th - 21st, 2017",
  //     location: "International",
  //     description: "Improved PocketDoc and submitted to online competition",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png",
  //     win: "Top 10 Finalist | Honourable Mention",
  //     links: [
  //       {
  //         title: "Medium Article",
  //         icon: <Icons.globe className="h-4 w-4" />,
  //         href: "https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a",
  //       },
  //       {
  //         title: "Devpost",
  //         icon: <Icons.globe className="h-4 w-4" />,
  //         href: "https://devpost.com/software/pocketdoc-react-native",
  //       },
  //       {
  //         title: "YouTube",
  //         icon: <Icons.youtube className="h-4 w-4" />,
  //         href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
  //       },
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/dillionverma/pocketdoc-react-native",
  //       },
  //     ],
  //   },
  //   {
  //     title: "HackMining",
  //     dates: "May 12th - 14th, 2017",
  //     location: "Toronto, Ontario",
  //     description: "Developed neural network to optimize a mining process",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png",
  //     links: [],
  //   },
  //   {
  //     title: "Waterloo Equithon",
  //     dates: "May 5th - 7th, 2017",
  //     location: "Waterloo, Ontario",
  //     description:
  //       "Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png",
  //     links: [
  //       {
  //         title: "Devpost",
  //         icon: <Icons.globe className="h-4 w-4" />,
  //         href: "https://devpost.com/software/pocketdoc-react-native",
  //       },
  //       {
  //         title: "YouTube",
  //         icon: <Icons.youtube className="h-4 w-4" />,
  //         href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
  //       },
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/dillionverma/pocketdoc-react-native",
  //       },
  //     ],
  //   },
  //   {
  //     title: "SpaceApps Waterloo",
  //     dates: "April 28th - 30th, 2017",
  //     location: "Waterloo, Ontario",
  //     description:
  //       "Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png",
  //     links: [
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/dillionverma/earthwatch",
  //       },
  //     ],
  //   },
  //   {
  //     title: "MHacks 9",
  //     dates: "March 24th - 26th, 2017",
  //     location: "Ann Arbor, Michigan",
  //     description:
  //       "Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
  //     links: [
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/dillionverma/threejs-planes",
  //       },
  //     ],
  //   },
  //   {
  //     title: "StartHacks I",
  //     dates: "March 4th - 5th, 2017",
  //     location: "Waterloo, Ontario",
  //     description:
  //       "Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png",
  //     win: "1st Place Winner",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
  //     links: [
  //       {
  //         title: "Source (Mobile)",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/mattBlackDesign/recipic-ionic",
  //       },
  //       {
  //         title: "Source (Server)",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/mattBlackDesign/recipic-rails",
  //       },
  //     ],
  //   },
  //   {
  //     title: "QHacks II",
  //     dates: "February 3rd - 5th, 2017",
  //     location: "Kingston, Ontario",
  //     description:
  //       "Developed a mobile game which enables city-wide manhunt with random lobbies",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
  //     links: [
  //       {
  //         title: "Source (Mobile)",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/dillionverma/human-huntr-react-native",
  //       },
  //       {
  //         title: "Source (API)",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/mattBlackDesign/human-huntr-rails",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Terrible Hacks V",
  //     dates: "November 26th, 2016",
  //     location: "Waterloo, Ontario",
  //     description:
  //       "Developed a mock of Windows 11 with interesting notifications and functionality",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png",
  //     links: [
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/justinmichaud/TerribleHacks2016-Windows11",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Portal Hackathon",
  //     dates: "October 29, 2016",
  //     location: "Kingston, Ontario",
  //     description:
  //       "Developed an internal widget for uploading assignments using Waterloo's portal app",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png",
  //     links: [
  //       {
  //         title: "Source",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/UWPortalSDK/crowmark",
  //       },
  //     ],
  //   },
  // ],
} as const;
