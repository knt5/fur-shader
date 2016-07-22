#!/bin/bash

inDir="./cropped"
dir="./merged"

mkdir "$dir"

geometryInputFiles=""
for geometry in {1..15}
do
	inputFiles=""
	
	for texture in {1..14}
	do
		name=`printf %02d $geometry`-`printf %02d $texture`.png
		file=$inDir/$name
		
		inputFiles="$inputFiles $file"
	done
	
	outFile=$dir/`printf %02d $geometry`.png
	convert +append $inputFiles $outFile
	geometryInputFiles="$geometryInputFiles $outFile"
done

convert -append $geometryInputFiles $dir/merged.png
