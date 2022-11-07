echo "A: For-loops (1 thread)"
for i in {1..3}
do
  time node main.js A
done

echo "============================"

echo "B1: Multithread (50 threads)"
for i in {1..3}
do
  time node main.js B1
done

echo "============================"

echo "B2: Multithread (10 threads)"
for i in {1..3}
do
  time node main.js B2
done
