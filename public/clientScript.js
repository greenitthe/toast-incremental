/*global $*/
/*global io*/

$(document).ready(function() {
  var socket = io.connect();
  console.log("Javascript Ready")
  function update() {
    socket.emit('userReqUpdate', {
      playerID: "Wilson Grumpstache"
    });
    
    gameLoop();
    requestAnimationFrame(update)
  }
  //Selector for when you click a navbar element
  $("#navbar").on("click", "li", function(e) {
    //Create a target variable for less querying
    $target = $(e.target)
    e.preventDefault();
    //If you are already on the right page, then don't bother
    if ($target.hasClass("active")) {
      return;
    } else {
      //If you aren't, set this as the active page, change screen
      $("#navbar li").removeClass("active")
      $target.toggleClass("active")
      //changeScreen(e.target.id);
    }
  });
  function lowerFirst(stringbean) {
    return stringbean.charAt(0).toLowerCase() + stringbean.slice(1)
  }
  /**
  //Function for changing the active screen
  function changeScreen(newScreen) {
    $(".status.active").toggleClass("active hidden")
    $(".area.active").toggleClass("active hidden")
    $("#" + lowerFirst(newScreen.substr(3)) + "Status").toggleClass("active hidden")
    $("#" + lowerFirst(newScreen.substr(3))).toggleClass("active hidden")
  }
  //function for buttons
  $(".area").on("click","button",function(e){
    e.preventDefault();
    var clickedButton = lowerFirst(e.target.id.substring(0,e.target.id.length - 6))
    socket.emit('incrementClicked', {
      player: "Wilson Grumpstache",
      name: clickedButton
    })
  })
  $("#deleteSave").on("click","button",function(e){
    e.preventDefault();
    var clickedButton = lowerFirst(e.target.id.substring(0,e.target.id.length - 6))
    socket.emit('incrementClicked', {
      player: "Wilson Grumpstache",
      name: clickedButton
    })
  })
  /**
  /**
  $(".status #trumps h4").change(function(e) {
    if e.target.text
  })
  **/
  socket.on('updatePlayer', function(data) {
    /**
    //console.log(data)
    $(".status #trumps h3").text(data.trumps + "/" + data.hatchery)
    $("#hatcheryMoneyButton").text("Raise Campaign Funds! (+$" + data.trumps + ")")
    $(".status #dollaBills h3").text(data.money)
    //ADD things if am allowed
    if ($("#amMineButtonHolder").hasClass("hidden") && (data.mine == true)) {
      $("#amMinePurchasePrice").addClass("hidden")
      $("#amMineButtonHolder").removeClass("hidden")
    }
    if ($("#tacoFarmButtonHolder").hasClass("hidden") && (data.immigrants >= 10) && (data.ore >= 100)) {
      $("#tacoFarmButtonHolder").removeClass("hidden")
    }
    //REMOVE things if save reset
    if (!$("#amMineButtonHolder").hasClass("hidden")) {
      if (data.mine === false) {
        $("#amMineButtonHolder").addClass("hidden")
        $("#amMinePurchasePrice").removeClass("hidden")
      }
    }
    if (!$("#tacoFarmButtonHolder").hasClass("hidden")) {
      if ((data.immigrants < 10) || (data.ore < 100)) {
        $("#tacoFarmButtonHolder").addClass("hidden")
      }
    }
    $(".status #ore h3").text(data.ore)
    $("#mineOreButton").text("Mine an Ore! (" + data.oreDeposits + " Left)")
    $("#hireImmigrantsButton").text("Hire illegal immigrants! ($10000) (+$" + data.immigrants * 100 + "/s)")
    $(".status #tacos h3").text(data.tacos)
    **/
  })

  /** Game **/
  /*********************************
   ** Global Variable Definitions **
   *********************************/
  //DOM elements
  var canvas = $('#gameCanvas')[0];
  var ctx = canvas.getContext("2d");
  
  
  //Example of animating a sprite
  var state = 0;
  var delay = 0;
  
  function gameLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    delay >= 10 ? (delay = 0,
                    animateFrame()): ++delay;
    
    drawPlayerTile(0,0,state);
  }
  
  function animateFrame() {
    console.log("animating")
    state = state >= 7 ? 0 : ++state;
  }
  
  function drawPlayerTile(x,y,tileNum) {
    //Currently involves a wrapper, for any tile past 10, it assumes a new line down in the y axis
    var tileWidth = 64;
    var tileHeight = tileWidth;
    
    var playerSprites = new Image();
    playerSprites.src = "images/playerCharacter.png"
    
    console.log(tileNum)
    drawTile(playerSprites, (tileNum % 10) * tileWidth, Math.floor(tileNum/10) * tileHeight, x, y, tileWidth, tileHeight);
  }
  function drawTile(spriteSrc,tileX,tileY,x,y,tileWidth,tileHeight) {
    ctx.drawImage(spriteSrc, tileX, tileY, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
  }
  
  update();
});