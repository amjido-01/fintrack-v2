"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  workspaceId: string
  userId: string
  workspaceName: string
}

export function MainNav({
  className,
  workspaceId,
  userId, 
  workspaceName,
  ...props
}: MainNavProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={`/user/${userId}/workspace/${workspaceName}/${workspaceId}/dashboard`}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive(`/user/${userId}/workspace/${workspaceName}/${workspaceId}/dashboard`)
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Dashboard
      </Link>
    
      <Link
        href={`/setting/${workspaceId}`}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive(`/setting/${workspaceId}`)
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Settings
      </Link>
      <Link
        href={`/user/${userId}/workspaces`} //(`/user/${userId}/workspaces`)
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive(`/user/${userId}/workspaces`)
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Workspaces
      </Link>
    </nav>
  )
}