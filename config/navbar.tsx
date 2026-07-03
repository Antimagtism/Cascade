export interface NavbarItem {
    readonly id: string;
    readonly label: string;
    readonly href: string;
}

export interface NavbarButton {
    readonly id: string;
    readonly label: string;
    readonly href: string;
    readonly className: "primary" | "secondary";
}

export const navbarItems : NavbarItem[] = [
    {
        id: "about",
        label: "About",
        href: "/about",
    },
    {
        id: "download",
        label: "Download",
        href: "/download",
    },
    {
        id: "pricing",
        label: "Pricing",
        href: "/pricing",
    }, 
    {
        id: "documentation",
        label: "Docs",
        href: "/docs",
    },
    {
        id: "blog",
        label: "Blog",
        href: "/blog",
    }
] as const;

export const navbarButtons : NavbarButton[] = [
    {
        id: "signin",
        label: "Sign In",
        href: "/signin",
        className: "secondary"
    },
    {
        id: "signup",
        label: "Sign Up",
        href: "/signup",
        className: "primary"
    }
] as const;