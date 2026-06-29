mkdir cities
cd ./cities
touch Bethlehem.txt Ramallah.txt Jerusalem.txt Nablus.txt Hebron.txt
echo 'Bethlehem  77368   Beth22 02  George 123' > Bethlehem.txt
echo 'Ramallah   158496  Ram33  03  Hasan  123' > Ramallah.txt
echo 'Jerusalem  874362  Je1    04  Alex   789' > Jerusalem.txt
echo 'Nablus     89632   Na89   05  Khader 789' > Nablus.txt
echo 'Hebron     47896   He9    06  Ramzi  789' > Hebron.txt
ls | grep -i "e" | wc -l
touch all_cities.txt
echo 'City  Population  City code  Phone code  Famous person  Area code' > all_cities.txt
cat Bethlehem.txt >> all_cities.txt
cat Ramallah.txt >> all_cities.txt
cat Jerusalem.txt >> all_cities.txt
cat Nablus.txt >> all_cities.txt
cat Hebron.txt >> all_cities.txt
column -t all_cities.txt
cat all_cities.txt
sort -k2 -n all_cities.txt | tail -1
sort -k2 -n all_cities.txt | head -1
cat all_cities.txt | cut -d' ' -f1,3
cat all_cities.txt | grep " 04 "
sort -k4 -n all_cities.txt
grep "Hebron" all_cities.txt | cut -d" " -f5
grep " 123 " all_cities.txt
grep "Nablus" all_cities.txt | cut -d" " -f6
rm Bethlehem.txt Ramallah.txt Jerusalem.txt Nablus.txt Hebron.txt
cd ..
rm -r cities


