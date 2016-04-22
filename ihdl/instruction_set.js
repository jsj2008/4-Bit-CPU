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

//
// nop jmp get put
// 
function is_nop(){
   increment_program_counter();
}
function is_jmp(addr){
   set_memory( 0 , [ addr[0], addr[1], addr[2] , addr[3] ]);   
   set_memory( 1 , [ addr[4], addr[5], addr[6] , addr[7] ]);   
}
function is_get(addr1,addr2){
   set_memory( r0_addr  , get_memory( memory_address(addr1,addr2)) );
}
function is_put(addr1,addr2){
   set_memory(memory_address(addr1,addr2) , get_memory(r0_addr))
}

// ldr crr and lor
function is_ldr(reg, value){
   set_memory( +r0_addr + +reg  , _to_bin(value)  );
}
function is_crr(to,from){
   set_memory( +r0_addr + +to  , get_memory( +r0_addr + +from  ) );
}
function is_and(addr1, addr2){
   var tmp = [and(get_memory(addr1)[0] , get_memory(addr2)[0]) , 
              and(get_memory(addr1)[1] , get_memory(addr2)[1]) , 
              and(get_memory(addr1)[2] , get_memory(addr2)[2]) , 
              and(get_memory(addr1)[3] , get_memory(addr2)[3]) ];
            
   set_memory( r0_addr  , tmp  );
}
function is_lor(addr1, addr2){
   var tmp = [or(get_memory(addr1)[0] , get_memory(addr2)[0]) , 
              or(get_memory(addr1)[1] , get_memory(addr2)[1]) , 
              or(get_memory(addr1)[2] , get_memory(addr2)[2]) , 
              or(get_memory(addr1)[3] , get_memory(addr2)[3]) ];
            
   set_memory( r0_addr  , tmp  );
}

// not xor lsh rsh
function is_not(addr){
   var tmp = [not(get_memory(addr)[0]) , 
              not(get_memory(addr)[1]) , 
              not(get_memory(addr)[2]) , 
              not(get_memory(addr)[3]) ];
            
   set_memory( r0_addr  , tmp  );
}
function is_xor(addr1, addr2){
   var tmp = [xor(get_memory(addr1)[0] , get_memory(addr2)[0]) , 
              xor(get_memory(addr1)[1] , get_memory(addr2)[1]) , 
              xor(get_memory(addr1)[2] , get_memory(addr2)[2]) , 
              xor(get_memory(addr1)[3] , get_memory(addr2)[3]) ];
            
   set_memory( r0_addr  , tmp  );
}
function is_lsh(addr, amount){
   var tmp = get_memory(addr);
   tmp = _to_bin(_to_dec(tmp) << amount)
   set_memory(addr, tmp);
}
function is_rsh(addr, amount){
   var tmp = get_memory(addr);
   tmp = _to_bin(_to_dec(tmp) >> amount)
   set_memory(addr, tmp);
}

// add neg beq bne
function is_add(a,b){
   set_memory( r0_addr , four_bit_full_adder( a,b) );
}
function is_neg(from, to){
   var tmp = get_memory(+r0_addr + +from);
   tmp = [ not(tmp[0]) , not(tmp[1]) , not(tmp[2]) , not(tmp[3]) ];
   tmp = [ full_adder(tmp[3] , 1) , 
           full_adder(tmp[2] , 0) , 
           full_adder(tmp[1] , 0) , 
           full_adder(tmp[0] , 0) ].reverse(); 
   set_memory( +r0_addr + +to  , tmp  );
}

// Next in line ////////////////////////////////////////////////////////////////

// beq 0001 0000        Branch if EQual to zero, If zero flag =1 , jmp 0001 0000
function is_beg(){
   
}




// for future   ////////////////////////////////////////////////////////////////



// bne 0010 1111        Branch if Not Equal, if zero flag =0 , jmp 0010 1111
function is_bne(){}
