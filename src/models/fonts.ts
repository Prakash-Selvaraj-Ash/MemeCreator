import { Detector } from '../utils/font-detector';

export class FontList {
    private detector: Detector;
    private fontsList: any = {
        'Andale Mono': '"Andale Mono", AndaleMono, monospace',
        'Arial': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
        'Arial Black': '"Arial Black", "Arial Bold", Gadget, sans-serif',
        'Arial Narrow': '"Arial Narrow", Arial, sans-serif',
        'Arial Rounded MT Bold': '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif',
        'Avant Garde': '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif',
        'Baskerville': 'Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif',
        'Big Caslon': '"Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif',
        'Bodoni MT': '"Bodoni MT", Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif',
        'Book Antiqua': '"Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif',
        'Brush Script MT': '"Brush Script MT", cursive',
        'Calibri': 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif',
        'Calisto MT': '"Calisto MT", "Bookman Old Style", Bookman, "Goudy Old Style", Garamond, "Hoefler Text", "Bitstream Charter", Georgia, serif',
        'Cambrio': 'Cambria, Georgia, serif',
        'Candara': 'Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif',
        'Century Gothic': '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        'Consolas': 'Consolas, monaco, monospace',
        'Copperplate': 'Copperplate, "Copperplate Gothic Light", fantasy',
        'Courier New': '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
        'Didot': 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif',
        'Franklin Gothic Medium': '"Franklin Gothic Medium", "Franklin Gothic", "ITC Franklin Gothic", Arial, sans-serif',
        'Futura': 'Futura, "Trebuchet MS", Arial, sans-serif',
        'Garamond': 'Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif',
        'Geneva': 'Geneva, Tahoma, Verdana, sans-serif',
        'Georgia': 'Georgia, Times, "Times New Roman", serif',
        'Gill Sans': '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
        'Goudy Old Style': '"Goudy Old Style", Garamond, "Big Caslon", "Times New Roman", serif',
        'Helvetica': '"Helvetica Neue", Helvetica, Arial, sans-serif',
        'Hoefler Text': '"Hoefler Text", "Baskerville old face", Garamond, "Times New Roman", serif',
        'Impact': 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans serif',
        'Lucida Bright': '"Lucida Bright", Georgia, serif',
        'Lucida Console': '"Lucida Console", "Lucida Sans Typewriter", Monaco, "Bitstream Vera Sans Mono", monospace',
        'Lucida Sans Typewriter': '"Lucida Sans Typewriter", "Lucida Console", Monaco, "Bitstream Vera Sans Mono", monospace',
        'Lucida Grande': '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif',
        'Monaco': 'Monaco, Consolas, "Lucida Console", monospace',
        'Optima': 'Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif',
        'Palatino': 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
        'Papyrus': 'Papyrus, fantasy',
        'Perpetua': 'Perpetua, Baskerville, "Big Caslon", "Palatino Linotype", Palatino, "URW Palladio L", "Nimbus Roman No9 L", serif',
        'Rockwell': 'Rockwell, "Courier Bold", Courier, Georgia, Times, "Times New Roman", serif',
        'Rockwell Extra Bold': '"Rockwell Extra Bold", "Rockwell Bold", monospace',
        'Segoe UI': '"Segoe UI", Frutiger, "Frutiger Linotype',
        'Tahoma': 'Tahoma, Verdana, Segoe, sans-serif',
        'Times New Roman': 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif',
        'Trebuchet MS': '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif',
        'Verdana': 'Verdana, Geneva, sans-serif'
    };

    FontLists: string[] = [];
    FontSizes: string[] = [];    

    constructor() {
        for (var font in this.fontsList) {
            var fontStrings = this.fontsList[font];
            var fontStringList = fontStrings.split(',');
            
            for (var fontString in fontStringList) {
                this.detector = new Detector();
                var inputFont = fontStringList[fontString].trim().replace(/['"]+/g, '');
                var alreadyExists = this.FontLists.indexOf(inputFont);
                
                if(alreadyExists < 0){
                    var isDetected = this.detector.detect(inputFont);
                    if(isDetected){
                        this.FontLists.push(inputFont);
                    }
                }

            }

        }

        var incrementBy = 1;
        for(var size = 20; size <= 250; size = size + incrementBy){
            if(size >= 30){
                incrementBy = 5;
            }
            if(size >= 100){
                incrementBy = 10;
            }
            this.FontSizes.push(size+"px");
        }
    }
}
