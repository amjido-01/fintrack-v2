"use client"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface NavDrawerProps {
  workspaceId: string
  userId: string
  workspaceName: string
}

const NavDrawer: React.FC<NavDrawerProps> = ({ workspaceId, userId, workspaceName }) => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Menu className="cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4 pb-0">
            <div className="mt-3 h-[120px] flex items-center justify-center">
              <ul className="space-y-4 text-center">
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
                  <Link
                    href={`/user/${userId}/workspaces`}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive(`/user/${userId}/workspaces`)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    Workspaces
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default NavDrawer
