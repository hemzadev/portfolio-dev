import CardFlip from "./kokonutui/card-flip";
import CardFlipExtended from "./card-flip-extended";

export default function ManifestoSection (){
    return (
        <div className="flex justify-between">
            <CardFlip/>
            <CardFlipExtended/>
            <CardFlip/>
        </div>
        
    )
}