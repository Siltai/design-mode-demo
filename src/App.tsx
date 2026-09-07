import FeatureGrid from './components/FeatureGrid'
import Hero from './components/Hero'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import './App.css'

export default function App() {
  return (
    <div className="page">
      <SiteHeader />
      <main>
        <Hero
          title="support that keeps up with your inbox"
          subtitle="every customer conversation in one queue, routed to the right person, with the numbers moving while the day is still running."
        />
        <FeatureGrid />
      </main>
      <SiteFooter />
    </div>
  )
}
