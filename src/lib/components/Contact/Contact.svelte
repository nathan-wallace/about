<script>
    import { designSystem } from '$lib/designSystem';

  import Container from '$lib/components/Container/Container.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import Heading from '$lib/components/Heading/Heading.svelte';
  import Link from '$lib/components/Link/Link.svelte';
  export let email = 'nathan.s.wallace@gmail.com';
</script>

<section id="contact" class="contact">
  <Container>
    <Heading level={2}>Contact</Heading>
    <p>Let’s talk about your roadmap, your users, and the fastest path to a confident demo.</p>
    <p>Email: <Link href="mailto:{email}">{email}</Link></p>
    <Button href="mailto:{email}">Send a note</Button>
  </Container>
</section>

<style>
  .contact {
    text-align: center;
  }

  .contact p {
    margin: 0 0 var(--spacing-s) 0;
  }
</style>
