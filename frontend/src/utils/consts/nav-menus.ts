import { routes } from "../routes";

export interface INavMenu {
  name: string;
  href?: string;
  child?: INavMenu[];
}

export const NavMenus: INavMenu[] = [
  { name: "Home", href: routes.web.home() },
  { name: "Blogs", href: routes.web.blogs() },
  { name: "Courses", href: routes.web.tutorials() },
  {
    name: "More",
    child: [
      { name: "Contact", href: routes.web.contact() },
      { name: "Discussion", href: routes.web.discussions() },
      { name: "Portfolio", href: routes.web.portfolio() },
    ],
  },
  {
    name: "Admin",
    child: [
      { name: "Dashboard", href: routes.admin.dashboard() },
      { name: "Blogs", href: routes.admin.blogs.index() },
    ],
  },
];
