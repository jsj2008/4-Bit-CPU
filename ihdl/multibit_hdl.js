//
// Let's make new file for the multibits.
//


function four_bit_full_adder(a,b){
   
   // LSB is either half or full adder based on 'a' flag
   //
   // or( and( A, full_adder) , and( !A, half adder) )
   // mask the one we want with 'and 1' and other one to 0 with 'and 0'

   // Store flags, full and half adder should happen same time, so
   // flags should not change
   var tmpa = get_flag('a')
   var tmpc = get_flag('c')
   
   var tmp_fa = full_adder(a[3] , b[3]);
   set_flag('a',tmpa);
   var tmpc2 = get_flag('c')
   set_flag('c',tmpc);

   var tmp_ha = half_adder(a[3] , b[3]);
   set_flag('a',false);
   var tmpc3 = get_flag('c')   

   // Carry needs to have same logic
   set_flag('c', or( and(tmpa, tmpc2) , and( not(tmpa), tmpc3)));

   var out =  [ or( and(tmp_fa ,     tmpa),
                    and(tmp_ha , not(tmpa))),
                full_adder(a[2] , b[2]) , 
                full_adder(a[1] , b[1]) , 
                full_adder(a[0] , b[0])  
              ];

   
   return out.reverse();
   
}
