import csv
import sys

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
ui_type = sys.argv[1]
ui_detail = sys.argv[2]

# append to the existing csv file
with open('database.csv', 'a') as database:
    writer = csv.writer(database)
    for i, data in enumerate(eob):
        writer.writerow([data[0], data[1]])
    writer.writerow([ui_type, ui_detail])