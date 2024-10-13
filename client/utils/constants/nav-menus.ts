import { routes } from "../routes";
import type { AuthUser } from "../types";
import { UserType } from "../types/modals";

export interface INavMenu {
  name: string;
  href?: string;
  child?: INavMenu[];
  userAllowed?: (user: AuthUser | null) => boolean;
}

export const NavMenus: INavMenu[] = [
  { name: "Home", href: routes.web.home() },
  { name: "Blogs", href: routes.web.blogs() },
  { name: "Courses", href: routes.web.tutorials() },
  {
    name: "Admin",
    userAllowed: (user) => user?.userType === UserType.Admin,
    child: [
      { name: "Dashboard", href: routes.admin.dashboard() },
      { name: "Blogs", href: routes.admin.blogs.index() },
      { name: "Blog Categories", href: routes.admin.blogCategories.index() },
      { name: "Tags", href: routes.admin.tags.index() },
      { name: "Projects", href: routes.admin.projects.index() },
      { name: "Contact Messages", href: routes.admin.contactMessage.index() },
    ],
  },
  {
    name: "More",
    child: [
      { name: "Contact", href: routes.web.contact() },
      { name: "Discussion", href: routes.web.discussions() },
      { name: "Portfolio", href: routes.web.portfolio() },
    ],
  },
];
