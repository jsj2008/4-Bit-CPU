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

//
// Naming of the functions, they should differ with prefix (no objects in any hdl)
// so "is_nop" as in "nop of the instruction set"? When better one comes to  
// mind, it's easy to replace.
//

// Working
function is_nop(){
   increment_program_counter();
}

function is_jmp(addr){
   set_memory( 0 , [ addr[0], addr[1], addr[2] , addr[3] ]);   
   set_memory( 1 , [ addr[4], addr[5], addr[6] , addr[7] ]);   
}

function is_put(addr1,addr2){
   //set_memory( _to_dec(get_memory( memory_address(addr1,addr2))) , get_memory(r0_addr));
   set_memory(memory_address(addr1,addr2) , get_memory(r0_addr))
}

function is_get(addr1,addr2){
   //set_memory( memory_address(r0_addr)  , get_memory( memory_address(addr1,addr2)) );
   set_memory( r0_addr  , get_memory( memory_address(addr1,addr2)) );
}

function is_add(a,b){
   set_memory( r0_addr , four_bit_full_adder( a,b) );
}

// Next in line

// ldr 0010 0110        LoaD to Register, r2 = 6
function is_ldr(){}


// for future

// crr 0110 0011        Copy Register value to another Register, r6 = r3                   
function is_crr(){}
// and 0001 0010        logical AND, r0 = r1 and r2
function is_and(){}
// lor 0100 0110        Logical OR, r0 = r4 or r6
function is_lor(){}
function is_(){}


// not 0101 0011        logical NOT, r5 = not r3
function is_not(){}
// xor 0010 0011        eXclusive OR, r0 = r2 xor r3
function is_xor(){}
// lsh 0001 0001        Left SHift,  r1 = r1 << 1
function is_lsh(){}
// rsh 0110 0101        Right SHift, r6 = r6 >> 5                                                                                                           
function is_rsh(){}

// neg 0001 0100        NEGate, r1 = one's complement of r4
function is_neg(){}
// beq 0001 0000        Branch if EQual to zero, If zero flag =1 , jmp 0001 0000
function is_beg(){}
// bne 0010 1111        Branch if Not Equal, if zero flag =0 , jmp 0010 1111
function is_bne(){}
