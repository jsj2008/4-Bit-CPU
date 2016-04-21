


function increment_program_counter(){
   var mem_h = get_memory( 0); 
   var mem_l = get_memory( 1);  
   
   console.log( mem_h + "   " + mem_l );

   mem_l = four_bit_full_adder(mem_l, [0,0,0,1]);

   set_flag('a',true);
   mem_h = four_bit_full_adder(mem_h, [0,0,0,0]);

   console.log(mem_h + "   " + mem_l );

   set_memory(0,mem_h);
   set_memory(1,mem_l);
}
