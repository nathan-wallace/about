<script>
import Heading from '$lib/components/Heading/Heading.svelte';
import ExperienceCard from '$lib/components/ExperienceCard/ExperienceCard.svelte';
import Container from '$lib/components/Container/Container.svelte';
import Link from '$lib/components/Link/Link.svelte';
import { base } from '$app/paths';
</script>
<svelte:head>
  <title>Experience — Nathan Wallace</title>
  <meta name="description" content="About Nathan Wallace: Technology specialist with full-stack range and program leadership. Federal, higher-ed, and association experience. PMP, CSM, ITIL v4, DHS Trusted Tester." />
  <meta property="og:title" content="Nathan Wallace — Program Management & Software Development (Front-end Specialist)" />
  <meta property="og:description" content="I turn strategy into shipped products with the customer in focus." />
  <meta property="og:image" content="https://nathan-wallace.github.io/about/meta.png" />
</svelte:head>
<Container noSpaceY={true}>
 <Heading level={1}>Experience</Heading>
 </Container>
 <Container>
<section id="experience">
  <ExperienceCard
    title="Federal Web Services"
    summary="Leading digital transformation projects across federal agencies."
    labelPosition="bottom"
    bgColor="#FFF"
    togglePosition="bottom-right"
    variant="light"
  >
    <p><strong>Project &amp; Program Manager – WebFirst Inc.</strong><br/>Led Scrum delivery for HHS/ASPA's <em>hhs.gov</em>, managed Service Desk, Website Migrations, and guided NIH's <em>CCR.cancer.gov</em> and NIH Library support projects. Led DOL/EBSA automated testing efforts and oversaw SSAB's cloud.gov WordPress maintenance. (<Link href="https://hhs.gov/">hhs.gov</Link>)</p>
    <p><strong>VP, Digital – Yes&amp; Agency</strong><br/>DHS FEMA Drupal SME for <em>floodsmart.gov</em>; delivered Discount Estimation &amp; Claims Map solution and Storybook USWDS landing pages. (<Link href="https://floodsmart.gov/">floodsmart.gov</Link>)</p>
    <p><strong>Applications Team Lead – TrustedForce LLC</strong><br/>Maintained AWS WCMS for the U.S. Mint, leading project planning, DR exercises, backups, application security, and deployments.(<Link href="https://usmint.gov/">usmint.gov</Link>)</p>
    <p><strong>Multimedia Developer – 1st American System and Services</strong><br/>Created FAA interactive training modules using JavaScript frameworks and SCORM standards.</p>
  </ExperienceCard>

  <ExperienceCard
    title="Higher Education Technology"
    summary="Driving platform strategy and integrations for university web ecosystems."
    video={`${base}/highered.mp4`}
    labelPosition="top"
    bgColor="#1c1c1e"
    togglePosition="top-right"
    variant="dark"
  >
    <p><strong>Associate Director &amp; Senior Web Developer – Georgetown University</strong><br/>Managed a multi-site Drupal and WordPress platforms, led theme &amp; module development, coordinated CRM integrations, and guided cross-functional teams toward accessible, responsive design. (<Link href="https://alumni.georgetown.edu/">alumni.georgetown.edu</Link>)</p>
    <p><strong>Fornace Labs - Georgetown University</strong><br/>Supported the Center for the Study of Metabolomics with communications and web support. (<Link href="https://metabolomics.georgetown.edu/">metabolomics.georgetown.edu</Link>)</p>
    <p><strong>Bouvé College of Health Sciences</strong><br/>Delivered React-based programs search tool for the WordPress and led a homepage redesign and updated theme in 2016. (<Link href="https://bouve.northeastern.edu/">bouve.northeastern.edu</Link>)</p>
    <p><strong>K-12 Schools</strong><br/>Website development, maintenance, enrollment management, and social media marketing for private and public schools.</p>
  </ExperienceCard>

  <ExperienceCard
    title="Nonprofit Board Service"
    summary="Nonprofit leadership and event operations for technology communities."
    labelPosition="left"
    bgColor="#1c1c1e"
    togglePosition="bottom-right"
    variant="dark"
  >
    <p><strong>Vice Chair – Drupal4Gov</strong><br/>Providing leadership and strategic direction since 2025 serving all levels of government employees committed to open source technology. (<Link href="https://drupal4gov.us/">drupal4gov.us</Link>)</p>
    <p><strong>At-Large Board Member – WPCampus</strong><br/>Organizing community events and supporting nonprofit governance for community of web professionals, educators, and people dedicated to the confluence of WordPress and accessibility in higher education. (<Link href="https://wpcampus.org/">wpcampus.org</Link>)</p>
  </ExperienceCard>
</section>
</Container>
<style>
  #experience {
    display: grid;
    gap: var(--spacing-s);
    grid-template-columns: 1fr;
  }
  @media (min-width: 600px) {
    #experience {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1024px) {
    #experience {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
