document.addEventListener("astro:page-load", function () {
  const url = window.location.href;
  const links = document.querySelectorAll(
    "[data-nav-menu-container] a",
  ) as unknown as HTMLAnchorElement[];

  links.forEach((link) => {
    if (link.href === url) {
      link.classList.add("bg-primary", "text-base-100"); // Add the "active" class if the URL matches
    }
  });
});
