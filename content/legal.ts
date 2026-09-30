import { SITE } from "./site";

/**
 * The legal pages. These are sensible starting texts for a venture firm's website, not legal
 * advice: have counsel review them (especially the disclosures, and the governing-law clause)
 * before launch.
 */

export type LegalDoc = {
  slug: "disclosures" | "privacy" | "terms";
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const UPDATED = "2026-09-29";

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "disclosures",
    title: "Disclosures",
    updated: UPDATED,
    intro: `This website is provided by ${SITE.legalName} ("Teralven") for informational purposes only. By using it, you acknowledge the following.`,
    sections: [
      {
        heading: "Not an offer",
        paragraphs: [
          "Nothing on this website constitutes an offer to sell, or a solicitation of an offer to buy, any security, investment product or interest in any fund or vehicle managed or advised by Teralven or its affiliates. Any such offer would be made only by means of confidential offering documents, to eligible investors, and in accordance with applicable law.",
        ],
      },
      {
        heading: "No investment advice",
        paragraphs: [
          "The content of this website is not investment, legal, tax or accounting advice, and should not be relied upon in making any investment decision. You should consult your own advisers before making any investment.",
        ],
      },
      {
        heading: "Portfolio companies",
        paragraphs: [
          "Companies described on this website are shown for illustrative purposes and may not represent all of the investments made by Teralven. It should not be assumed that any investment identified was or will be profitable. Past performance is not indicative of future results.",
          "Names, logos and images of portfolio companies are the property of their respective owners and are used for identification purposes only.",
        ],
      },
      {
        heading: "Views and forward-looking statements",
        paragraphs: [
          "Articles and other content reflect the views of Teralven as of the date they were published and may change without notice. Statements about the future are inherently uncertain, and actual results may differ materially from any expectation expressed.",
        ],
      },
      {
        heading: "Third-party information",
        paragraphs: [
          "Certain information on this website has been obtained from third-party sources believed to be reliable. Teralven has not independently verified that information and makes no representation as to its accuracy or completeness.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: UPDATED,
    intro: `This policy explains what information ${SITE.legalName} ("Teralven", "we") collects through this website and how we use it.`,
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "Information you choose to send us, for example your name, email address, company, links and message when you submit the contact form or email us.",
          "Basic technical information needed to deliver and secure the website, such as your IP address, browser type and the pages requested, which our hosting provider may record in server logs.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "To respond to you, to evaluate potential investments and partnerships, and to operate, maintain and protect the website. We do not sell your personal information.",
        ],
      },
      {
        heading: "Who we share it with",
        paragraphs: [
          "Service providers that help us run the website and deliver email, acting on our behalf and under appropriate confidentiality obligations; and authorities where the law requires it.",
        ],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "This website does not use advertising cookies or third-party tracking. If that changes, we will update this policy before it does.",
        ],
      },
      {
        heading: "Retention and your choices",
        paragraphs: [
          `We keep information only as long as it is needed for the purposes above or as required by law. You may ask us to access, correct or delete your information through the contact page of this website.`,
        ],
      },
      {
        heading: "Changes",
        paragraphs: ["We may update this policy from time to time. The date at the top of this page shows when it last changed."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    updated: UPDATED,
    intro: `These terms govern your use of this website, operated by ${SITE.legalName} ("Teralven"). By using the website you agree to them.`,
    sections: [
      {
        heading: "Use of the website",
        paragraphs: ["You may use this website for lawful, personal and informational purposes. You may not interfere with its operation or attempt to gain unauthorized access to any part of it."],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The content of this website, including text, graphics, design and the Teralven name and mark, belongs to Teralven or its licensors. Portfolio company names, logos and images belong to their respective owners.",
        ],
      },
      {
        heading: "Submissions",
        paragraphs: [
          "Materials you send us, including through the contact form, are not treated as confidential, and sending them creates no obligation on our part. Please do not send confidential or proprietary information. We may be reviewing or investing in companies with similar ideas.",
        ],
      },
      {
        heading: "Disclaimers",
        paragraphs: [
          'The website is provided "as is", without warranties of any kind. We do not warrant that it will be available, uninterrupted or free of errors, or that its content is complete or current.',
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: ["To the fullest extent permitted by law, Teralven is not liable for any damages arising from your use of, or inability to use, this website or its content."],
      },
      {
        heading: "Links",
        paragraphs: ["Links to third-party websites are provided for convenience. We are not responsible for their content or practices."],
      },
      {
        heading: "Changes and contact",
        paragraphs: ["We may update these terms at any time by posting a new version here. Questions can be sent through the contact page of this website."],
      },
    ],
  },
];

export const legalBySlug = (slug: string) => LEGAL_DOCS.find(item => item.slug === slug);
