import { Component, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import { ColorPickerDirective, ColorPickerService, Rgba } from 'angular2-color-picker';
import { MemeModel } from '../models/text.model';
import { FontList } from '../models/fonts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewChecked {

  private element: ElementRef;
  private rootElement: HTMLElement;
  private isAnyElementActivated: boolean;
  private fonts: FontList;
  Memes: MemeModel[] = [];
  IsElementAdded: boolean;
  currentModel: MemeModel;
  isDeleteEnable: boolean;
  
  availableFonts: string[];
  fontSizes: string[];

  constructor(el: ElementRef) {
    this.element = el;
    this.currentModel = new MemeModel();
    this.currentModel.Foreground = "#000";
    this.fonts = new FontList();
    this.availableFonts = this.fonts.FontLists.sort();
    this.currentModel.FontFamily = this.availableFonts[0];
    this.fontSizes = this.fonts.FontSizes;
  }

  @HostListener('document:click', ['$event'])
  
  clickout(event) {
    if(!this.isAnyElementActivated){
      this.DeactivateAllElement();
    }
    this.isAnyElementActivated = false;
  }

  onElementLoaded(elementObj: any) {

  }

  DeactivateAllElement(){
    this.Memes.forEach(text => {
      text.IsActive = false;
    });
    this.isDeleteEnable = false;
  }

  DeleteItem(){
    var activeElement = this.Memes.find(text => text.IsActive);
    this.deleteMemeItem(activeElement);
    this.isDeleteEnable = false;
  }

  SaveImage() {
    this.rootElement = $(this.element.nativeElement)
      .find("#rootDiv")
      .get(0);

    var htm2can = html2canvas(this.rootElement);
    htm2can.then(
      function (canvas) {
        var image = canvas.toDataURL("image/jpeg");
        window.open(image);
      },
      function (reason) {

      }
    )
  }

  AddText() {
    var memeModel = new MemeModel();
    memeModel.Text = "enter text !!!"
    memeModel.RefIndex = this.Memes.length + 1;
    memeModel.Foreground = "#fff";
    memeModel.FontFamily = this.availableFonts[0];
    this.Memes.push(memeModel);
  }

  AddImage() {
    var memeModel = new MemeModel();
    memeModel.ImageUrl = "../../assets/img/pikachu.jpg";
    memeModel.IsImage = true;
    memeModel.RefIndex = this.Memes.length + 1;
    this.Memes.push(memeModel);
  }

  deleteMemeItem(text: MemeModel) {
    var delIndex = this.Memes.indexOf(text);
    this.Memes.splice(delIndex, 1);
  }

  onActivated(memeModel: MemeModel) {
    this.DeactivateAllElement();
    this.isAnyElementActivated = true;
    this.isDeleteEnable = true;
    this.currentModel = memeModel;
    memeModel.IsActive = true;
  }

  onMouseEnter(memeModel: MemeModel){
    var selector = '#' + memeModel.RefIndex;
    if(!memeModel.IsImage){
      $(selector).draggable({ containment: "#rootDiv", disabled: true })
    }
  }

  onBlur(memeModel: MemeModel) {
    $('#' + memeModel.RefIndex).draggable({ containment: "#rootDiv", disabled: false })
  }

  onDeactivate(memeModel: MemeModel){
    memeModel.IsActive = false;
  }

  ngAfterViewChecked(): void {
    if (this.IsElementAdded) {
      var elementCount = this.Memes.length;
      var lastElement = this.Memes[elementCount - 1];
      var selector = '#' + elementCount;
      if (lastElement.IsImage) {
        this.onImageAdded(selector);
      }
      else {
        this.onTextAdded(selector);
      }
    }
    this.IsElementAdded = false;
  }

  onTextAdded(selector: string) {
    $(selector).draggable({
      containment: "#rootDiv"
    });
  }

  onImageAdded(selector: string) {
    var addedDrag = $(selector);
    var childElements = $(addedDrag.children()[0].children[0]);
    $(selector).find('.image-box:first').resizable({
      containment: "#rootDiv",
      alsoResize: childElements
    });

    $(selector).draggable({
      containment: "parent",
    });
  }
}
