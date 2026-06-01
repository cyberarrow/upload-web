import { Minimize2 } from "lucide-react";
import { Button } from "../ui/button"
import * as Collapsible from "@radix-ui/react-collapsible";
import { Title } from "./title";

export function Header() {
    return(
        <div className="w-full bg-white/2 p-4 py-2 border-zinc-800 border-b flex items-center justify-between">
            <Title />
            <Collapsible.Trigger asChild>
                <Button size="icon" className="-mr-2">
                    <Minimize2 strokeWidth={1.5} className="size-4" />
                </Button>
            </Collapsible.Trigger>
        </div>
    )
}