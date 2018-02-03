import csv
import sys
import json
def read_data(file_name, list):
    with open(file_name) as file:
        lines = csv.reader(file)
        for i, row in enumerate(lines):
            if i != 0:
                list.append(row)


# Data structure:
# [[type, detail, date], ...]
eob = []
read_data('eob.csv', eob)

# Take in user input conditions
lines = sys.stdin.readlines()
lines = json.loads(lines[0])
ui_type = lines[0]
ui_detail = lines[1]

# append to the existing csv file
with open('/home/raphael/Documents/hackathon/server-side/controllers/database.csv', 'a') as database:
    writer = csv.writer(database)
    for i, data in enumerate(eob):
        writer.writerow([data[0], data[1]])
    writer.writerow([ui_type, ui_detail])