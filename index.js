//Handles outputing text

let write = (text) => {
    const x = document.createElement("li");
    const t = document.createTextNode(text);
    x.appendChild(t);
    const textField = document.getElementById("text-field");
    textField.appendChild(x);
    textField.scrollTop = textField.scrollHeight;
  };
  
  //-item constructor
  class item {
    constructor(name, state) {
      this.name = name;
      this.state = state;
    }
  }
  
  //Game content
let items = [
    (knife = new item("knife", 0)),
    (medicine = new item("medicine", 1)),
    (atm = new item("atm", 1)),
  ];
  medicine.description = "Big medicine";
  let inventory = {};
  
  harbor = {
    look: "Nice place",
    north: "city",
    east: "ocean",
    south: "home",
    west: "land",
    take: { knife, medicine },
    useableItems: { atm },
  };
  land = {
    look: "There are shops around",
    north: "",
    east: "harbor",
    south: "ocean",
    west: "land",
    take: {},
  };
  city = {
    look: "Huge buildings lay upon you, you have ",
  };
  
  //Handles one word commands such as use, //use what ?
  let commandHistory = [];
  
  //Main gameplay handler
  //takes command from the list and handles it
  
  let commands = (command) => {
    document.getElementById("txt1").value = "";
    write(">" + command);
    if (commandHistory.length == 0) {
      switch (command) {
        case "look":
        case "where":
        case "look around":
          write(currentLocation.look);
          write(Object.keys(currentLocation.take));
  
          break;
        case "west":
        case "w":
        case "go west":
          currentLocation = currentLocation.west;
          write(currentLocation.look);
  
          break;
        case "east":
        case "e":
        case "go east":
          currentLocation = currentLocation.east;
          write(currentLocation.look);
  
          break;
        case "south":
        case "s":
        case "go south":
          currentLocation = currentLocation.south;
          write(currentLocation.look);
  
          break;
        case "north":
        case "n":
        case "go north":
          currentLocation = currentLocation.north;
          write(currentLocation.look);
  
          break;
        case "take":
        case "pick up":
        case "pick":
          commandHistory = "take";
          write(command + " what ?");
  
          break;
        case "eat":
          let eatJokes = ["hai", " no", "find", "don't eat"];
          write(eatJokes[Math.floor(Math.random() * 4)]);
  
          break;
        case "drop":
          write("Drop what ?");
          commandHistory = "drop";
  
          break;
        case "inventory":
        case "i":
          if (Object.keys(inventory).length == 0) {
            write("You carry nothing of value");
          } else write(Object.keys(inventory));
  
          break;
        case "use":
          commandHistory = "use";
          write("use what ?");
  
          break;
        case "clear":
        case "clr":
        case "cls":
          document.getElementById("text-field").innerHTML = " ";
  
          break;
  
        default:
          if (command.split(` `).length == 2) {
            switch (command.split(` `)[0]) {
              case "take":
              case "get":
              case "pick up":
                if (currentLocation.take[command.split(` `)[1]] != undefined) {
                  take(command.split(` `)[1]);
                  write(command.split(` `)[1] + " taken");
                } else write(command.split(` `)[1] + " not getable");
  
                break;
              case "use":
                if (inventory[command.split(` `)[1]] != undefined) {
                  use(command.split(` `)[1]);
                } else if (
                  currentLocation.useableItems[command.split(` `)[1]] != undefined
                ) {
                  useStationary(command.split(` `)[1]);
                } else write("not possible");
                break;
              default:
                write("Sorry I don't understand"); //sorry she won't understand ?, it would break her ?, must keep illusion, no wake up yet
                break;
            }
          } else write("sorry she won't understand that");
  
          break;
      }
    } else {
      switch (commandHistory) {
        case "take":
        case "pickup":
        case "get":
          if (currentLocation.take[`${command}`] != undefined) {
            take(command);
            write(`You got ${command}`);
            commandHistory = "";
          } else {
            write("there is no " + command + " to take");
            commandHistory = "";
          }
          break;
        case "drop":
          if (inventory[`${command}`] != undefined) {
            drop(command);
            write(command + " dropped");
          }
        case "use":
          if (inventory[`${command}`] != undefined) {
            use(command);
          } else if (currentLocation.useableItems[`${command}`] != undefined) {
            useStationary(command);
          } else write(`sorry there is no ${command} to use`);
          commandHistory = "";
  
          break;
        default:
          write("she won't understand that");
          break;
      }
    }
  };
  
  let currentLocation = harbor;