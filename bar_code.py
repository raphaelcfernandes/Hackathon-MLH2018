import csv
import datetime
import sys

def read_data(file_name, list):
    with open(file_name) as file:
        lines = csv.reader(file)
        for i, row in enumerate(lines):
            if i != 0:
                list.append(row)


# still need to take care of case sensitive drug names
def cross_reference(personal, ref):
    for med1 in personal:
        for med2 in ref:
            if med1 == med2:
                return False
    return True

def time(d):
    today = datetime.datetime.now().date()
    d = d.split("/")
    date = datetime.date(int(d[2]), int(d[0]), int(d[1]))
    days = (today-date).days
    print(days)
    return days

bar_code = sys.argv[1]
result = ""

# Data structures:
# [[drug name, [list of interacting drugs], [list of side effects]], ...]
reference = []
read_data('reference.csv', reference)

my_data = []
read_data('database.csv', my_data)

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
        if record[0] == "IMAGING" or record[0] == "PHYSICIAN" or record[0] == "ALLERGY":
            my_conditions.append(record[1])
            # all_keywords_dates.append(record[2])

for med in my_meds:
    for row in reference:
        if med == row[0] and bar_code in row[1]:
            result = "Not Suggested"
        else:
            result = "Neutral"

side_effects = []
for row in reference:
    if bar_code == row[0]:
        side_effects = row[2]

for condition in my_conditions:
    if condition in side_effects:
        result = "Not Suggested"

print(result)