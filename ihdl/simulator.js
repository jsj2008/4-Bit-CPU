//
// So, instruction set is ok for now. It should be kinda easy to simulate it now..?
//
// Input as four bit per line
//


//
// To simulate, we need to put given input to memory,
// so like programming the memory.
//
function program(){
   // Get the binary from text field 
   var bin = document.getElementById("binary_input").value;

   // remove whitespace
   bin = bin.replace( /\s+/g, "");

   var instructions = [];

   // from bin to int's, that are easier to handle
   for ( var i = 0; i< bin.length ; i=i+4){
      instructions.push(parseInt(bin.slice(i,i+4),2));
   }

   // So, nop is 1 "wide" command, others are 3
   for ( var i = 0 ; i< instructions.length ; i++){
      if( instructions[i] == 0){
         // nop  
         memory.push([ 0,0,0,0 ]);
      }   
      else {
         memory.push( _to_bin(instructions[i]  ));
         memory.push( _to_bin(instructions[i+1]));
         memory.push( _to_bin(instructions[i+2]));
         i = i +2 ; // Parameters
      }
   }

   //
   // form memory-table at the bottom of page,
   // just debugging.
   //
   var table = document.createElement('table');
   for (var i = 0; i < memory.length; i++){
      var row = document.createElement('tr');
      for (var j = 0; j < memory[i].length; j++) {
         var cell = document.createElement('td');
         cell.textContent = memory[i][j];
         row.appendChild(cell);
      }
      table.appendChild(row);
    }
    document.body.appendChild(table);

}

//function simulate_one_tick(){
//   
//}

//function bin_to_command(i){
//   var instruction_set = [ "nop","jmp","get","put",   
//                           "ldr","crr","and","or ",
//                           "not","xor","lsh","rsh",
//                           "add","neg","beq","bne" ];
//   return instruction_set[i];
//   
// }
