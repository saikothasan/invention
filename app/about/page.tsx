import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About PasteBin',
  description: 'Learn more about our PasteBin service',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About PasteBin</h1>
      <p className="mb-4">
        PasteBin is a simple and efficient text and code sharing platform. It allows users to easily share snippets of text, code, or any other content quickly and securely.
      </p>
      <p className="mb-4">
        Our service is designed with simplicity and usability in mind, making it perfect for developers, students, and anyone who needs to share text or code snippets online.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Key Features:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Quick and easy paste creation</li>
        <li>Syntax highlighting for various programming languages</li>
        <li>Public and private paste options</li>
        <li>Customizable paste expiration</li>
        <li>Responsive design for mobile and desktop</li>
      </ul>
      <p>
        We're constantly working to improve PasteBin and add new features. If you have any suggestions or feedback, please don't hesitate to contact us.
      </p>
    </div>
  )
}

