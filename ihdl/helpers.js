


//
//  First helper-pair is converting bin to dec and backwards.
//


// this was easy
function _to_dec(number){
   return number[3] + number[2]*2 + number[1]*4 + number[0]*8;   
}

// Comment from my earlier project:
// "lsb is up, if mod2... assign mod2! Soo.. lets shift and do this to all? "
function _to_bin(number){
   // now it's 4-bit
   //              3      2      1     0
   var tmp = [ false, false, false,false];

   tmp[0] = number %2;
   number = number >> 1;
   tmp[1] = number %2;
   number = number >> 1;
   tmp[2] = number %2;
   number = number >> 1;
   tmp[3] = number %2;
   number = number >> 1;
   
   return tmp.reverse();
}

//
//  Memoryaddresses need 8-bit versions.
// 

function _8_bit_to_dec(number){
   return number[7]    + number[6]*2  + number[5]*4  + number[4]*8 
        + number[3]*16 + number[2]*32 + number[1]*64 + number[0]*128;   
}

function _8_bit_to_bin(number){
   var tmp = [ false, false, false,false, false,false,false,false];

   for( var i = 0 ; i< 8 ; i++){
     tmp[i] = number %2;
     number = number >> 1;
   }
   
   return tmp.reverse();
}
