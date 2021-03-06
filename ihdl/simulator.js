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
   
   init_memory();
   
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

   fill_rest_of_memory();
   update_values();

}

function simulate_one_tick(){
      
   // What command is next in line? get_memory(*pc)
   var command = get_memory(_to_dec(get_memory(0))*16 + _to_dec(get_memory(1)));

   increment_program_counter();
   console.log("Command: " + bin_to_command(_to_dec(command)));   


   // Is not nop?
   if( _to_dec(command) != 0){
      var param1 = get_memory(_to_dec(get_memory(0))*16 + _to_dec(get_memory(1)));
      increment_program_counter();   
      var param2 = get_memory(_to_dec(get_memory(0))*16 + _to_dec(get_memory(1)));
      increment_program_counter();

      console.log("Param 1: " + param1);   
      console.log("Param 2: " + param2);

      // What command to execute?
      command = _to_dec( command);      
      if      ( command ==  1) { is_jmp( param1, param2); }
      else if ( command ==  2) { is_get( param1, param2); }
      else if ( command ==  3) { is_put( param1, param2); }
      else if ( command ==  4) { is_ldr( param1, param2); }
      else if ( command ==  5) { is_crr( param1, param2); }
      else if ( command ==  6) { is_and( param1, param2); }
      else if ( command ==  7) { is_lor( param1, param2); }
      else if ( command ==  8) { is_not( param1, param2); }
      else if ( command ==  9) { is_xor( param1, param2); }
      else if ( command == 10) { is_lsh( param1, param2); }
      else if ( command == 11) { is_rsh( param1, param2); }
      else if ( command == 12) { is_add( param1, param2); }
      else if ( command == 13) { is_neg( param1, param2); }
      else if ( command == 14) { is_beq( param1, param2); }
      else if ( command == 15) { is_bne( param1, param2); }
   }

   update_values();
}

function simulate_many_ticks(){
   // How many tics?   
   var amount = parseInt(document.getElementById("simulated_tics").value);
   
   for ( var i = 0 ; i<amount ; i++){
      // Copypaste the simulate one tick without updating values
      var command = get_memory(_to_dec(get_memory(0))*16 + _to_dec(get_memory(1)));
      increment_program_counter();
      if( _to_dec(command) != 0){
         var param1 = get_memory(_to_dec(get_memory(0))*16 + _to_dec(get_memory(1)));
         increment_program_counter();   
         var param2 = get_memory(_to_dec(get_memory(0))*16 + _to_dec(get_memory(1)));
         increment_program_counter();
         command = _to_dec( command);      
         if      ( command ==  1) { is_jmp( param1, param2); }
         else if ( command ==  2) { is_get( param1, param2); }
         else if ( command ==  3) { is_put( param1, param2); }
         else if ( command ==  4) { is_ldr( param1, param2); }
         else if ( command ==  5) { is_crr( param1, param2); }
         else if ( command ==  6) { is_and( param1, param2); }
         else if ( command ==  7) { is_lor( param1, param2); }
         else if ( command ==  8) { is_not( param1, param2); }
         else if ( command ==  9) { is_xor( param1, param2); }
         else if ( command == 10) { is_lsh( param1, param2); }
         else if ( command == 11) { is_rsh( param1, param2); }
         else if ( command == 12) { is_add( param1, param2); }
         else if ( command == 13) { is_neg( param1, param2); }
         else if ( command == 14) { is_beq( param1, param2); }
         else if ( command == 15) { is_bne( param1, param2); }
      }

   }
   update_values();   
}


function update_values(){

   document.getElementById("value_pch").innerHTML = get_memory(0);
   document.getElementById("value_pcl").innerHTML = get_memory(1);
   document.getElementById("value_flags").innerHTML = get_memory(2);

   document.getElementById("value_ddr0").innerHTML = get_memory(3);
   document.getElementById("value_ddr4").innerHTML = get_memory(4);
   document.getElementById("value_ddr8").innerHTML = get_memory(5);
   document.getElementById("value_io0").innerHTML = get_memory(6);
   document.getElementById("value_io4").innerHTML = get_memory(7);
   document.getElementById("value_io8").innerHTML = get_memory(8);
   
   document.getElementById("value_r0").innerHTML = get_memory(9);
   document.getElementById("value_r1").innerHTML = get_memory(10);
   document.getElementById("value_r2").innerHTML = get_memory(11);
   document.getElementById("value_r3").innerHTML = get_memory(12);
   document.getElementById("value_r4").innerHTML = get_memory(13);

   document.getElementById("value_inth").innerHTML = get_memory(14);
   document.getElementById("value_intl").innerHTML = get_memory(15);

   document.getElementById("info_pc").innerHTML = _to_dec(get_memory(0))*16 + _to_dec(get_memory(1));
   document.getElementById("memory_used").innerHTML = memory_used;
   document.getElementById("info_memory_max").innerHTML = memory.length;

   
   document.getElementById("testi").innerHTML = "<b>Program</b><br>";

   var tmp ="";
   for( var i = 16 ; i<memory_used ; i++){
      tmp += i + ":&nbsp;&nbsp;&nbsp;" + memory[i];
      if( (memory_address(get_memory(0) , get_memory(1)) ) == i)
         tmp += "&nbsp;&nbsp;&nbsp;<--- PC&nbsp;&nbsp;&nbsp;&nbsp;";
      tmp += "<br>";
   }
   document.getElementById("testi").innerHTML = tmp;
}


function bin_to_command(i){
   var instruction_set = [ "nop","jmp","get","put",   
                           "ldr","crr","and","lor",
                           "not","xor","lsh","rsh",
                           "add","neg","beq","bne" ];
   return instruction_set[i];
   
}

function fill_rest_of_memory(){
   // Memory max = 256
   memory_used = memory.length;
   for( var i = memory.length ; i < 256 ; i++ ) {
      memory.push( [0,0,0,0]) ;
   }   
   
   
}
