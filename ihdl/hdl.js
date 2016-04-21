//
//   So VHDL is expensive and Javascript is cheap.
//   Could JS offer same functionality?
//
//   All these are what I have understanded, please contact and
//   correct me if I made an error or if I say something that 
//   is not understandable.
//
//
//   In the beginning there is NAND-gate, and it was good.
//
//                        VCC
//                         |
//                        | |   // some resistor, try 1k or something
//                        | |
//                         |
//                         *---- OUT
//                         |
//                         N
//          IN 1 ---------P
//                         N
//                         |
//                         |
//                         N
//          IN 2 ---------P
//                         N
//                         |
//                        GND
//
//
//   Only when both of the inputs are 1, the both transistors are
//   closed and circuit looks like this
//
//
//     VCC 
//      |
//      |                                 VCC           
//     | |                                 |
//     | |                                | |     and    OUT ----- GND
//      |                Is equal to      | |
//      *----- OUT                         |       ( so out is GND, 0 )
//      |                                 GND
//      | 
//     GND                             (This is why
//                                      resistor)
//
// 
//   Otherwise It's like this
//
//       VCC                                 VCC 
//        |                                   |
//        |                                   |         
//       | |            And is like          | |                       
//       | |                                 | |   ( So out is VCC, 1 )      
//        |                                   |         
//        *----- OUT                          ------ OUT
//        |          
//        x          
//                  
//        x   ( One or both transistor open )   
//        |    ( so no connection )
//       GND
//
//
//     Let's make a table out of the logic of this.
//
//     IN 1    IN 2   OUT   
//       0      0      1     // Both closed, out = VCC
//       0      1      1     // One of them closed, out = VCC
//       1      0      1     // One of them closed, out = VCC
//       1      1      0     // Both open, out = GND
//       
function nand(a, b){
   // nand as it says, not-and is
   // logically like this
   // Not ( a and b )
   return ! ( a & b ) ;
}



// So there is this mystical AND operation?
// But we only have NAND? Well, javascript doesn't have
// transistors, so I use mystical & and ! symbols
// to fix this error. We cannot be using them from now on!

// So first we need NOT
function not( a ){                                         
   // So we only have NAND. What if we put                 IN   OUT
   // a to both inputs? Yep, not is just that.              0   1
   // In real life we could use just 1 transistor.          1   0
   return nand( a, a );   
}

// So, let's put inputs trough nand and then not => nnand = and
function and( a, b ){
   //   A   B   OUT
   //   0   0    0
   //   0   1    0
   //   1   0    0
   //   1   1    1 
   return ( not ( nand ( a , b ) ) ); 
}

// For diversity we could need OR-gate, 
function or( a, b ){
   //   A   B   OUT
   //   0   0    0
   //   0   1    1
   //   1   0    1
   //   1   1    1 
   // This is tricky. Let's check Boole's algebra.
   // NWM, wikipedia says next, let's test this one
   //
   //  A----NAND
   //            -----NAND---Out
   //  B----NAND 
   //  
   //  So let's simplify this and make table out of this
   // 
   //   1          2         3
   //   A ----NOT--
   //               >--NAND---OUT
   //   B-----NOT--
   //
   //      1      2     3
   //     A B    A B   OUT
   //          
   //     0 0    1 1    0
   //     0 1    1 0    1
   //     1 0    0 1    1
   //     1 1    0 0    1   Goddamit, it works!
   //
   return nand( not( a ) , not( b ) );
}

// Nor is needed at memory/RS flipflop
function nor(a,b){
   return not(or(a,b));
}

// Oh, it seems full-adder needs some mystical star-ball-function
// called XOR.
//        ___ 
//      /  |  \   So is that like 4-bit circle?
//      |--|--|   I just felt like doing some art, sorry.
//      \ _|_ /
//
//  Alright, se we have outputs 0111, 0001 and now we need 0110, so 
//  it's like or, but when A=1, B=1 there should be OUT=0.
//
//   
//   A   B   OUT
//   0   0    0
//   0   1    1     XOR
//   1   0    1
//   1   1    0
//
//   Goddamit Wikipedia, this looks awful!
//   Well, I feel like art-y still.
//
//   A---*---------NAND  (2)
//       |       /      \            Looks little like 
//        > NAND  (1)   NAND--OUT   bridge rectifier
//       |       \      /
//   B---*---------NAND  (3)
// 
//   (3) = NAND B, (1)
//   (2) = NAND A, (1)
//   OUT = NAND (2),(3)
//
//   So  A  B   (1)  (2) (3)   OUT
//       0  0    1    1   1     0
//       0  1    1    1   0     1
//       1  0    1    0   1     1
//       1  1    0    1   1     0   Oh, it works. Awesome
//
function xor(a,b){

   // var tmp_1 = nand( a, b );
   // var tmp_2 = nand( a, tmp_1 );
   // var tmp_3 = nand( b, tmp_1 );
   // return nand( tmp2 , tmp3);
   
   // we really don't have any memory yet
   // to store these, so let's just make the monster.
     
   // return nand( tmp2 , tmp3);
   // return nand( nand( a, tmp_1 ) , nand( b, tmp_1 ));   
   return nand( nand( a, nand( a, b ) ) , nand( b, nand( a, b ) ));
}

//
// Finally we can have half adder.
// Well, we needed it anyway, because
// addition doesn't work on javascript.
//
//    0     0      1     1
//  + 0   + 1    + 0   + 1
// -----  ----  -----  ----
//    0     1      1    10
//
//  Okay, if 1+1=10 is made with
//  one bit, it's like 1+1=0, so that
//  is just the XOR-operation, nice!
//  
//  But that overflow number is needed
//  if we want precicion. It is 
//  historically called Carry, so let's
//  make our first global flag.
//
// var global_flag_carry = 0; This is now in registers.js
//
//  This lives in something called 
//  register, we'll come to that
//  someday.   
//  
//  But how do we do carry? Well,
//  it is needed only when both are 1,
//  otherwise it stays 0.. So and?
function half_adder(a,b){
   //global_flag_carry = and( a , b);
   set_flag('c' , and(a,b) );
   return xor( a , b );   
}

//
// That's just half adder.
// So when there's like 8 bits or
// even more(!), and we add them,
// we need to take count the carry
// of the last bit. When we don't 
// it's like job half done, so half adder.
// 
// So like this.
//    c     c      c     c
//    0     0      1     1
//  + 0   + 1    + 0   + 1
// -----  ----  -----  ----
//    x     x      x      x
//                         
// We have 2 scenarios, c=1 and c=0
//    1     1      1     1
//    0     0      1     1
//  + 0   + 1    + 0   + 1
// -----  ----  -----  ----
//   01    10     10    11
//
//    0     0      0     0
//    0     0      1     1
//  + 0   + 1    + 0   + 1
// -----  ----  -----  ----
//    0     1      1    10
//
//  So only when carry was set, it's not
//  just full adder.
//  when carry is set, it's set on 0111, so we need or
// 
//  we can use AND to select, let's calculate both 
//  and AND the output with carry like this
//  if carry is not set
//     and ( not (carry ) , half_adder(a,b)) 
//  if carry is set
//     and ( not (carry ) , other_thing)
//  This is gonna be awful, I need to format this..
//
//   or ( 
//        and (
//              not (carry ) , half_adder(a,b)
//            ) ,
//        and ( 
//              not (carry ) , other_thing
//            ) 
//      )                              OMG, I made lisp =)
//
//   Now, what could the other_thing be?
//   I don't know, I'm going to watch Doctor Who.
//
//   Goddamit, the man under the skull mask was Master! 
//   Ok, so I maby tested all the functions so far while
//   that episode. How? Look ./tests file.
//
//   BTW the other thing might be another half adder. Let's start 
//   from scratch, lost my focus.
//   
//   A and B goes to half adder. The output is... added with carry, right?
//   Yeah, a+b+carry is out ok.
//   
//   The new carry is like 0111, so just or? Let's test.
//
//  So this idea looks like...
//
//   Carry---------------[half out]------OUT
//   A ----[half out]----[ add  c ]...
//   B-----[ add  c ]-----------------OR--Carry
//  

function full_adder(a,b){
    
   // So because these can't happen same time on javascript,
   // I need to do this section by section. 
   // If there is easily understandable 
   // way to do this without tmp's, please contact me and tell me how!

   // we need to ad a+b+carry, but then carry would change.
   // let's store the incoming carry
   var tmp_carry_in = get_flag('c');
   
   // Now we can add a and b
   var tmp_first_add = half_adder(a,b);
   
   // but hey, we need this carry too 
   //var tmp_carry_2 = global_flag_carry;
   var tmp_carry = get_flag('c');
   
   // first carry and a+b is final output
   var tmp_out = half_adder( tmp_first_add, tmp_carry_in);
   
   // but before returning, we need to edit carry
   //global_flag_carry = or( tmp_carry_2 , global_flag_carry);
   set_flag('c' , or( tmp_carry , get_flag('c')) );
   
   // Now that was ugly.
   return tmp_out;
  
}
