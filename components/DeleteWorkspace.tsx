"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import api from "@/app/api/axiosConfig"
import { useAuthStore } from "@/store/use-auth"
import { useRouter } from "next/navigation"
// import { useSession } from "next-auth/react";

interface DeleteWorkspaceProps {
    workspaceId: string
    userWorkspace: []
}

export default function DeleteWorkspace({workspaceId, userWorkspace}: DeleteWorkspaceProps) {
  const {user} = useAuthStore()  
  const [confirmText, setConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
//   const { data: session } = useSession()
//   const userId = session?.user?.id
    

  const handleDelete = async () => {

    if (typeof workspaceId !== "string" || !workspaceId) {
        toast({
          title: "Error",
          description: "Invalid workspace ID. Please try again",
          variant: "destructive",
        })
        return
    }

    setIsDeleting(true)
    console.log(workspaceId, "from delete component")
    
    try {
      // Simulating API call
      await api.delete(`/delete-workspace/${workspaceId}`)
      if (userWorkspace.length > 0) {
        router.push(`/user/${user?.id}/workspaces`)
      } else {
        router.push(`/createworkspace`)
      }
      toast({
        title: "Workspace deleted",
        description: "Your workspace has been successfully deleted.",
        variant: "default",
      })

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete workspace. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setConfirmText("")
    }
  }

  return (
    <div className='md:w-[70%]'>
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-destructive flex items-center gap-2">
          <Trash2 className="h-6 w-6" />
          Delete Workspace
        </CardTitle>
        <CardDescription>
          This action cannot be undone. This will permanently delete your workspace and remove all associated data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To confirm, type <span className="font-semibold">"delete my workspace"</span> in the box below:
          </p>
          <Input
            type="text"
            placeholder="delete my workspace"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter>
        <motion.div
          className="w-full"
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="destructive"
            className="w-full"
            disabled={confirmText !== "delete my workspace" || isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <>
                <motion.div
                  className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Deleting...
              </>
            ) : (
              "Delete Workspace"
            )}
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
    </div>
  )
}