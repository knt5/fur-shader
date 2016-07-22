#!/bin/bash

dir="./cropped"

mkdir "$dir"

\ls captured/*.png | while read path
do
	name=`basename $path`
	
	echo $name
	
	convert -crop 520x520+370+250 $path $dir/$name
done
