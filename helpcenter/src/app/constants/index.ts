// export const helpTopics = [
//   {
//     title: 'Getting Started',
//     description:
//       'Learn how to set up your account, navigate the platform, and explore essential features to start using the system smoothly with confidence and ease of access today.',
//     imgSrc: '/helpcenter/GettingStarted.jpg',
//     link: '/help/getting-started',
//   },
//   {
//     title: 'Course Access',
//     description:
//       'Discover how to browse, enroll in courses, and access your learning materials seamlessly. Follow simple steps to start your educational journey and expand your knowledge today.',
//     imgSrc: '/helpcenter/Course.jpg',
//     link: '/help/course-access',
//   },
//   {
//     title: 'Billing and Payment',
//     description:
//       'Understand available payment methods, manage subscriptions, and update billing details. Ensure a hassle-free experience while handling your financial transactions securely.',
//     imgSrc: '/helpcenter/Billing.jpg',
//     link: '/help/billing-payment',
//   },
//   {
//     title: 'File Management',
//     description:
//       'Learn how to upload, rename, organize, and delete files effectively. Maintain a well-structured file system for easy access and efficient learning with smooth navigation anytime.',
//     imgSrc: '/helpcenter/File.jpg',
//     link: '/help/file-management',
//   },
//   {
//     title: 'Online Classes',
//     description:
//       'Join live sessions, interact with instructors, access recorded lectures, and enhance your learning experience. Discover the best practices for engaging in real-time virtual classrooms.',
//     imgSrc: '/helpcenter/Classes.jpg',
//     link: '/help/live-classes',
//   },
//   {
//     title: 'Security and Protection',
//     description:
//       'Protect your account by setting strong passwords, recognizing suspicious activities, and enabling security features. Follow these tips to keep your data safe and secure always.',
//     imgSrc: '/helpcenter/Security.jpg',
//     link: '/help/security-protection',
//   },
// ];

// export const helpList = [
//   {
//     category: 'Getting Started',
//     title: 'How to create an account?',
//     description: 'Learn how to sign up and set up your profile in just a few simple steps.',
//     imgSrc: '/images/help/account-setup.png',
//     link: '/help/how-to-create-account',
//   },
//   {
//     category: 'Getting Started',
//     title: 'How do I reset my password?',
//     description: 'Follow easy steps to securely reset your password if you forget it.',
//     imgSrc: '/images/help/reset-password.png',
//     link: '/help/reset-password',
//   },
//   {
//     category: 'Getting Started',
//     title: 'Where can I find my account settings?',
//     description: 'Access and customize your account preferences in the settings menu.',
//     imgSrc: '/images/help/account-settings.png',
//     link: '/help/account-settings',
//   },
//   {
//     category: 'Getting Started',
//     title: 'What should I do if I encounter a technical issue?',
//     description: 'Get troubleshooting tips to resolve common technical problems quickly.',
//     imgSrc: '/images/help/technical-issues.png',
//     link: '/help/technical-issues',
//   },
//   {
//     category: 'Billing and Payment',
//     title: 'How do I update my payment method?',
//     description: 'Learn how to securely update or change your payment details.',
//     imgSrc: '/images/help/payment-method.png',
//     link: '/help/update-payment',
//   },
//   {
//     category: 'Billing and Payment',
//     title: 'How can I cancel my subscription?',
//     description: 'Step-by-step guide to cancel your subscription easily.',
//     imgSrc: '/images/help/cancel-subscription.png',
//     link: '/help/cancel-subscription',
//   },
// ];

// constants/index.ts

// constants/index.ts

export interface Step {
  text: string;
  img?: string;
}

export interface ContentData {
  category: string;
  videoUrl: string;
  title: string;
  description: string;
  steps: Step[];
  thumbnail: string;
}

export const CONTENT_DATA: ContentData[] = [
  {
    category: 'Getting Started',
    videoUrl: 'https://youtube.com/embed/XZrlPWs33Cw',
    title: 'How to create an account?',
    description: 'Learn how to sign up and set up your profile in just a few simple steps.',
    steps: [
      {
        text: 'Step 1: Click on the ‘Sign Up’ button to redirect to Sign Up page.',
        img: '/SignUp1.png',
      },
      {
        text: 'Step 2: Fill up the necessary details to create an account, including: ‘First Name’, ‘Last Name’, ‘Email’, and ‘Password’. After that, agree to the ‘Terms & Condition’ of the system',
        img: '/SignUp2.png',
      },
      {
        text: 'Step 3: Then, click the ‘Create Account’ button to begin using the platform. Once your account is created, you can start exploring its features through signing in.',
        img: '/SignUp3.png',
      },
    ],
    thumbnail: '/images/help/signup-thumbnail.jpg',
  },
  {
    category: 'Getting Started',
    videoUrl: 'https://youtube.com/embed/KXKqG1s3Yto',
    title: 'How to sign in an account?',
    description: 'Follow easy steps to securely reset your password if you forget it.',
    steps: [
      {
        text: 'Step 1: Click on "Forgot Password" on the login page.',
        img: '/images/help/reset-password-step1.jpg',
      },
      {
        text: 'Step 2: Enter your registered email address and submit the request.',
      },
      {
        text: 'Step 3: Check your email for a password reset link and follow the instructions.',
        img: '/images/help/reset-password-step3.jpg',
      },
    ],
    thumbnail: '/images/help/reset-password-thumbnail.jpg',
  },


  {
    category: 'Billing and Payment',
    videoUrl: 'https://www.youtube.com/embed/exampleVideo3',
    title: 'How to pay a course?',
    description: 'Learn how to securely update or change your payment details.',
    steps: [
      {
        text: 'Step 1: Go to "Billing" under account settings.',
        img: '/images/help/payment-step1.jpg',
      },
      {
        text: 'Step 2: Click on "Update Payment Method" and enter new details.',
      },
      {
        text: 'Step 3: Confirm your changes and save them securely.',
        img: '/images/help/payment-step3.jpg',
      },
    ],
    thumbnail: '/images/help/payment-thumbnail.jpg',
  },
  {
    category: 'Online Classes',
    videoUrl: 'https://www.youtube.com/embed/exampleVideo4',
    title: 'How do I join a live class session?',
    description: 'Access live sessions through the course portal or provided meeting link.',
    steps: [
      {
        text: 'Step 1: Navigate to the "Live Classes" section.',
        img: '/images/help/live-class-step1.jpg',
      },
      {
        text: 'Step 2: Click on the scheduled class link.',
      },
      {
        text: 'Step 3: Join the session and interact using the chat feature.',
        img: '/images/help/live-class-step3.jpg',
      },
    ],
    thumbnail: '/images/help/live-class-thumbnail.jpg',
  },
];
