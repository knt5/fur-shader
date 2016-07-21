#!/bin/bash

# A screen capture tool for mac

# Screenshots storage
dir="./captured"

# Wait to start
sleep 3

mkdir "$dir"

#==========================================================
tab() {
	osascript <<'	END'
		activate application "Chrome"
		tell application "System Events"
			key code 48
			delay 0.5
		end tell
	END
}

#==========================================================
shiftTab() {
	osascript <<'	END'
		activate application "Chrome"
		tell application "System Events"
			key code 48 using {shift down}
			delay 0.5
		end tell
	END
}

#==========================================================
goToTop() {
	osascript <<'	END'
		activate application "Chrome"
		
		tell application "System Events"
			key code 125
			delay 0.5
		end tell
		
		tell application "System Events"
			key code 126 using {command down}
			delay 1.0
		end tell
		
		tell application "System Events"
			key code 36
			delay 1.0
		end tell
	END
}

#==========================================================
goToNext() {
	osascript <<'	END'
		activate application "Chrome"
		
		tell application "System Events"
			key code 125
			delay 0.5
		end tell
		
		tell application "System Events"
			key code 125
			delay 0.5
		end tell
		
		tell application "System Events"
			key code 36
			delay 1.0
		end tell
	END
}

#==========================================================
# Capture
for geometry in {1..15}
do
	# Top texture
	goToTop
	sleep 2

	for texture in {1..14}
	do
		file="$dir/"`printf %02d $geometry`-`printf %02d $texture`.png
		screencapture "$file"
		sleep 1
		
		# Next geometry
		goToNext
		sleep 2
	done
	
	# Next geometry
	tab
	sleep 1
	goToNext
	sleep 2
	shiftTab
	sleep 1
done
