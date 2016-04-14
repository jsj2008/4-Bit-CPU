//
// Yeah, let's make new file for the multibits. Too messy.


function four_bit_full_adder(a,b){
   
//   // Oh yea, LSB is index 3 and needs to
//   // be counted first, but on JS my
//   // list is wrong way, so reverse and reverse
//   return    [ half_adder(a[3] , b[3]) , 
//               full_adder(a[2] , b[2]) , 
//               full_adder(a[1] , b[1]) , 
//               full_adder(a[0] , b[0])  
//             ].reverse();

   // half, full, full, full => a=0
   set_flag('a', false);
   return four_bit_add(a,b); // half , full, full, full
}

function four_bit_full_adder_with_carry(a,b){
   set_flag('a',true);
   var tmp = four_bit_add(a,b);
   set_flag('a',false);
   return tmp;
}

// so these two upper ones should really be one function. 
// In hardware (that is just in my mind yet...) there
// is new flag, add-flag or add_with_carry flag.. A-flag.
// if A => four_bit_with_carry, else four_bit
// Oooh, maby it works like..
// or( and( A, full_adder) , and( !A, half adder) )
// Oh btw, that looks lot like 2-bit demux.. Wonder why ;)
// mask the one we want with and 1 and other one to 0 with and 0
function four_bit_add(a,b){
   return    [ or(and(full_adder(a[3] , b[3]),     get_flag('c')),
                  and(half_adder(a[3] , b[3]), not(get_flag('c')))),
               full_adder(a[2] , b[2]) , 
               full_adder(a[1] , b[1]) , 
               full_adder(a[0] , b[0])  
             ].reverse();
}
