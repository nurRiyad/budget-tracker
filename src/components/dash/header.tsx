import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Header () {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Budget planning and tracking
      </p>
    </div>
    <div className="flex items-center gap-3">
      <div className="text-sm text-muted-foreground">
        Jsn 2025
      </div>
      <Button size="sm" className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Generate Next Month
      </Button>
    </div>
  </div>
  )
}