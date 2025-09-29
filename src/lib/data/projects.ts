export const projects = [
  {
    title: 'The National Debt',
    description: 'An interactive web app that visualizes U.S. federal debt using live Treasury data, featuring dynamic chart and an animated ticker to make the history of the debt easy to explore.',
    link: 'https://nathan-wallace.github.io/the-national-debt/',
    image: '/the-national-debt.webp',
    skills: ['D3.js']
  },
  {
    title: 'Social Design Kit',
    description: 'Kickstart social media campaigns with this GitHub template built on Storybook, letting teams create, preview, and export on-brand assets, drag-and-drop helpers, and ready-to-customize platform canvases.',
    link: 'https://github.com/nathan-wallace/social-toolkit-starter',
    image: '/social-design-kit.png',
    skills: ['Storybook', 'Design Systems', 'JavaScript']
  },
  {
    title: 'SpeakEasy for Drupal',
    description: 'Using the built-in browser features for TTS, this module provides a seamless way to convert written content into speech without the need for external services.',
    link: 'https://www.drupal.org/project/speakeasy',
    image: '/speakeasy.png',
    skills: ['Drupal', 'Accessibility']
  },
  {
    title: 'Wayback Radio',
    description: 'Explore archival audio recordings through a unique, year-by-year browsing experience. By selecting a specific year, a listener can journey through history via sound.',
    link: 'https://nathan-wallace.github.io/wayback-radio',
    image: '/wayback-radio.png',
    skills: ['API Integration', 'JavaScript', 'Svelte']
  },
  {
    title: 'LOC Collections',
    description: 'Explore thousands of Library of Congress artifacts, photographs, and documents. Choose a collection, browse unique items, and save your favorites for future reference.',
    link: 'https://nathan-wallace.github.io/loc-collections',
    image: '/loc-collections.png',
    skills: ['API Integration', 'JavaScript', 'Svelte']
  },
  {
    title: 'Daily Earthquakes',
    description: '3D visualization of recent earthquake data across the globe, using Three.js. USGS data is displayed as animated points on a 3D Earth model, with options to control playback, time, and interactivity.',
    link: 'https://dailyearthquakes.com',
    image: '/dailyearthquakes.png',
    skills: ['three.js']
  },
  {
    title: 'Risk Manager',
    description: 'Web application for tracking, analyzing, and reporting project risks. You can maintain a risk register, adding risks with full details (title, description, owner, mitigation, probability/impact, etc.) that feed into the matrix, timeline, and table view.',
    link: 'https://nathan-wallace.github.io/risk-mgmt/projects',
    image: '/risk-mgmt.png',
    skills: ['React'],
    details: {
      title: 'Risk Manager',
      description:
        'The app lets you set up projects with details like name, manager, sponsor, dates, and a risk plan, while defining custom categories. Each project has a dashboard showing an overall risk score, a 5×5 risk matrix, and a timeline of risk history. You can maintain a risk register, adding risks with full details (title, description, owner, mitigation, probability/impact, etc.) that feed into the matrix and table view. For management, you can edit project info, adjust categories, and import/export the risk register, with quick controls for adding risks or projects.',
      links: [
        { href: 'https://nathan-wallace.github.io/risk-mgmt/projects', text: 'Visit site' }
      ],
      img: '/risk-mgmt.png'   
  }
}
];
