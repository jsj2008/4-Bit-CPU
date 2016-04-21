//
// So now we have hdl. Next in line is ALU.
// Let's check what alu need's to implement;
//
// 
// nop                  No OPeration, Don't do anything, for timings etc.        
// jmp 0001 0000        JuMP, Program_Counter/next executed command = 0001 0000 
// get 0000 0101        GET value of to r0, r0 = value of 0000 0101  ( r0 =  I/O 0-3 )
// put 0000 0010        PUT value of r0 to, r0's value is copied to 0000 0010 ( DDR 0-3 )
// 
// ldr 0010 0110        LoaD to Register, r2 = 6
// crr 0110 0011        Copy Register value to another Register, r6 = r3                   
// and 0001 0010        logical AND, r0 = r1 and r2
// lor 0100 0110        Logical OR, r0 = r4 or r6
// 
// not 0101 0011        logical NOT, r5 = not r3
// xor 0010 0011        eXclusive OR, r0 = r2 xor r3
// lsh 0001 0001        Left SHift,  r1 = r1 << 1
// rsh 0110 0101        Right SHift, r6 = r6 >> 5                                                                                                           
// 
// add 0100 0010        full ADDer, r0 = r4 + r2
// neg 0001 0100        NEGate, r1 = one's complement of r4
// beq 0001 0000        Branch if EQual to zero, If zero flag =1 , jmp 0001 0000
// bne 0010 1111        Branch if Not Equal, if zero flag =0 , jmp 0010 1111
//
//



// Working
function nop(){
   increment_program_counter();
}

function jmp(addr){
   set_memory( 0 , [ addr[0], addr[1], addr[2] , addr[3] ]);   
   set_memory( 1 , [ addr[4], addr[5], addr[6] , addr[7] ]);   
}

function add(a,b){
   set_memory( r0_addr , four_bit_full_adder( a,b) );
}

// Next in line

// get 0000 0101        GET value of to r0, r0 = value of 0000 0101  ( r0 =  I/O 0-3 )
// put 0000 0010        PUT value of r0 to, r0's value is copied to 0000 0010 ( DDR 0-3 )

