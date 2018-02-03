import csv
import datetime

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

# Data structure for each file we are keeping track of
# [[list of symptoms], [list of allergy], age, weight, eat, severity, date]]
personal = []
read_data('person1.csv', personal)
personal = personal[0]

# [[type, [list of details], date], ...]
eob = []
read_data('eob.csv', eob)

database = []
read_data('database.csv', database)

# [[drug name, [list of interacting drugs], [list of side effects]], ...]
interaction = []
read_data('interaction.csv', interaction)

drug_choices = []
read_data('drugs.csv', drug_choices)

avoid = []
for allergy in personal[1].split(", "):
    avoid.append(allergy)

database = database + eob

all_meds = []
all_meds_dates = []
all_keywords = []
all_keywords_dates = []

for record in database:
    if record[0] == "DRUGS":
        all_meds.append(record[1])
        all_meds_dates.append(record[2])
    elif record[0] == "IMAGING" or record[0] == "PHYSICIAN":
        all_keywords.append(record[1])
        all_keywords_dates.append(record[2])
"""
for i, my_med in enumerate(all_meds):
    for row in interaction:
        if my_med in row[1].split(", ") and time(all_meds_dates[i]) < 7:
            avoid.append(row[0])

for i, keyword in enumerate(all_keywords):
    for row in interaction:
        effects = []
        side_effects = row[2].split(", ")
        for effect in side_effects:
            if keyword in effect.split(" ") and time(all_meds_dates[i]) < 7:
                avoid.append(row[0])
"""




avoid = list(set(avoid))
print(avoid)