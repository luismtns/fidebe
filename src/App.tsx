import { FidebeWidget } from '@luisbovo/fidebe-widget'
import './app-style.css'

function App () {
  return (
    <div className='App'>
      <FidebeWidget endpoint='/api/feedback' />
    </div>
  )
}

export default App
