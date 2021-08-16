# Convert png files to gif. Must be done to be compatible with more types of tkinter versions
# May lead to incompatibility with OSX otherwise

ls | grep ".png" | cut -f 1 -d '.' | xargs -I '{}' convert '{}.png' '{}.gif'