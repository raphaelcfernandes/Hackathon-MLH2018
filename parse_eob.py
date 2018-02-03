

file = open('image.txt', 'r')
lines = file.readlines()
file.close()

keywords = []

for line in lines:
    line = line.split(" ")
    for word in line:
        keywords.append(word)

for keyword in keywords:
    if keyword in