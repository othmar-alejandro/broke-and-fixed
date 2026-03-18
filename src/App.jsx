import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
