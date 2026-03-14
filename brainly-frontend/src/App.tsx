import { Button } from './components/button'
import { Sidebar } from './components/sidebar'
import { Card } from './components/card'
import { PlusIcon } from './icons/plus'
import { ShareIcon } from './icons/shareIcon'

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">All Notes</h2>
          <div className="flex gap-3">
            <Button
              varient="secondary"
              size="md"
              text="Share Brain"
              startIcon={<ShareIcon size="sm" />}
              onClick={() => alert("Share Brain clicked")}
            />
            <Button
              varient="primary"
              size="md"
              text="Add Content"
              startIcon={<PlusIcon size="sm" />}
              onClick={() => alert("Add Content clicked")}
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card
            title="Project Ideas"
            type="document"
            contentList={[
              "Build a personal knowledge base",
              "Create a habit tracker",
              "Design a minimalist todo app",
            ]}
            tags={["productivity", "ideas"]}
            addedDate="10/03/2024"
          />

          <Card
            title="How to Build a Second Brain"
            type="video"
            tags={["productivity", "learning"]}
            addedDate="09/03/2024"
          />

          <Card
            title="Productivity Tip"
            type="tweet"
            content="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way."
            tags={["productivity", "learning"]}
            addedDate="08/03/2024"
          />
        </div>
      </div>
    </div>
  )
}