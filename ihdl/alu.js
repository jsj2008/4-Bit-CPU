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

// We need program counter
var global_program_counter_0 = [false,false,false,false];
var global_program_counter_1 = [false,false,false,false];

// and we need to increment it when nop is called.
function alu_nop(){
   // oh, we cannot do just
   // global_program_counter +=1;
   // so we need 4-bit full adder
}


    
i    Page 0                               i     Every other page    
0    dddd    program counter 0            0     0000                   Programmable code starts here on page 1 
1    dddd    program counter 1            1     0000      
2    dddd    flags                        2     0000
3    1111    DDR for pins  0-3            3     0000           
4    1111    DDR for pins  4-7            4     0000       
5    1111    DDR for pins  8-11           5     0000       
6    dddd    I/O for pins  0-3            6     0000       
7    dddd    I/O for pins  4-7            7     0000       
8    dddd    I/O for pins  8-11           8     0000       
9    0000    r0    output of logic        9     0000       
a    0000    r1      r1-r4                a     0000       
b    0000    r2       are                 b     0000       
c    0000    r3      general              c     0000       
d    0000    r4      purpose              d     0000       
e    0000     interrupt-                  e     0000       
f    0000    handler bits                 f     0000       
                                                 
