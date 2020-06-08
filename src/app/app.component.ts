import { Component  } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CALENDAR APP';
  daysInMonth: number;
  monthAndYear:string; 
  currentMonth: string;
  currentYear: string;
  currentDay:string;
  firstday:string;
  dayCounter =0;
  monthCounter = 0; 
  yearCounter = 0;
  year:string;
  month: string;
  day :string;
  date="";
months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
dayOfTheWeek = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
showCalendar(year:string, currentmonth:string,currentDay:string){
  

  var firstday = moment([year,String(Number(currentmonth)-1)]).startOf("month").format("d");
  this.daysInMonth = moment([year,String(Number(currentmonth)-1)]).daysInMonth();
  
  this.monthAndYear = this.months[Number(currentmonth)-1] + " , " +year;

  var date = 1;
  var counter =0;
  
  var Ul = document.getElementById("days");
  var li = Ul.getElementsByTagName("li");
  
  for(var i=0; i<this.dayOfTheWeek.length; i++){
    if(this.dayOfTheWeek[Number(firstday)] === this.dayOfTheWeek[i]){
      for(var x=counter; x<li.length; x++){
        if(date <= this.daysInMonth){
          
          li[x].innerHTML = date.toString();
          var cell = li[x];
          if(date==Number(currentDay)){
            li[x].style.backgroundColor="blue";
            li[x].style.color="white";
           
          }
          else{
            li[x].style.backgroundColor="#eee";
            li[x].style.color="black";
          }
            date++;
          
        }
        else{
          li[x].innerHTML = "";
            
        }
    
      }
        break;
    }   
    else{
    li[counter].innerHTML = "";
    
    counter++;
    }
  }
  

}
GetInput(inputValue:string){
  var j=0;
  var newArray = [];
  this.date = inputValue;
  newArray[j] =" ";
  for(let i=0; i<inputValue.length; i++){
    if(String(inputValue.charAt(i)) === "/"){
     j++;
     newArray[j] =" ";
    }
    else{
     newArray[j] +=inputValue.charAt(i);
    }
  }
  this.day = newArray[0];
  this.month = newArray[1];
  this.year =newArray[2];
  this.currentDay = moment(this.year  +"-" + this.month +"-"+this.day).format("D");
  this.currentMonth = moment(this.year  +"-" + this.month +"-"+this.day).format("M");
  this.currentYear=moment(this.year  +"-" + this.month +"-"+this.day).format('YYYY');
  this.showCalendar(this.currentYear,this.currentMonth,this.currentDay);
 
}


prevYear(monthcounter:number,yearcounter:number,daycounter:number){
  var current_year=   moment(this.year+" "+String(Number(this.month))+" "+this.day).add(yearcounter-1,"year").format("Y");
  var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter-1,"days").format("D");
  var current_month = moment(this.year+" "+String(Number(this.month))+" "+this.day).add(monthcounter-1,"month").format("M");
  this.showCalendar(current_year,current_month,currentDay);
  var newValueYear = yearcounter -1;
  this.yearCounter = newValueYear;
  var newValueMonth = monthcounter -1
  this.monthCounter = newValueMonth;
  this.currentYear = current_year;
  this.currentDay = currentDay;
  this.currentMonth = current_month;
  var newValueDay = daycounter -1
  this.dayCounter = newValueDay;

}

prevMonth(currentyear:string,monthcounter:number,daycounter:number){
  var current_month=   moment(this.year+" "+String(Number(this.month))+" "+this.day).add(monthcounter-1,"month").format("M");
  var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter-1,"days").format("D");
  this.showCalendar(currentyear,current_month,currentDay);
  var newValueMonth = monthcounter-1;
  this.monthCounter = newValueMonth;
  this.currentDay = currentDay;
  this.currentMonth = current_month;
  var newValueDay = daycounter -1
  this.dayCounter = newValueDay;

  
  }
  prevDay(daycounter:number,currentyear:string,monthcounter:number,currentday:string,yearcounter:number,currentmonth:string){
    var ul = document.getElementById("days");
    var li = ul.getElementsByTagName("li");
    var currentCellvalue = li[moment([currentyear,String((Number(currentmonth)-1))]).startOf("month").format("d")].childNodes[0].nodeValue;
    
    if(currentCellvalue === currentday){
      if(this.months[Number(currentmonth)-1] === "JAN"){
        this.prevYear(monthcounter,yearcounter,daycounter);
      }
      else{
        this.prevMonth(currentyear,monthcounter,daycounter);
      }
      }
     
    else{
      var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter-1,"days").format("D");
      this.showCalendar(currentyear,String(currentmonth),currentDay);
      var newValueDay = daycounter -1
      this.dayCounter = newValueDay;
      this.currentDay = currentDay;
  }
}
nextYear(monthcounter:number,yearcounter:number,daycounter:number){
  var current_year=   moment(this.year+" "+String(Number(this.month))+" "+this.day).add(yearcounter+1,"year").format("Y");
  var current_month = moment(this.year+" "+String(Number(this.month))+" "+this.day).add(monthcounter+1,"month").format("M");
  var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter+1,"days").format("D");
  this.showCalendar(current_year,current_month,currentDay);
  var newValueYear = yearcounter +1;
  this.yearCounter = newValueYear;
  var newValueMonth = monthcounter +1;
  this.monthCounter = newValueMonth;
  this.currentYear = current_year;
  this.currentDay = currentDay;
  this.currentMonth = current_month;
  var newValueDay = daycounter +1
  this.dayCounter = newValueDay;

}
nextMonth(currentyear:string,monthcounter:number,daycounter:number){
  
  var current_month=   moment(this.year+" "+String(Number(this.month))+" "+this.day).add(monthcounter+1,"month").format("M");
  var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter+1,"days").format("D");
  this.showCalendar(currentyear,current_month,currentDay);
  var newValueMonth = monthcounter+1;
  this.monthCounter = newValueMonth;
  this.currentDay = currentDay;
  this.currentMonth = current_month;
  var newValueDay = daycounter +1;
  this.dayCounter = newValueDay;
  }
  nextDay(daycounter:number,currentyear:string,monthcounter:number,currentday:string,yearcounter:number,currentmonth:string){
    var ul = document.getElementById("days");
    var li = ul.getElementsByTagName("li");
    var firstday =  moment([currentyear,String((Number(currentmonth)-1))]).startOf("month").format("d");
    var day_In_The_month = moment([currentyear,String((Number(currentmonth)-1))]).daysInMonth();
    var lastDateIndex = (Number(firstday) + day_In_The_month)-1;
    if(li[lastDateIndex].childNodes[0].nodeValue === currentday){
      if(this.months[Number(currentmonth)-1] === "DEC"){
        this.nextYear(monthcounter,yearcounter,daycounter); }
        else{
          this.nextMonth(currentyear,monthcounter,daycounter);
        }
        }
      else{
        var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter+1,"days").format("D");
       this.showCalendar(currentyear,String(currentmonth),currentDay);
       var newValueDay = daycounter +1
       this.dayCounter = newValueDay;
       this.currentDay = currentDay;
   
      }
}

prev7Year(monthcounter:number,yearcounter:number,daycounter:number){
  var current_year=   moment(this.year+" "+String(Number(this.month))+" "+this.day).add(yearcounter-1,"year").format("Y");
  var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter-7,"days").format("D");
  var current_month = moment(this.year+" "+String(Number(this.month))+" "+this.day).add(monthcounter-1,"month").format("M");
  this.showCalendar(current_year,current_month,currentDay);
  var newValueYear = yearcounter -1;
  this.yearCounter = newValueYear;
  var newValueMonth = monthcounter -1
  this.monthCounter = newValueMonth;
  this.currentYear = current_year;
  this.currentDay = currentDay;
  this.currentMonth = current_month;
  var newValueDay = daycounter-7;
  this.dayCounter = newValueDay;
}


prev7Month(currentyear:string,monthcounter:number,daycounter:number){
  var current_month=   moment(this.year+" "+String(Number(this.month))+" "+this.day).add(monthcounter-1,"month").format("M");
  var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter-7,"days").format("D");
  this.showCalendar(currentyear,current_month,currentDay);
  var newValueMonth = monthcounter-1;
  this.monthCounter = newValueMonth;
  this.currentDay = currentDay;
  this.currentMonth = current_month;
  var newValueDay = daycounter-7;
  this.dayCounter = newValueDay;

  
  }


  prev7Day(daycounter:number,currentyear:string,monthcounter:number,currentday:string,yearcounter:number,currentmonth:string){
    var ul = document.getElementById("days");
    var li = ul.getElementsByTagName("li");
    var currentCellvalue = li[moment([currentyear,String((Number(currentmonth)-1))]).startOf("month").format("d")].childNodes[0].nodeValue;
    
    if(currentCellvalue === currentday || Number(currentday) <= 7){
      if(this.months[Number(currentmonth)-1] === "JAN"){
        this.prev7Year(monthcounter,yearcounter,daycounter);
      }
      else{
        this.prev7Month(currentyear,monthcounter,daycounter);
      }
      }
     
    else{
     var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter-7,"days").format("D");
    this.showCalendar(currentyear,String(currentmonth),currentDay);
    var newValueDay = daycounter -7
    this.dayCounter = newValueDay;
    this.currentDay = currentDay;
  }
}
nextYear7(monthcounter:number,yearcounter:number,daycounter:number){
  var current_year=   moment(this.year+" "+String(Number(this.month))+" "+this.day).add(yearcounter+1,"year").format("Y");
  var current_month = moment(this.year+" "+String(Number(this.month))+" "+this.day).add(monthcounter+1,"month").format("M");
  var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter+7,"days").format("D");
  this.showCalendar(current_year,current_month,currentDay);
  var newValueYear = yearcounter +1;
  this.yearCounter = newValueYear;
  var newValueMonth = monthcounter +1;
  this.monthCounter = newValueMonth;
  this.currentYear = current_year;
  this.currentDay = currentDay;
  this.currentMonth = current_month;
  var newValueDay = daycounter+7
  this.dayCounter = newValueDay;

}

nextMonth7(currentyear:string,monthcounter:number,daycounter:number){
  
  var current_month=moment(this.year+" "+String(Number(this.month))+" "+this.day).add(monthcounter+1,"month").format("M");
  var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter+7,"days").format("D");
  this.showCalendar(currentyear,current_month,currentDay);
  var newValueMonth = monthcounter+1;
  this.monthCounter = newValueMonth;
  this.currentDay = currentDay;
  this.currentMonth = current_month;
  var newValueDay = daycounter+7
  this.dayCounter = newValueDay;
  }

next7Day(daycounter:number,currentyear:string,monthcounter:number,currentday:string,yearcounter:number,currentmonth:string){
  var ul = document.getElementById("days");
  var li = ul.getElementsByTagName("li");
  var firstday =  moment([currentyear,String((Number(currentmonth)-1))]).startOf("month").format("d");
  var day_In_The_month = moment([currentyear,String((Number(currentmonth)-1))]).daysInMonth();
  var lastDateIndex = (Number(firstday) + day_In_The_month)-1;
  if(li[lastDateIndex].childNodes[0].nodeValue === currentday || Number(currentday) >= (day_In_The_month-6)){
    if(this.months[Number(currentmonth)-1] === "DEC"){
      this.nextYear7(monthcounter,yearcounter,daycounter); 
    }
      else{
        this.nextMonth7(currentyear,monthcounter,daycounter);
      }
      }
    else{
     var currentDay =moment(this.year+" "+String(Number(this.month))+" "+this.day).add(daycounter+7,"days").format("D");
     this.showCalendar(currentyear,String(currentmonth),currentDay);
     var newValueDay = daycounter+7;
     this.dayCounter = newValueDay;
     this.currentDay = currentDay;
 
    }
}



constructor(){

}
ngOnInit(): void {
  this.year = moment().format('YYYY');
  this.month = moment().format("M");
  this.day =  moment().format("D");
  this.currentDay = moment(this.year  +"-" + this.month +"-"+this.day).format("D");
  this.currentMonth = moment(this.year  +"-" + this.month +"-"+this.day).format("M");
  this.currentYear=moment(this.year  +"-" + this.month +"-"+this.day).format('YYYY');
  this.showCalendar(this.currentYear,this.currentMonth,this.currentDay);

}
}
