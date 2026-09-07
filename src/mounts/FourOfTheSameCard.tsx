/* A mount for Silt: renders the one FeatureCard whose copy is "four of the
   same card", exactly as FeatureGrid renders it.

   It exists because FeatureCard's `well` prop is a ReactNode — an svg that
   carries FeatureGrid's own scoped classes — and silt_push's JSON `shell`
   cannot hold that. Pulling the props straight off the exported CARDS keeps
   this honest: change the copy or the drawing on the page and the capture
   follows, instead of drifting from a copy pasted in here.

   index.css comes in for the tokens both stylesheets read (--surface, --ring,
   --accent, the space and radius scales) and for the reduced-motion rule. */
import FeatureCard from '../components/FeatureCard'
import { CARDS } from '../components/FeatureGrid'
import '../index.css'

const card = CARDS[0]

export default function FourOfTheSameCard() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--s-6)',
        background: 'var(--bg)',
        color: 'var(--ink)',
      }}
    >
      {/* Matches the grid track the card sits in on the page — minmax(15rem, 1fr)
          settles near this on a four-up row, so the well keeps its 4:3 and the
          description wraps over the same number of lines. */}
      <div style={{ width: '17rem' }}>
        <FeatureCard {...card} />
      </div>
    </div>
  )
}
