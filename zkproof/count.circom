pragma circom 2.0.0;

// Enforce that 0 <= in <= 7 ( < 8)
template Bits3(){
          signal input in;
          signal bits[3];
          var bitsum = 0;
          for (var i = 0; i < 3; i++) {
                    bits[i] <-- (in >> i) & 1;
                    bits[i] * (bits[i] - 1) === 0;
                    bitsum = bitsum + 2 ** i * bits[i];
          }
          bitsum === in;
}

// Enforce that book <= in <= capacity
template Judge() {
          signal input in;
          signal input book;
          signal input capacity;
          signal tmp <-- 7 - capacity;
          component lowerBound = Bits3();
          component upperBound = Bits3();
          lowerBound.in <== in - book;
          upperBound.in <== in + tmp;
}


// Check that (number of reserved seats <= number of passengers <= maximum number of passengers) 
template Count() {
          // reserved is the number of reserved sets
          signal input reserved;
          // passengers is the number of passengers
          signal input passengers;
          // capacity is the maximum number of passengers
          signal input maximum;

          component ride = Judge();
          ride.book <== reserved;
          ride.in <== passengers;
          ride.capacity <== maximum;
}

component main {public[maximum]} = Count();
// 予約人数 <=　乗った人数　<= 定員(public)