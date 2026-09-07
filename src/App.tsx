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
          title="Support that keeps up with your inbox"
          subtitle="Kettle brings every customer conversation into one queue, routes it to the right person, and tells you how you are doing while the day is still running."
        />
        <FeatureGrid />
      </main>
      <SiteFooter />
    </div>
  )
}
