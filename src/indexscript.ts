
import { ElementField } from "./definitions/ManifestoField/ElementField/index";
import { RootSectionField } from "./definitions/ManifestoField/SectionField/index";
import { Reflection } from "./Reflection/Reflector";

function southParkCharacters() {
    let array = [],
        source: Array<{ name: string, imgUrl: string }> = [
            {
                name: "cartman",
                imgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/EricCartman.png/220px-EricCartman.png"
            },
            {
                name: "kyle",
                imgUrl: "https://vignette.wikia.nocookie.net/southpark/images/9/95/Kyle-broflovski.png"
            },
            {
                name: "stan",
                imgUrl: "https://vignette.wikia.nocookie.net/southpark/images/c/c6/Stan-marsh-0.png"
            },
            {
                name: "kenny",
                imgUrl: "https://upload.wikimedia.org/wikipedia/en/6/6f/KennyMcCormick.png"
            },
        ]
    let chr;
    for (let index = 0; index < source.length; index++) {
        chr = source[index];
        array.push(new ElementField({
            content: [],
            tag: "img",
            attributes: [
                {
                    key: "src",
                    value: chr.imgUrl
                },
                {
                    key: "alt",
                    value: chr.name
                },
                {
                    key: "height",
                    value: "100px"
                }
            ]
        }));

    }

    return array;
}


const reflector = new Reflection(new RootSectionField({
    content: [
        ...southParkCharacters()
    ]
}));

reflector.expandThere("div#base")