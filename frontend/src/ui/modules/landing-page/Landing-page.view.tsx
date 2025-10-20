import { CallToActionView } from "./components/call-to-action/Call-to-action.view"
import { CoderMonkeysSlackView } from "./components/coder-monkeys-slack/Coder-monkeys-slack.view"
import { CurrentCourseCtaView } from "./components/current-course-cta/Current-course-cta.view"
import { FeaturedView } from "./components/featured/Featured.view"
import { FeaturedView2 } from "./components/featured copy/Featured.view"
import { HeroTopView } from "./components/hero-top/Hero-top.view"
import { HighlightListView } from "./components/highlight-list/Highlight-list.view"

export const LandingPageView = () => {
    return <>
        <HeroTopView />
        <FeaturedView />
        <FeaturedView2 />
        <CoderMonkeysSlackView />
        <CurrentCourseCtaView />
        <HighlightListView />
        <CallToActionView />
    </>
}