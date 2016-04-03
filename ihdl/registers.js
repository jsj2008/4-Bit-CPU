
// Program counter  (This could be better here)
// We need program counter and handler for that 
var global_program_counter = [false,false,false,false, false,false,false,false];
function increment_program_counter(){
   global_program_counter =  eight_bit_full_adder(global_program_counter,[false,false,false,false, false,false,false,true]);   
}


var global_register_r0 = [false , false, false, false ];
var global_register_r1 = [false , false, false, false ];
var global_register_r2 = [false , false, false, false ];
var global_register_r3 = [false , false, false, false ];
var global_register_r4 = [false , false, false, false ];

// goddamit I make so many errors.. Better have this
// 8-bits is used by hex_X.concat(hex_X)
var hex_0 = [false,false  ,false,false];
var hex_1 = [false,false  ,false,true ];
var hex_2 = [false,false  ,true ,false];
var hex_3 = [false,false  ,true ,true ];
                          
var hex_4 = [false,true   ,false,false];
var hex_5 = [false,true   ,false,true ];
var hex_6 = [false,true   ,true ,false];
var hex_7 = [false,true   ,true ,true ];
                          
var hex_8 = [true ,false  ,false,false];
var hex_9 = [true ,false  ,false,true ];
var hex_A = [true ,false  ,true ,false];
var hex_B = [true ,false  ,true ,true ];
                          
var hex_C = [true ,true   ,false,false];
var hex_D = [true ,true   ,false,true];
var hex_E = [true ,true   ,true ,false];
var hex_F = [true ,true   ,true ,true ];

