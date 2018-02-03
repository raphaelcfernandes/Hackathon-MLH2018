import datetime
import sys
import csv

import json
def read_data(file_name, list):
    with open(file_name) as file:
        lines = csv.reader(file)
        for i, row in enumerate(lines):
            if i != 0:
                list.append(row)

def time(d):
    today = datetime.datetime.now().date()
    d = d.split("/")
    date = datetime.date(int(d[2]), int(d[0]), int(d[1]))
    days = (today-date).days
    print(days)
    return days

result = "Neutral"
lines = sys.stdin.readlines()
lines = json.loads(lines[0])
bar_code = lines[0]

# Data structures:
# [[drug name, [list of interacting drugs], [list of side effects]], ...]
reference = []
read_data('/home/raphael/Documents/hackathon/server-side/controllers/reference.csv', reference)

my_data = []
read_data('/home/raphael/Documents/hackathon/server-side/controllers/database.csv', my_data)

inferences = []

"""
drug_choices = []
read_data('drugs.csv', drug_choices)
"""

avoid = []

my_meds = []
# all_meds_dates = []
my_conditions = []
# all_keywords_dates = []

for record in my_data:
    if record != [] and record[0] == "DRUGS":
        my_meds.append(record[1])
        # all_meds_dates.append(record[2])
    elif record != []:
        if record[0] == "IMAGING" or record[0] == "PHYSICIAN" or record[0] == "ALLERGY" or record[0] == "PROBLEM":
            my_conditions.append(record[1])
            # all_keywords_dates.append(record[2])

for med in my_meds:
    for row in reference:
        if med == row[0] and bar_code in row[1]:
            result = "Not Suggested"

side_effects = []
precautions = []
for row in reference:
    if bar_code == row[0]:
        side_effects = row[2]
        precautions = row[3]

for condition in my_conditions:
    if condition in side_effects or condition in precautions:
        result = "Not Suggested"

print(result)