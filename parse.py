import csv


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


# Data structure for each file we are keeping track of
# [[list of symptoms], [list of allergy], age, weight, eat, severity, date]]
personal = []
read_data('person1.csv', personal)
personal = personal[0]

# [[type, [list of details], date], ...]
eob = []
read_data('eob.csv', eob)

# [[drug name, [list of interacting drugs], [list of side effects]], ...]
interaction = []
read_data('interaction.csv', interaction)

drug_choices = []
read_data('drugs.csv', drug_choices)

avoid = []
for allergy in personal[1].split(", "):
    avoid.append(allergy)

current_meds = []
for record in eob:
    if record[0] == "DRUGS":
        current_meds.append(record[1])

for my_med in current_meds:
    print(my_med)
    for not_with_my_med in interaction:
        print(not_with_my_med)
        if my_med in not_with_my_med[1].split(", "):
            avoid.append(not_with_my_med[0])

avoid = list(set(avoid))
