class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question();
      question.display();
    }
  }

  play(){
    //escribe aquí el código para ocultar los elementos de la pregunta
    question.hide();

    //escribe aquí el código para cambiar el color de fondo 
    background("yellow");

    //escribe el código para mostrar un encabezado que indique el resultado del Cuestionario
    textSize(20);
    fill("blue");
    text("resultados: ",350,20);
    //llama aquí a getContestantInfo( )
    Contestant.getPlayerInfo();


    //escribe la condición para comprobar si contestantInfor no está indefinido 

    if(allContestants !== undefined){
      var displayY_Answers = 230;
      //escribe aquí el código para agregar una nota
      text("nota: el concursante que respondio correctamente esta en verde",140,230);
    

      //escribe el código para resaltar al concursante que respondió correctamente
      for(var i in allContestants){
        var RC = "2";
        if(RC === allContestants[i].answer){
          fill("green");
        }
        else{
          fill("red");
        }

        displayY_Answers+=30;
        textSize(20);
        text(allContestants[i].name + ": " + allContestants[i].answer, 250,displayY_Answers);

      }
    }
    
  }

}
