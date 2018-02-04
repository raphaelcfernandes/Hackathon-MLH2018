import csv


def read_data(file_name, list):
    with open(file_name) as file:
        lines = csv.reader(file)
        for i, row in enumerate(lines):
            if i != 0:
                list.append(row)


file = open('/home/raphael/Documents/hackathon/server-side/controllers/finalTest2.txt', 'r')
lines = file.readlines()
file.close()

keywords = []
for line in lines:
    line = line.split(" ")
    for word in line:
        keywords.append(word)

reference = []
read_data('/home/raphael/Documents/hackathon/server-side/controllers/reference.csv', reference)
# Data structure that matches the database
# [Type, Detail, Date]
li = []
for keyword in keywords:
    if keyword != '' and keyword != '\n':
        keyword = keyword.strip("\n")
        for row in reference:
            if keyword == row[0]:
                li.append(['DRUGS', keyword])

for i, keyword in enumerate(keywords):
    keyword = keyword.strip("\n")
    if keyword == "Visit" or keyword == "Therapy":
        li.append(['PHYSICIAN', 'na'])
    elif keyword == "Imaging" or keyword == "X-Ray":
        li.append(['IMAGING', keywords[i]])
    elif keyword == "Room":
        li.append(['ROOM CHARGES', 'na'])
    elif keyword == "SURGERY":
    	li.append(["SURGERY", "na"])

with open('/home/raphael/Documents/hackathon/server-side/controllers/database.csv', 'a') as database:
    writer = csv.writer(database)
    for data in li:
        writer.writerow([data[0], data[1]])