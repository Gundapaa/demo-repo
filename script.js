var play=false;
var point;
var action;
var time;
var timeLeft;
var correctAnswer;
var timeSlot;
timer();
document.getElementById("startReset").onclick=function() {
    //if we are playing ->
    if(play==true) { 
        //reload page ->
        location.reload(); 
    }
    //if we are not playing ->
    else { 
        play=true;
        //set score to 0 ->
        point=0;
        edit("scoreValue",point); 
        //show countdown ->
        vis("counter","block"); 
        //time counter ->
        if(time>0){ timeLeft=time; }
        else{ timeLeft=30; }
        console.log(time);
        edit("counterValue",timeLeft+" ");
        startCount();
        //change button to Reset ->
        edit("startReset","Reset Game !");
        //QandA ->
        generateQA();
        vis("over","none");
        document.getElementById("question").style.fontSize="96px";
    }
}
// Clicking on an answer box ->
for (i=1;i<5;i++) {
    document.getElementById("box"+i).onclick=function() {
        //if we are playing ->
        if(play==true) {
            if(this.innerHTML==correctAnswer) { // <-if correct answer
                console.log(correctAnswer);
                point++; //<- increase score by 1
                edit("scoreValue",point); //<- updating score 
                vis("wrong","none");
                vis("correct","block");
                setTimeout(function(){
                    vis("correct","none");
                },1000)
                generateQA();
            }else { //if wrong answer
                point--;
                edit("scoreValue",point);
                vis("wrong","block");
                vis("correct","none");
                setTimeout(function(){
                    vis("wrong","none");
                },1000)
                generateQA();
            }
        }
    }
}
//functions ->
//counter function ->
function startCount() {
    action=setInterval(function() {
        //reduce time by 1 ->
        timeLeft-=1;
        //time left ->
        edit("counterValue",timeLeft+" ");
        //game over ->
        if(timeLeft==0) {
            clearInterval(action); // <- stop timer going negative
            vis("over","block");
            edit("over","game over !<br> your score is "+point);
            vis("counter","none");
            vis("correct","none");
            vis("wrong","none");
        }
    },1000);
    vis("over","none");
}
//generate QandA function ->
function generateQA() {
    var x=randomInt(1,10);
    var y=randomInt(1,10);
    correctAnswer=x*y;
    var allAnswers=[correctAnswer];
    edit("question",x+"x"+y); // <- displaying question
    var correctPosition=randomInt(1,4); //<- randomizing box
    edit("box"+correctPosition,correctAnswer); //<- correct answer box
    //wrong answer boxes ->
    for(i=1;i<5;i++) {
        if(i!=correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer=(randomInt(1,10)*(randomInt(1,10)));
            }
            while(allAnswers.indexOf(wrongAnswer)>-1)
            edit("box"+i,wrongAnswer);
            allAnswers.push(wrongAnswer);
        }
    }console.log(x,y,correctAnswer,correctPosition);
}
//Random number function ->
function randomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
//style display function ->
function vis(id,val) {
    document.getElementById(id).style.display=val;
}
//edit content function ->
function edit(id,cont) {
    document.getElementById(id).innerHTML=cont;
}
//time slot function ->
function timer() {
    for(i=1;i<5;i++){
        timeSlot="time"+i;console.log(i,timeSlot);
        if(timeSlot=="time1") {
            document.getElementById("time1").onclick=function() {
                time=5;
                edit("counterValue",time+" ");
                vis("counter","block");
            }
        }else if(timeSlot=="time2") {
            document.getElementById("time2").onclick=function() {
                time=10;
                edit("counterValue",time+" ");
                vis("counter","block");
            }
        }else if(timeSlot=="time3") {
            document.getElementById("time3").onclick=function() {
                time=30;
                edit("counterValue",time+" ");
                vis("counter","block");
            }
        }else if(timeSlot=="time4") {
            document.getElementById("time4").onclick=function() {
                time=60;
                edit("counterValue",time+" ");
                vis("counter","block");
            }
        }
    }
}