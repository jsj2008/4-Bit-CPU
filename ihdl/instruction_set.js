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

}
function is_jmp(addr1, addr2){
   set_memory( 0 , addr1);
   set_memory( 1 , addr2);
//   set_memory( 0 , [ addr[0], addr[1], addr[2] , addr[3] ]);   
//   set_memory( 1 , [ addr[4], addr[5], addr[6] , addr[7] ]);   
}
function is_get(addr1,addr2){
   set_memory( r0_addr  , get_memory( memory_address(addr1,addr2)) );
}
function is_put(addr1,addr2){
//   set_memory(memory_address(_to_dec(addr1),_to_dec(addr2)) , get_memory(r0_addr))
   set_memory(memory_address(addr1,addr2) , get_memory(r0_addr))
}
// ldr crr and lor
function is_ldr(reg, value){
   set_memory( +r0_addr + +_to_dec(reg)  ,value  );
}
function is_crr(to,from){
//   set_memory( +r0_addr + +to  , get_memory( +r0_addr + +from  ) );
   set_memory( +r0_addr + +_to_dec(to)  , get_memory( +r0_addr + +_to_dec(from)  ) );
}
function is_and(reg1, reg2){
   var tmp1 = get_memory( r0_addr + _to_dec(reg1));
   var tmp2 = get_memory( r0_addr + _to_dec(reg2));
   
   var out = [ and( tmp1[0] , tmp2[0]) ,
               and( tmp1[1] , tmp2[1]) ,
               and( tmp1[2] , tmp2[2]) ,
               and( tmp1[3] , tmp2[3]) ]

   set_memory( r0_addr  , out );
}
function is_lor(reg1, reg2){
   var tmp1 = get_memory( r0_addr + _to_dec(reg1));
   var tmp2 = get_memory( r0_addr + _to_dec(reg2));
   
   var out = [ or( tmp1[0] , tmp2[0]) ,
               or( tmp1[1] , tmp2[1]) ,
               or( tmp1[2] , tmp2[2]) ,
               or( tmp1[3] , tmp2[3]) ]

   set_memory( r0_addr  , out );
}
// not xor lsh rsh
function is_not(addr1, addr2){
   var tmp = get_memory( memory_address( addr1, addr2));
   tmp = [not(tmp[0]) , 
          not(tmp[1]) , 
          not(tmp[2]) , 
          not(tmp[3]) ];
            
   set_memory( r0_addr  , tmp  );
}
function is_xor(reg1, reg2){
   var tmp1 = get_memory( r0_addr + _to_dec(reg1));
   var tmp2 = get_memory( r0_addr + _to_dec(reg2));
   
   var out = [ xor( tmp1[0] , tmp2[0]) ,
               xor( tmp1[1] , tmp2[1]) ,
               xor( tmp1[2] , tmp2[2]) ,
               xor( tmp1[3] , tmp2[3]) ]

   set_memory( r0_addr  , out );
}
function is_lsh(addr, amount){
   var tmp = get_memory(r0_addr + _to_dec(addr));
   tmp = _to_bin(_to_dec(tmp) << _to_dec(amount));
   set_memory(r0_addr + _to_dec(addr), tmp);
}
function is_rsh(addr, amount){
   var tmp = get_memory(r0_addr + _to_dec(addr));
   tmp = _to_bin(_to_dec(tmp) >> _to_dec(amount));
   set_memory(r0_addr + _to_dec(addr), tmp);
}
// add neg beq bne
function is_add(addr1, addr2){
//   set_memory( r0_addr , four_bit_full_adder( a,b) );
   var tmp1 = get_memory(+r0_addr + +_to_dec(addr1));
   var tmp2 = get_memory(+r0_addr + +_to_dec(addr2));
   var out = four_bit_full_adder( tmp1, tmp2);
   set_memory( r0_addr , out);

}
function is_neg(from, to){
   var tmp_from = get_memory(+r0_addr + +_to_dec(from));
   var out = [ full_adder(tmp_from[3] ,1) , 
               full_adder(tmp_from[2] ,0) , 
               full_adder(tmp_from[1] ,0) , 
               full_adder(tmp_from[0] ,0) ].reverse();
   set_memory(+r0_addr + +_to_dec(to) , out);
}
function is_beg(addr1, addr2){
   if ( !get_flag('z')){  // if z=0
      is_jmp(addr1, addr2);
   }
}
function is_bne(addr1, addr2){
   if ( get_flag('z')){
      is_jmp(addr1, addr2);
   }
}
