import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PasteBin Documentation',
  description: 'Learn how to use PasteBin effectively',
}

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">PasteBin Documentation</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
        <p className="mb-4">
          To create a new paste, simply navigate to the home page and use the paste form. Enter your content, select the appropriate options, and click "Create Paste".
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Creating a Paste</h2>
        <ol className="list-decimal list-inside mb-4">
          <li>Enter your content in the text area</li>
          <li>Select the syntax highlighting (if applicable)</li>
          <li>Choose the expiration time</li>
          <li>Set the paste visibility (public or private)</li>
          <li>Click "Create Paste"</li>
        </ol>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Viewing Pastes</h2>
        <p className="mb-4">
          To view a paste, simply click on its link or enter the paste ID in the URL. Public pastes can be viewed by anyone, while private pastes require the correct URL.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">API Usage</h2>
        <p className="mb-4">
          PasteBin offers a simple API for programmatic paste creation and retrieval. Refer to our API documentation for more details on endpoints and usage.
        </p>
      </section>
    </div>
  )
}

