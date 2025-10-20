import { LinkTypes } from "@/constants/app-types"
import { AppLinks, FooterLinks } from "@/types/app-links"
import { RiLinkedinFill, RiSlackFill, RiYoutubeFill } from "react-icons/ri"

export const footerApplicationLinks: AppLinks[] = [
    { 
        label: "Accueil",
        baseUrl: "/#",
        type: LinkTypes.INTERNAL
     },
     {
        label: "Projets",
        baseUrl: "/#",
        type: LinkTypes.INTERNAL
    },
    {
        label: "Coder Monkeys",
        baseUrl: "/#",
        type: LinkTypes.INTERNAL
    },
    {
        label: "Formations",
        baseUrl: "https://youtube.com",
        type: LinkTypes.EXTERNAL
    }
]

export const footerUserLinks: AppLinks[] = [
    { 
        label: "Mon espace",
        baseUrl: "/#",
        type: LinkTypes.INTERNAL
     },
     {
        label: "Connexion",
        baseUrl: "/connexion",
        type: LinkTypes.INTERNAL
    },
    {
        label: "Inscription",
        baseUrl: "/connexion/inscription",
        type: LinkTypes.INTERNAL
    },
    {
        label: "Mot de passe perdu",
        baseUrl: "/connexion/mot-de-passe-perdu",
        type: LinkTypes.INTERNAL
    }
]

export const footerInfoLinks: AppLinks[] = [
    { 
        label: "CGU",
        baseUrl: "/#",
        type: LinkTypes.INTERNAL
     },
     {
        label: "Conditionalité",
        baseUrl: "/#",
        type: LinkTypes.INTERNAL
    },
    {
        label: "À propos",
        baseUrl: "/#",
        type: LinkTypes.INTERNAL
    },
    {
        label: "Contact",
        baseUrl: "https://youtube.com",
        type: LinkTypes.EXTERNAL
    }
]

export const footerSocialNetworkLinks: AppLinks[] = [
    { 
        label: "Youtube",
        baseUrl: "https://youtube.com",
        type: LinkTypes.EXTERNAL,
        icon: RiYoutubeFill
     },
     {
        label: "Linkedin",
        baseUrl: "https://linkedin.com",
        type: LinkTypes.EXTERNAL,
        icon: RiLinkedinFill
    },
    {
        label: "Slack",
        baseUrl: "https://slack.com",
        type: LinkTypes.EXTERNAL,
        icon: RiSlackFill
    }
]

export const footerAppLinks: FooterLinks[] = [
    {
        label: "App", 
        links: footerApplicationLinks
    },
    {
        label: "Utilisateurs", 
        links: footerUserLinks
    },
    {
        label: "Informations", 
        links: footerInfoLinks
    },
    {
        label: "Réseaux",
        links: footerSocialNetworkLinks
    }
]