// Ok, let's get rid of the globals and put everyting in "memory"
// When I figure out how to make memory out of flip flips, let's use 
// this.

var memory = [ 
                [ false, false, false, false ] ,  // 0   PC0 h
                [ false, false, false, false ] ,  // 1   PC1 l
                [ false, false, false, false ] ,  // 2   Flags, C A I Z
                [ false, false, false, false ] ,  // 3   DDR 0-3
                [ false, false, false, false ] ,  // 4   DDR 4-7
                [ false, false, false, false ] ,  // 5   DDR 8-11
                [ false, false, false, false ] ,  // 6   I/O 0-3
                [ false, false, false, false ] ,  // 7   I/O 4.7
                [ false, false, false, false ] ,  // 8   I/O 8-11
                [ false, false, false, false ] ,  // 9   r0
                [ false, false, false, false ] ,  // 10  r1
                [ false, false, false, false ] ,  // 11  r2
                [ false, false, false, false ] ,  // 12  r3
                [ false, false, false, false ] ,  // 13  r4
                [ false, false, false, false ] ,  // 14  Interrupt
                [ false, false, false, false ]    // 15  pins
            ];


function memory_address( page,addr){
   return +_to_dec(page)*16 + +_to_dec(addr);   
}



// If the memory changes, just change these
var flag_addr = 2;
var r0_addr = 9;
var r1_addr = 10;
var r2_addr = 11;
var r3_addr = 12;
var r4_addr = 13;


// "Programming" the chip
function add_to_memory( a ) {
   memory.push( [ a[0] , a[1] , a[2] , a[3] ] );   
}

// Handlers for memory
function get_memory( addr){
   return memory[addr];
}

function set_memory (addr, value){
   memory[addr][0] = value[0];   
   memory[addr][1] = value[1];   
   memory[addr][2] = value[2];   
   memory[addr][3] = value[3];   
}

// Handlers for flags
function get_flag(flag){
   if ( flag == 'c')
      return memory[flag_addr][0];
   else if (flag == 'a')
      return memory[flag_addr][1];   
   else if (flag == 'i')
      return memory[flag_addr][2];      
   else if (flag == 'z')
      return memory[flag_addr][3];   
}

function set_flag(flag,value){
   if ( flag == 'c')
      memory[flag_addr][0] = value;
   else if ( flag == 'a')
      memory[flag_addr][1] = value; 
   else if ( flag == 'i')
      memory[flag_addr][2] = value;       
   else if ( flag == 'z')
      memory[flag_addr][3] = value;         
}

