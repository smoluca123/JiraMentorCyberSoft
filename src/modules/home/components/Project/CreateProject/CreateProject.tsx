import { Button } from "@/components/ui/button"
import CreateProjectDialog from "@/modules/home/components/Project/CreateProject/CreateProjectDialog"
import { useState } from "react"

export default function CreateProject() {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Button className="block ml-auto text-foreground" onClick={() => {
                setOpen(true)
            }}>
                Create Project
            </Button>

            <CreateProjectDialog open={open} onClose={() => {
                setOpen(false)
            }} />
        </div>
    )
}
