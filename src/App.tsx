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
          title="the simplest page worth pointing at"
          subtitle="there is no product behind this. it is the smallest honest landing page we could build — enough real components to point at, change, and send somewhere else."
        />
        <FeatureGrid />
      </main>
      <SiteFooter />
    </div>
  )
}
