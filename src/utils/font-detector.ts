export class Detector {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    baseFonts: string[] = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    testString: string = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    testSize: any = '72px';

    h: any = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    s: HTMLSpanElement = document.createElement("span");
    defaultWidth: any = {};
    defaultHeight: any = {};

    constructor() {
        this.s.style.fontSize = this.testSize;
        this.s.innerHTML = this.testString;

        for (var index in this.baseFonts) {
            //get the default width for the three base fonts
            this.s.style.fontFamily = this.baseFonts[index];
            this.h.appendChild(this.s);
            this.defaultWidth[this.baseFonts[index]] = this.s.offsetWidth; //width for the default font
            this.defaultHeight[this.baseFonts[index]] = this.s.offsetHeight; //height for the defualt font
            this.h.removeChild(this.s);
        }
    }

    detect(font) {
        var detected = false;
        for (var index in this.baseFonts) {
            this.s.style.fontFamily = font + ',' + this.baseFonts[index]; // name of the font along with the base font for fallback.
            this.h.appendChild(this.s);
            var matched = (this.s.offsetWidth != this.defaultWidth[this.baseFonts[index]] || this.s.offsetHeight != this.defaultHeight[this.baseFonts[index]]);
            this.h.removeChild(this.s);
            detected = detected || matched;
        }
        return detected;
    }

}