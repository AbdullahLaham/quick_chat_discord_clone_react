
import React, { use } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "./ui/popover"
  import {Picker} from 'emoji-mart';
import { Smile } from 'lucide-react'

// interface EmojiPickerProps {
//     onChange: (value: string) => void,
// }

const EmojiPicker = ({ onChange }) => {
    // const {resolvedTheme} = useTheme();
  return (
    <Popover>
        <PopoverTrigger>
            <Smile className='text-neutral-500 hover:text-neutral-600 dark:text-neutral-300 transition' />
        </PopoverTrigger>
        <PopoverContent side='right' sideOffset={40} className='bg-transparent border-none shadow-none drop-shadow-none mb-16 ' >
            {/* <Picker theme={resolvedTheme} data={data} onEmojiSelect={(emoji: any) => onChange(emoji.native)} /> */}
        </PopoverContent>
    </Popover>

  )
}

export default EmojiPicker
