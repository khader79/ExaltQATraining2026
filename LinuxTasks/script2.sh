echo "1. Find factorial for a given integer. "
echo '3. Find sum for all integers given by a user, last input from the user should be 0 (loop should stop
when the user enters 0, then you should print on the screen the sum for all numbers)'
echo '3. Check if a given string is palindrome or not. '
echo '4. Find the maximum number for a given array.'
echo '5. Exit menu.'
read choice
case $choice in
        1)
                echo -n "Enter the number : "
                read n
                fact=1
		if [ $n -lt 0 ]; then
			echo "The number should be positive"
		else
			
               		 for ((i=1; i<=n; i++))
               		 do
                        	fact=$((fact * i ))
                	done
                	echo "The factorial = $fact"
		fi
                ;;
	2)
		read n
		result=0
		while [ $n -ne 0 ]
		do
			result=$((result+n))
			echo "  The sum = $result"
			read n
		done
		;;

	3)
		echo "Enter the string : " 
		read string
		revs=$(echo "$string" | rev)
		if [ $string == $revs ]; then
			echo "The string is palindrome"
		else
			echo "The string is not palindrome"
		fi
		;;

	4)
		echo "Enter the array numbers : "
		read -a arr
		max=${arr[0]}
		for n in "${arr[@]}"
		do
			if [ $n -gt $max ]; then
				max=$n
			fi
		done
		echo "The max number is : $max"
		;;
	5)
		exit 0
		;;
	*)
		echo "Invalid choice"
esac
