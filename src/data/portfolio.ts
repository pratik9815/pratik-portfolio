import type { PortfolioResponse } from '../features/portfolio/types';

/**
 * YOUR CONTENT GOES HERE.
 * Profile, experience, and projects include your supplied work. All content remains editable.
 * Add/remove array entries freely; sections and filters update automatically.
 * Null project links stay hidden. Add an image URL to replace the built-in artwork.
 */
export const mockPortfolioResponse: PortfolioResponse = {
  success: true,
  data: {
    profile: {
      name: 'Pratik Chamlagain',
      initials: 'PC',
      role: 'Software engineer',
      location: 'Kathmandu, Nepal',
      timezone: 'Asia/Kathmandu',
      email: 'pchamlagain12@gmail.com',
      available: true,
      availability: 'Open to interesting opportunities',
      headline: ['Thoughtful code.', 'Meaningful impact.'],
      introduction:
        'I turn complex problems into simple, useful digital experiences. From the interface to the infrastructure, I love making things work beautifully.',
      about: [
        'Hey, I’m Pratik. An engineer by trade and a curious builder at heart. I enjoy connecting the dots between design, engineering, and the people who use what we create.',
        'My experience spans remittance and banking systems, along with claims processing. At Inficare Pvt. Ltd., I worked with C#, ASP.NET Framework, SQL Server, IIS, and Azure DevOps on fintech applications. At Smart Data Solutions, I primarily use Java and SQL to convert paper claims into electronic data interchange (EDI) files and support claims-processing workflows.',
      ],
      interests: [
        'Side projects',
        'Good coffee',
        'Mountain trails',
        'Open source',
      ],
      currently: 'Building claims-processing workflows at Smart Data Solutions',
      // Add your PDF to public/cv.pdf, then set url: '/cv.pdf' and filename: 'Your-Name-CV.pdf'.
      // With url: null, a PDF CV is generated in the browser from the data below.
      cv: { url: null, filename: 'Pratik-CV.pdf' },
      // Replace these sample URLs with your profiles, or remove entries you don't need.
      socials: [
        {
          label: 'GitHub',
          url: 'https://github.com/pratik9815',
          icon: 'github',
        },
        {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/pratik-chamlagain-b29181241',
          icon: 'linkedin',
        },
      ],
    },
    education: [
      {
        id: 'ioe-purwanchal',
        qualification: 'Computer Engineering',
        institution: 'IOE Purwanchal Campus',
        location: 'Dharan, Nepal',
        // Add your study dates or graduation year here when you want them displayed.
        period: '2020–2024',
      },
    ],
    projectDisplay: { initialCount: 2, increment: 2 },
    projects: [
      {
        id: 'remittance-system',
        name: 'Remittance System',
        category: 'Professional',
        description:
          'Professional contributions to remittance and banking systems at Inficare Pvt. Ltd., using C# and ASP.NET Framework.',
        year: '2024–2025',
        role: 'Software Engineer at Inficare Pvt. Ltd.',
        tags: ['C#', 'ASP.NET Framework', 'SQL Server', 'IIS', 'Azure DevOps'],
        image: '/projects/remittance-system.svg',
        links: { live: null, source: null },
        overview:
          'Contributed to the development and maintenance of remittance and banking applications at Inficare Pvt. Ltd. The work involved C# and ASP.NET Framework for application development, SQL Server for data storage and database operations, IIS for application hosting, and Azure DevOps within the delivery and maintenance workflow.',
        highlights: [
          'Developed and maintained application features using C# and ASP.NET Framework.',
          'Worked with SQL Server for application data and database operations.',
          'Worked with IIS-hosted applications and Azure DevOps delivery workflows.',
          'Contributed to remittance and banking systems as part of the engineering team.',
        ],
      },
      {
        id: 'claims-processing',
        name: 'Claims Processing Workflow',
        category: 'Professional',
        description:
          'Claims-processing work at Smart Data Solutions, using Java and SQL to support paper-to-EDI conversion and related workflows.',
        year: '2025–Present',
        role: 'Software Engineer at Smart Data Solutions',
        tags: ['Java', 'SQL', 'EDI', 'Claims processing'],
        image: '/projects/claims-processing.svg',
        links: { live: null, source: null },
        overview:
          'Working on claims-processing systems at Smart Data Solutions, primarily using Java and SQL. The work focuses on converting paper claims into electronic data interchange (EDI) files and supporting the related processes throughout the claims workflow.',
        highlights: [
          'Develop and maintain claims-processing functionality using Java and SQL.',
          'Support the conversion of paper claims into EDI files.',
          'Work on the processes that connect the stages of the claims workflow.',
        ],
      },
      {
        id: 'teashop-pos',
        name: 'TeaShopPOS',
        category: 'Personal',
        description:
          'A tea-shop point-of-sale system for table orders, billing, loyalty, and day-to-day operations, with automated GitHub Actions CI/CD pipelines. Demo available upon request.',
        year: 'Personal project',
        role: 'Full-stack development',
        tags: [
          'C#',
          'ASP.NET Core MVC',
          'Entity Framework Core',
          'PostgreSQL',
          'SignalR',
          'GitHub Actions',
          'CI/CD',
        ],
        image: '/projects/teashop-pos.svg',
        links: {
          live: null,
          source: null,
        },
        overview:
          'TeaShopPOS brings tea-shop operations into one ASP.NET Core MVC application, from product variants and table reservations to orders, invoices, and payments. A four-project structure separates domain, application, infrastructure, and web concerns, with Entity Framework Core and PostgreSQL for persistence. Staff permissions, customer loyalty, promotions, and reporting support the workflows around each sale. GitHub Actions pipelines automate continuous integration and deployment.',
        highlights: [
          'Manage table reservations, open orders, product categories, and product variants.',
          'Generate invoices and process payments with tax calculations, controlled discounts, promotional codes, and loyalty-point redemption.',
          'Control staff access through ASP.NET Core Identity roles and menu-level permission claims.',
          'Review sales, payment, tax, table-utilization, and staff-performance reports, with CSV export.',
          'Send in-app table-booking and payment notifications using SignalR.',
          'Organize persistence through Entity Framework Core, PostgreSQL, repositories, and a unit of work.',
          'Automate continuous integration and deployment with GitHub Actions build and deployment workflows.',
        ],
      },
      {
        id: 'streamx',
        name: 'StreamX',
        category: 'Personal',
        description:
          'A real-time messaging application with direct and group chats, live presence, typing indicators, and read receipts, with automated GitHub Actions CI/CD pipelines. Demo available upon request.',
        year: 'Personal project',
        role: 'Full-stack development',
        tags: [
          'C#',
          'ASP.NET Core',
          'SignalR',
          'PostgreSQL',
          'Entity Framework Core',
          'JWT',
          'GitHub Actions',
          'CI/CD',
        ],
        image: '/projects/streamx.svg',
        links: {
          live: null,
          source: null,
        },
        overview:
          'StreamX is a real-time messaging application built with ASP.NET Core, SignalR, Entity Framework Core, and PostgreSQL. It supports one-to-one conversations and group chats, with a server-rendered web interface and JWT-authenticated APIs for external clients. Conversation access checks, message delivery and read receipts, typing indicators, and online presence connect the interface to the underlying messaging workflow. GitHub Actions pipelines automate continuous integration and deployment.',
        highlights: [
          'Exchange direct and group messages over SignalR, with replies, message editing, and soft deletion.',
          'Manage group participants, rename conversations, assign group administrators, and leave groups.',
          'Track online presence, typing activity, delivery acknowledgements, read receipts, and unread counts.',
          'Authenticate API clients using JWT access tokens and rotating refresh tokens alongside the web interface’s cookie-based authentication.',
          'Persist messages before broadcasting and use client message IDs to prevent duplicate sends on retries.',
          'Load message history with cursor-based pagination and enforce conversation-participant access checks.',
          'Support validated image uploads, image messages, and real-time in-app notifications.',
          'Automate continuous integration and deployment with GitHub Actions build and deployment workflows.',
        ],
      },
    ],
    expertise: [
      {
        title: 'Frontend engineering',
        description: 'Interfaces that feel as good as they work.',
        icon: 'code',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      },
      {
        title: 'Backend & architecture',
        description: 'A solid foundation for ambitious ideas.',
        icon: 'server',
        skills: [
          'C#',
          'ASP.NET Framework',
          'SQL Server',
          'Java',
          'SQL',
          'ASP.NET Core',
          'Node.js',
          'PostgreSQL',
          'REST APIs',
        ],
      },
      {
        title: 'Cloud & DevOps',
        description: 'From a local build to a reliable release.',
        icon: 'cloud',
        skills: [
          'IIS',
          'Azure DevOps',
          'GitHub Actions',
          'AWS',
          'Docker',
          'CI/CD',
          'Terraform',
        ],
      },
      {
        title: 'Beyond the stack',
        description: 'The thinking that connects everything.',
        icon: 'sparkles',
        skills: ['System design', 'UI/UX', 'Agile', 'AI integration'],
      },
    ],
    // Most recent role first. Add a location when you want it shown on the site and CV.
    experience: [
      {
        id: 'smart-data-solutions',
        company: 'Smart Data Solutions',
        role: 'Software Engineer',
        period: 'December 2025 — Present',
        location: '',
        current: true,
        description:
          'Developing and maintaining claims-processing systems primarily using Java and SQL, with a focus on converting paper claims into electronic data interchange (EDI) files and supporting the processes within the claims workflow.',
        tags: [
          'Java',
          'SQL',
          'Claims processing',
          'Paper-to-EDI conversion',
          'Workflow processing',
        ],
      },
      {
        id: 'inficare',
        company: 'Inficare Pvt. Ltd.',
        role: 'Software Engineer',
        period: 'June 2024 — December 2025',
        location: '',
        current: false,
        description:
          'Worked on fintech systems, particularly remittance and banking applications, using C#, ASP.NET Framework, and SQL Server. Worked with IIS server hosting and Azure DevOps as part of application delivery and maintenance.',
        tags: [
          'C#',
          'ASP.NET Framework',
          'SQL Server',
          'IIS',
          'Azure DevOps',
          'Remittance',
          'Banking systems',
        ],
      },
    ],
    contact: {
      heading: 'Have something in mind?',
      description:
        'A project, an opportunity, or just a good conversation. I’d love to hear from you.',
      subject: 'Let’s build something together',
    },
  },
};
