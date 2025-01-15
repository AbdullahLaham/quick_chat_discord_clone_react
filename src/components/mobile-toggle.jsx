import { Menu } from 'lucide-react'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "./ui/sheet"
import { Button } from './ui/button'
import NavigationSidebar from './navigation/NavigationSidebar'
import ServerSidebar from './server/ServerSidebar'
// 
// interface MobileToggleProps {
//     servers: Server[],
//     profile: Profile,
//     server: safeServer | null,
// }

const MobileToggle = ({servers, profile, server}) => {
  return (
    <Sheet>
        <SheetTrigger>
            <Button variant={'ghost'} size='icon' className='md:hidden'>
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side='left' className='p-0 flex gap-0'>
            <div>
                <NavigationSidebar servers={servers} profile={profile}  />
            </div>
            <ServerSidebar profile={profile} server={server} serverId={server?.id}  />
        </SheetContent>
    </Sheet>
  )
}

export default MobileToggle