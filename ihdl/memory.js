//// Ok, for next alu-items we need memory. Now we can put the globals here too.
//// Memory is just array of registers and register is based on D-flipflop.
//
//// D flip flop, dff
//function d_ff(){
//   // D flip flop has 2 inputs, D and clock.
//   // on out there's Q and /Q. Let's use just
//   // Q for simplicity.
//   // D flip flop uses RS-flipflop
//   
//}
//
//function rs_ff(r,s){
//   // RS flip flop uses 2 NOR-ports
//   // Due to feedback, we need variables.
//   var out_Q = false;
//   var out_!Q = false;
//
//   out_Q = nor(r,out_!Q);
//   out_!Q = nor(r,out_Q);
//   
//   return out_Q;   
//}
//
// but but... How... This is going to be too much for me now...
//
// Let's use array for now, "it's external IC"
// 

var memory = [ 
                [ false, false, false, false ] ,  // 0   PC0
                [ false, false, false, false ] ,  // 1   PC1
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

var flag_addr = 2;
var r0_addr = 9;
var r1_addr = 10;
var r2_addr = 11;
var r3_addr = 12;
var r4_addr = 13;

function add_to_memory( a ) {
   memory.push( [ a[0] , a[1] , a[2] , a[3] ] );   
}

function get_memory( addr){
   return memory[addr];
}

function set_memory (addr, value){
   memory[addr][0] = value[0];   
   memory[addr][1] = value[1];   
   memory[addr][2] = value[2];   
   memory[addr][3] = value[3];   
}


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

