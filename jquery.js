var playing = false;
var score;
var trialsLeft;
var fruits = ["apple", "mango","pear","peach","banana","cherries","grapes","orange","watermelon"];
var step;
var action;
$(function() {
    // click on start reset button
    $("#startReset").click(function() {
        // we are playing
        if(playing == true) {
            //reload Page
            location.reload();
        } else {
            // we are not playing 
            playing = true; // game initiated
            // set score to 0
            score = 0;
            $("#scoreValue").html(score);

            // show trials left
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();
            // hide game over box
            $("#gameOver").hide();
            //change button text to reset game
            $("#startReset").html("Reset Game");

            //start sending fruits
            startAction();
        }
    });


    // if we are playing ?
        // yes
            // reload page
        // no
            // show trials left
            //  change button text to "reset game"
            // 1. create random fruit
            // define random step
            // 2. move fruit down one step every 30sec
                // if fruit too low?
                    // no -> repeat no 2
                    // yes -> any trials left?
                        // yes : repeat no.1
                        // no : game over msg , button text:
    $("#fruit1").mouseover(function() {
        score++;
        $("#scoreValue").html(score); // update score
        $("#sliceSound")[0].play();

        //stop fruit 
        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode",500); // slice fruit

        //send new fruit
        setTimeout(startAction,500);
    });
    // slice a fruit
        // play sound
        // explode fruit

    // functions
    function addHearts() {
        $("#trialsLeft").empty();
        for(i = 0; i < trialsLeft; i++) {
            $("#trialsLeft").append("<img class='life' src='images/heart.png'>");
        }
    }

    function startAction() {
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({'left' : Math.round(Math.random()* 550), 'top': -50});

        //generate random step;
        step = Math.round(Math.random()*5) + 1;

        //move fruit down every 10ms by a step
        action = setInterval(function(){
            $("#fruit1").css('top', $('#fruit1').position().top + step);

            // check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()) {
                // check if any trials left
                if(trialsLeft > 1) {
                    //generate a fruit
                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({'left' : Math.round(Math.random()* 550), 'top': -50});

                    //generate random step;
                    step = Math.round(Math.random()*5) + 1;
            
                    //reduce trials by one
                    trialsLeft--;
                    // populate trials left box
                addHearts();
            
                } else { //gameover
                    playing = false; //we are not playing anymore
                    $("#startReset").html("Start Game");

                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p> Your score is '+score+'</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        },10);
    }

    //get random fruit
    function chooseFruit() {
        $("#fruit1").attr('src' , 'images/'+fruits[(Math.round(8*Math.random()))] +'.png');
    }

    function stopAction() {
        clearInterval(action);
        $("#fruits1").hide();
    }
});