
// Program counter  (This could be better here)
// We need program counter and handler for that 
var global_program_counter = [false,false,false,false, false,false,false,false];

//function increment_program_counter(){
//   global_program_counter =  eight_bit_full_adder(global_program_counter,[false,false,false,false, false,false,false,true]);   
//} ( let's keep this commented, so I don't have to read "pro git" )
// We really cant have 8 bit operations.
// there should be add and add with carry.
// There's no space left in instruction set, 
// so maby if we assing one flag to be as
// "ADC/ADD flag.." Add-flag could be project name.
function increment_program_counter(){
   //add_without_carry(program_co... oh yea...
   // PC is 8 bit....  7  6  5  4  3  2  1  0
   // Indexes goes     0  1  2  3  4  5  6  7
   // So add without carry 4-7 and with 0-3
   // add_without_carry = four_bit_full_adder
   //four_bit_full_adder( program_counter[4] , program_counter[5],
   //                     program_counter[6] , program_counter[7]);
   //four_bit_full_adder_with_carry( program_counter[0] , program_counter[1],
   //                                program_counter[2] , program_counter[3]);
   // Oh yea, I need to store them somewhere.. I really can't do 

   //testi = [swap( testi[0], testi[1] )[0],
   //         swap( testi[0], testi[1] )[1], 
   //         testi[2]      , testi[3]      ]
   // Ok, this goes ugly, could someone suggest right way to do this?
   //global_program_counter = [
   //    four_bit_full_adder( [0,0,0,1], [global_program_counter[4] , global_program_counter[5], global_program_counter[6] , global_program_counter[7] ] )[3],
   //    four_bit_full_adder_with_carry( [0,0,0,1], [global_program_counter[4] , global_program_counter[5], global_program_counter[6] , global_program_counter[7] ] )[2],
   //    four_bit_full_adder_with_carry( [0,0,0,1], [global_program_counter[4] , global_program_counter[5], global_program_counter[6] , global_program_counter[7] ] )[1],
   //    four_bit_full_adder_with_carry( [0,0,0,1], [global_program_counter[4] , global_program_counter[5], global_program_counter[6] , global_program_counter[7] ] )[0],
   //    
   //    four_bit_full_adder_with_carry( [0,0,0,0], [ global_program_counter[0] , global_program_counter[1], global_program_counter[2] , global_program_counter[3]])[3],
   //    four_bit_full_adder_with_carry( [0,0,0,0], [ global_program_counter[0] , global_program_counter[1], global_program_counter[2] , global_program_counter[3]])[2],
   //    four_bit_full_adder_with_carry( [0,0,0,0], [ global_program_counter[0] , global_program_counter[1], global_program_counter[2] , global_program_counter[3]])[1],
   //    four_bit_full_adder_with_carry( [0,0,0,0], [ global_program_counter[0] , global_program_counter[1], global_program_counter[2] , global_program_counter[3]])[0]
   //].reverse();
   // That was stupid. This can't be done like in hardware.
   var tmp_low = four_bit_full_adder( [0,0,0,1] , [
       global_program_counter[4],global_program_counter[5],global_program_counter[6],global_program_counter[7]
       ]);
   var tmp_high = four_bit_full_adder_with_carry( [0,0,0,0] , [
       global_program_counter[0],global_program_counter[1],global_program_counter[2],global_program_counter[3]
       ]);   
   global_program_counter = [
      tmp_high[0],
      tmp_high[1],
      tmp_high[2],
      tmp_high[3],
      tmp_low[0],
      tmp_low[1],
      tmp_low[2],
      tmp_low[3]
   ];
   
}


// Flags, carry, add_with_carry CA
var global_flag_carry = false;
var global_flag_add_with_carry = false;

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

