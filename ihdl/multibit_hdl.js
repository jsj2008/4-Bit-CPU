//
// Yeah, let's make new file for the multibits.


function four_bit_full_adder(a,b){
   
   // Oh yea, LSB is index 3 and needs to
   // be counted first, but on JS my
   // list is wrong way, so reverse and reverse
   return    [ half_adder(a[3] , b[3]) , 
               full_adder(a[2] , b[2]) , 
               full_adder(a[1] , b[1]) , 
               full_adder(a[0] , b[0])  
             ].reverse();

}

// at least program counter needs this
function eight_bit_full_adder(a,b){
   
   return    [ half_adder(a[7] , b[7]) , 
               full_adder(a[6] , b[6]) , 
               full_adder(a[5] , b[5]) , 
               full_adder(a[4] , b[4]) , 
               full_adder(a[3] , b[3]) , 
               full_adder(a[2] , b[2]) , 
               full_adder(a[1] , b[1]) , 
               full_adder(a[0] , b[0])  
             ].reverse();
   
}
