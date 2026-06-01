import * as Collapsible from '@radix-ui/react-collapsible'
import { Maximize2 } from 'lucide-react'
import { Title } from './title'

export function MinimizedButton() {
    return(
        <Collapsible.Trigger className="group w-full bg-white/2 py-3 px-5 flex items-center justify-between">
            <Title />

            <Maximize2 strokeWidth={1.5} className="size-4 text-zinc-400 group-hover:text-zinc-100" />
        </Collapsible.Trigger>
    )
}