'use client'


import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from "@/components/ui/command"
import { Search } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
// interface ServerSearchProps {
//     data: {
//         label: string;
//         type: "channel" | "member",
//         data: {
//             icon: React.ReactNode,
//             name: string,
//             id: string,
//         }[] | undefined
//     }[]
// }

const ServerSearch = ({data}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e) => {
      if (e.key == "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

    }
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down)
  }, []);

  const onClick = ({id, type}) => {
    setOpen(false);
    if (type == "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);

    }
    if (type == "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  }

  const router = useRouter();
  const params = useParams();


  return (
    <>
        <button onClick={() => setOpen(true)} className='grup px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition '>
          <Search className='w-4 h-4 text-zinc-500 dark:text-zinc-400 '  />
          <p className='font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition'>
            Search
          </p>
          <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium  ml-auto '>
            <span className='text-xs'>CTRL</span>K
          </kbd>
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {data?.map((item) => (
              <CommandGroup key={item.label} heading={item.label}>
                {item?.data?.map((command) => (
                  <CommandItem onSelect={() => onClick({id: command.id, type: item?.type })} key={command.id}><p className="text-sm">{command.name}</p> {command.icon}</CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
      </CommandDialog>
    </>
  )
}

export default ServerSearch