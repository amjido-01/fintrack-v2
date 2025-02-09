"use client"

import * as React from "react"
import {
//   CaretSortIcon,
  CheckIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import WorkSpaceDialog from "./WorkSpaceDialog"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Workspace } from "@/types/types"
// import useWorkspaceStore from "@/store/useWorkspaceStore"


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface WorkspaceSwitcherProps extends PopoverTriggerProps {
  workspaces: Workspace[];
}


export default function WorkspaceSwitcher({ className, workspaces }: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = React.useState(false)

  
  const router = useRouter();
  const {workspaceId}  = useParams()

const workspace = workspaces?.filter(workspace => workspace.id == workspaceId)

const [selectedWorkspace, setSelectedWorkspace] = React.useState<Workspace>(workspace[0]);

  
  return (
    <Dialog open={showNewWorkspaceDialog} onOpenChange={setShowNewWorkspaceDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[150px] justify-start justifybetween", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedWorkspace?.workspaceName}.png`}
                alt={selectedWorkspace?.workspaceName}
                className="grayscale"
              />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>
            <p className="truncate">
            {workspaces.find((workspace) => workspace.id === selectedWorkspace?.id)?.workspaceName}
            </p>
            {/* <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" /> */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
        <Command>
            <CommandInput placeholder="Search workspace..." />
  <CommandList>
    <CommandEmpty>No workspace found.</CommandEmpty>
    {workspaces?.map((workspace) => (
      <CommandGroup key={workspace.id}>
        <CommandItem
          onSelect={() => {
            setSelectedWorkspace(workspace);
            setOpen(false);
            router.push(
              `/user/${workspace.createdById}/workspace/${workspace.workspaceName}/${workspace.id}/dashboard`
            );
          }}
        >
          <div>
            <div className="flex">
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${workspace.workspaceName}.png`}
                  alt={workspace.workspaceName}
                />
                <AvatarFallback>W</AvatarFallback>
              </Avatar>
              {workspace.workspaceName}
            </div>
            <p className="mt-1 text-[10px] pl-2 truncate">{workspace.description}</p>
          </div>
          <CheckIcon
            className={cn(
              "ml-auto h-4 w-4",
              selectedWorkspace.id === workspace.id ? "opacity-100" : "opacity-0"
            )}
          />
        </CommandItem>
      </CommandGroup>
    ))}
  </CommandList>
  <CommandSeparator />
  <CommandList>
    <CommandGroup>
      <CommandItem>
        <div>
          <WorkSpaceDialog />
        </div>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

        </PopoverContent>
      </Popover>
    </Dialog>
  )
}