import { LaptopHeader } from "./LaptopHeader";
import { LaptopContent } from "./LaptopContent";

export function LaptopScreen() {
    return (
            <div className="w-full h-full flex flex-col bg-muted/20 rounded-t-4xl inset-shadow-pseudo">
                <LaptopHeader />
                <LaptopContent />
        </div>
    )
}