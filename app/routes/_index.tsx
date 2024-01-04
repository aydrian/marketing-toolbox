import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div>
      <header>Marketing ToolBox</header>
      <main>
        <div>
          <Link to="/streams">Streams</Link>
        </div>
        <div>QR Code Generator</div>
        <div>Swag Inventory</div>
      </main>
    </div>
  )
}
